import JSZip from "jszip";
import { getSupabase } from "./supabaseClient";

const BUCKET = "listing-media";
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|heic|heif)$/i;
const IMAGE_MIME = /^image\//i;

export type MediaFolder = "listings" | "showcase";

function sanitizeName(name: string): string {
  return name
    .replace(/^.*[/\\]/, "")
    .replace(/[^\w.\-]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase()
    .slice(0, 80);
}

function mimeFromName(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  switch (ext) {
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    case "heic":
      return "image/heic";
    case "heif":
      return "image/heif";
    case "jpg":
    case "jpeg":
    default:
      return "image/jpeg";
  }
}

function resolveImageMime(name: string, mime?: string): string {
  if (mime && IMAGE_MIME.test(mime) && mime !== "image/svg+xml") return mime;
  return mimeFromName(name);
}

function isImageFile(name: string, mime?: string): boolean {
  if (mime && IMAGE_MIME.test(mime) && mime !== "image/svg+xml") return true;
  return IMAGE_EXT.test(name);
}

async function uploadBlob(
  folder: MediaFolder,
  entityId: string,
  fileName: string,
  data: Blob | ArrayBuffer | Uint8Array,
  contentType: string,
): Promise<string> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured yet.");

  const mime = resolveImageMime(fileName, contentType);
  // Zip entries often arrive as application/octet-stream — re-wrap so Storage
  // sees a real image MIME (bucket rejects octet-stream).
  const bytes =
    data instanceof ArrayBuffer
      ? data
      : data instanceof Uint8Array
        ? data
        : await data.arrayBuffer();
  const typed = new Blob([bytes], { type: mime });

  const safe = sanitizeName(fileName) || `photo-${Date.now()}.jpg`;
  const path = `${folder}/${entityId || "draft"}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}-${safe}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, typed, {
    contentType: mime,
    upsert: false,
  });
  if (error) {
    const msg = error.message || "Upload failed";
    if (/bucket not found/i.test(msg)) {
      throw new Error(
        "Storage bucket “listing-media” is missing. In Supabase → SQL Editor, run supabase/listing_media_bucket.sql (or the full showcase_homes.sql), then retry the zip.",
      );
    }
    if (/mime type/i.test(msg)) {
      throw new Error(
        `${msg} — retry after a refresh. If it persists, run supabase/fix_listing_media_mimes.sql in the SQL Editor.`,
      );
    }
    throw error;
  }

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return pub.publicUrl;
}

/** Upload one or many image files. Returns public URLs in selection order. */
export async function uploadImageFiles(
  files: FileList | File[],
  folder: MediaFolder,
  entityId: string,
  onProgress?: (done: number, total: number) => void,
): Promise<string[]> {
  const list = Array.from(files).filter((f) => isImageFile(f.name, f.type));
  if (!list.length) throw new Error("No image files found.");

  const urls: string[] = [];
  for (let i = 0; i < list.length; i++) {
    const f = list[i];
    urls.push(
      await uploadBlob(folder, entityId, f.name, f, resolveImageMime(f.name, f.type)),
    );
    onProgress?.(i + 1, list.length);
  }
  return urls;
}

/** Unpack a zip of property photos and upload each image. */
export async function uploadPhotoZip(
  zipFile: File,
  folder: MediaFolder,
  entityId: string,
  onProgress?: (done: number, total: number) => void,
): Promise<string[]> {
  const zip = await JSZip.loadAsync(zipFile);
  const entries = Object.values(zip.files)
    .filter((e) => !e.dir && isImageFile(e.name) && !e.name.includes("__MACOSX"))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  if (!entries.length) {
    throw new Error("Zip has no photos (jpg, png, webp, gif, heic).");
  }

  const urls: string[] = [];
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const bytes = await entry.async("uint8array");
    const mime = mimeFromName(entry.name);
    urls.push(await uploadBlob(folder, entityId, entry.name, bytes, mime));
    onProgress?.(i + 1, entries.length);
  }
  return urls;
}
