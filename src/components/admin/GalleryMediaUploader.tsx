import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react";
import {
  uploadImageFiles,
  uploadPhotoZip,
  type MediaFolder,
} from "@/lib/mediaUpload";

type Props = {
  gallery: string[];
  primaryImage?: string;
  folder: MediaFolder;
  entityId: string;
  onChange: (next: { gallery: string[]; image?: string }) => void;
  hint?: string;
};

export function GalleryMediaUploader({
  gallery,
  primaryImage = "",
  folder,
  entityId,
  onChange,
  hint = "Drop a photo zip or multi-select images — they become the Serhant-style gallery on the property page.",
}: Props) {
  const zipRef = useRef<HTMLInputElement>(null);
  const multiRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mergeUrls = (urls: string[]) => {
    const nextGallery = [...gallery, ...urls];
    const image = primaryImage.trim() || urls[0] || "";
    onChange({ gallery: nextGallery, image });
  };

  const run = async (fn: () => Promise<string[]>) => {
    setBusy(true);
    setError(null);
    setProgress("Uploading…");
    try {
      const urls = await fn();
      mergeUrls(urls);
      setProgress(`Added ${urls.length} photo${urls.length === 1 ? "" : "s"}`);
    } catch (e) {
      setError((e as Error).message);
      setProgress("");
    } finally {
      setBusy(false);
    }
  };

  const onZip = (file: File | undefined) => {
    if (!file) return;
    void run(() =>
      uploadPhotoZip(file, folder, entityId, (done, total) =>
        setProgress(`Zip ${done}/${total}`),
      ),
    );
  };

  const onFiles = (files: FileList | null) => {
    if (!files?.length) return;
    void run(() =>
      uploadImageFiles(files, folder, entityId, (done, total) =>
        setProgress(`Photos ${done}/${total}`),
      ),
    );
  };

  const setUrl = (i: number, v: string) => {
    onChange({
      gallery: gallery.map((g, idx) => (idx === i ? v : g)),
      image: primaryImage,
    });
  };

  const remove = (i: number) => {
    const next = gallery.filter((_, idx) => idx !== i);
    onChange({
      gallery: next,
      image:
        primaryImage && next.includes(primaryImage)
          ? primaryImage
          : next[0] || "",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={busy}
          onClick={() => zipRef.current?.click()}
          className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#c9a84c] disabled:opacity-50"
        >
          {busy ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Upload className="w-3.5 h-3.5" />
          )}
          Upload photo zip
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => multiRef.current?.click()}
          className="inline-flex items-center gap-2 border border-gray-300 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider hover:border-[#c9a84c] disabled:opacity-50"
        >
          <ImagePlus className="w-3.5 h-3.5" />
          Add photos
        </button>
        <input
          ref={zipRef}
          type="file"
          accept=".zip,application/zip"
          className="hidden"
          onChange={(e) => {
            onZip(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
        <input
          ref={multiRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            onFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      <p className="text-xs text-gray-500">{hint}</p>
      {progress && (
        <p className="text-xs text-[#c9a84c] font-medium">{progress}</p>
      )}
      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2">
          {error}
        </p>
      )}

      <div className="space-y-2">
        {gallery.map((url, i) => (
          <div key={`${url}-${i}`} className="flex gap-2 items-center">
            <input
              value={url}
              onChange={(e) => setUrl(i, e.target.value)}
              placeholder="Image URL"
              className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c]"
            />
            {url ? (
              <img
                src={url}
                alt=""
                className="w-10 h-10 object-cover rounded shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded bg-gray-100 shrink-0" />
            )}
            <button
              type="button"
              onClick={() => remove(i)}
              className="p-2 text-gray-400 hover:text-red-500"
              aria-label="Remove photo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {gallery.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-2">
          {gallery.map((url, i) => (
            <div
              key={`thumb-${i}`}
              className="aspect-[4/3] overflow-hidden bg-gray-100 border border-gray-200"
            >
              {url ? (
                <img src={url} alt="" className="w-full h-full object-cover" />
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
