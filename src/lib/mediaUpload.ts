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

function isImageFile(name: string, mime?: string): boolean {
  if (mime && IMAGE_MIME.test(mime) && mime !== "image/svg+xml") return true;
  return IMAGE_EXT.test(name);
}

async function uploadBlob(
  folder: MediaFolder,
  entityId: string,
  fileName: string,
  blob: Blob,
  contentType: string,
): Promise<string> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured yet.");

  const safe = sanitizeName(fileName) || `photo-${Date.now()}.jpg`;
  const path = `${folder}/${entityId || "draft"}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}-${safe}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: contentType || "image/jpeg",
    upsert: false,
  });
  if (error) {
    const msg = error.message || "Upload failed";
    if (/bucket not found/i.test(msg)) {
      throw new Error(
        "Storage bucket “listing-media” is missing. In Supabase → SQL Editor, run supabase/listing_media_bucket.sql (or the full showcase_homes.sql), then retry the zip.",
      );
    }
    throw error;
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
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
    urls.push(await uploadBlob(folder, entityId, f.name, f, f.type));
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
    const blob = await entry.async("blob");
    const ext = entry.name.split(".").pop()?.toLowerCase() || "jpg";
    const mime =
      ext === "png"
        ? "image/png"
        : ext === "webp"
          ? "image/webp"
          : ext === "gif"
            ? "image/gif"
            : "image/jpeg";
    urls.push(await uploadBlob(folder, entityId, entry.name, blob, mime));
    onProgress?.(i + 1, entries.length);
  }
  return urls;
}
