import { useRef, useState, type DragEvent } from "react";
import { GripVertical, ImagePlus, Loader2, Trash2, Upload } from "lucide-react";
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

function reorder<T>(list: T[], from: number, to: number): T[] {
  if (from === to || from < 0 || to < 0 || from >= list.length || to >= list.length) {
    return list;
  }
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function GalleryMediaUploader({
  gallery,
  primaryImage = "",
  folder,
  entityId,
  onChange,
  hint = "Drop a photo zip or multi-select images — they become the Serhant-style gallery on the property page. Drag to set order (first = hero).",
}: Props) {
  const zipRef = useRef<HTMLInputElement>(null);
  const multiRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const commitOrder = (next: string[]) => {
    onChange({
      gallery: next,
      // First photo is the hero / primary
      image: next[0] || "",
    });
  };

  const mergeUrls = (urls: string[]) => {
    const nextGallery = [...gallery, ...urls];
    const image = primaryImage.trim() || urls[0] || nextGallery[0] || "";
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
    const next = gallery.map((g, idx) => (idx === i ? v : g));
    onChange({
      gallery: next,
      image: i === 0 ? v || primaryImage : primaryImage,
    });
  };

  const remove = (i: number) => {
    const next = gallery.filter((_, idx) => idx !== i);
    commitOrder(next);
  };

  const onDragStart = (i: number) => (e: DragEvent) => {
    setDragIndex(i);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(i));
  };

  const onDragOver = (i: number) => (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (overIndex !== i) setOverIndex(i);
  };

  const onDrop = (i: number) => (e: DragEvent) => {
    e.preventDefault();
    const from = dragIndex ?? Number(e.dataTransfer.getData("text/plain"));
    if (Number.isFinite(from)) commitOrder(reorder(gallery, from, i));
    setDragIndex(null);
    setOverIndex(null);
  };

  const onDragEnd = () => {
    setDragIndex(null);
    setOverIndex(null);
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
          <div
            key={`${url}-${i}`}
            draggable
            onDragStart={onDragStart(i)}
            onDragOver={onDragOver(i)}
            onDrop={onDrop(i)}
            onDragEnd={onDragEnd}
            className={`flex gap-2 items-center rounded-md border bg-white px-2 py-1.5 cursor-grab active:cursor-grabbing ${
              dragIndex === i
                ? "opacity-50 border-[#c9a84c]"
                : overIndex === i
                  ? "border-[#c9a84c] ring-1 ring-[#c9a84c]/40"
                  : "border-gray-200"
            }`}
          >
            <span
              className="text-gray-400 shrink-0"
              title="Drag to reorder"
              aria-hidden
            >
              <GripVertical className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-bold text-gray-400 w-5 shrink-0">
              {i + 1}
            </span>
            <input
              value={url}
              onChange={(e) => setUrl(i, e.target.value)}
              placeholder="Image URL"
              className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c]"
              onMouseDown={(e) => e.stopPropagation()}
            />
            {url ? (
              <img
                src={url}
                alt=""
                className="w-10 h-10 object-cover rounded shrink-0 pointer-events-none"
                draggable={false}
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
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">
            Drag thumbnails to reorder · #1 is hero
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {gallery.map((url, i) => (
              <div
                key={`thumb-${url}-${i}`}
                draggable
                onDragStart={onDragStart(i)}
                onDragOver={onDragOver(i)}
                onDrop={onDrop(i)}
                onDragEnd={onDragEnd}
                className={`relative aspect-[4/3] overflow-hidden bg-gray-100 border cursor-grab active:cursor-grabbing ${
                  dragIndex === i
                    ? "opacity-50 border-[#c9a84c]"
                    : overIndex === i
                      ? "border-[#c9a84c] ring-2 ring-[#c9a84c]/50"
                      : i === 0
                        ? "border-[#c9a84c]"
                        : "border-gray-200"
                }`}
              >
                {url ? (
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />
                ) : null}
                <span className="absolute top-1 left-1 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5">
                  {i === 0 ? "Hero" : i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
