import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { GalleryMediaUploader } from "@/components/admin/GalleryMediaUploader";
import {
  ensureSlug,
  type ShowcaseHomeRow,
} from "@/lib/showcaseHomes";

function Field({
  label,
  value,
  onChange,
  placeholder = "",
  hint = "",
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]"
      />
      {hint && (
        <span className="block text-[10px] text-gray-400 mt-1">{hint}</span>
      )}
    </label>
  );
}

function Section({
  title,
  children,
  full = false,
}: {
  title: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="font-serif text-lg font-bold text-[#1a1a1a] mb-5">
        {title}
      </h3>
      <div
        className={`grid gap-4 ${
          full ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function AdminShowcaseForm({
  initial,
  mode,
  onSubmit,
  submitting,
  error,
}: {
  initial: ShowcaseHomeRow;
  mode: "new" | "edit";
  onSubmit: (row: ShowcaseHomeRow) => Promise<void>;
  submitting: boolean;
  error: string | null;
}) {
  const [form, setForm] = useState<ShowcaseHomeRow>(initial);

  const set = <K extends keyof ShowcaseHomeRow>(key: K, value: ShowcaseHomeRow[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next = ensureSlug(form);
    if (!next.title.trim() || !next.slug.trim() || !next.area.trim()) {
      return;
    }
    await onSubmit({
      ...next,
      from_price: Number(next.from_price) || 0,
      price_high:
        next.price_high == null || Number.isNaN(Number(next.price_high))
          ? null
          : Number(next.price_high),
      compare_to_resale: (next.compare_to_resale || [])
        .map((s) => s.trim())
        .filter(Boolean),
      gallery: (next.gallery || []).map((g) => g.trim()).filter(Boolean),
    });
  };

  const entityId = form.id ? String(form.id) : form.slug || "draft";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            to="/admin/showcase"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-gray-500 hover:text-[#c9a84c] mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> New Homes CMS
          </Link>
          <h1 className="font-serif text-3xl font-bold">
            {mode === "new" ? "Add community" : "Edit community"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse-only SoCal’s New Homes showcase — no inquire, no exact
            address.
          </p>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-[#c9a84c] disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {submitting ? "Saving…" : "Save"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3">
          {error}
        </p>
      )}

      <Section title="Community basics">
        <Field
          label="Title"
          value={form.title}
          onChange={(v) => set("title", v)}
          placeholder="Single-story plans inland"
        />
        <Field
          label="Slug"
          value={form.slug}
          onChange={(v) => set("slug", v)}
          placeholder="auto from title if blank"
          hint="URL: /new-homes/your-slug"
        />
        <Field
          label="General area"
          value={form.area}
          onChange={(v) => set("area", v)}
          placeholder="Inland Empire — not a street address"
          hint="Vague geography only"
        />
        <Field
          label="Architectural style"
          value={form.style}
          onChange={(v) => set("style", v)}
          placeholder="Ranch contemporary"
        />
        <Field
          label="From price"
          value={form.from_price}
          onChange={(v) => set("from_price", Number(v) || 0)}
          type="number"
          placeholder="589000"
        />
        <Field
          label="High price (optional)"
          value={form.price_high ?? ""}
          onChange={(v) =>
            set("price_high", v.trim() === "" ? null : Number(v) || null)
          }
          type="number"
          placeholder="720000"
        />
        <Field
          label="Beds range"
          value={form.beds}
          onChange={(v) => set("beds", v)}
          placeholder="3–4"
        />
        <Field
          label="Baths range"
          value={form.baths}
          onChange={(v) => set("baths", v)}
          placeholder="2–3"
        />
        <Field
          label="Sqft range"
          value={form.sqft}
          onChange={(v) => set("sqft", v)}
          placeholder="1,600–2,200"
        />
        <Field
          label="Sort order"
          value={form.sort_order}
          onChange={(v) => set("sort_order", Number(v) || 0)}
          type="number"
        />
        <label className="flex items-center gap-3 sm:col-span-2">
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) => set("is_published", e.target.checked)}
            className="rounded border-gray-300"
          />
          <span className="text-sm">Published on /new-homes</span>
        </label>
      </Section>

      <Section title="Photos (Serhant-style gallery)" full>
        <Field
          label="Primary image URL"
          value={form.image}
          onChange={(v) => set("image", v)}
          placeholder="Set automatically from first upload, or paste a URL"
        />
        <GalleryMediaUploader
          gallery={form.gallery}
          primaryImage={form.image}
          folder="showcase"
          entityId={entityId}
          onChange={({ gallery, image }) =>
            setForm((f) => ({
              ...f,
              gallery,
              image: image ?? f.image,
            }))
          }
          hint="Upload a zip of community photos or multi-select images. Same gallery treatment as resale — still browse-only, no inquire."
        />
        <Field
          label="Video embed URL (optional)"
          value={form.video_url}
          onChange={(v) => set("video_url", v)}
          placeholder="https://www.youtube.com/embed/…"
          hint="Only when you have a real walkthrough"
        />
      </Section>

      <Section title="Editorial" full>
        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            Blurb
          </span>
          <textarea
            value={form.blurb}
            onChange={(e) => set("blurb", e.target.value)}
            rows={3}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c] resize-y"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            Why buyers consider this community
          </span>
          <textarea
            value={form.why_buyers}
            onChange={(e) => set("why_buyers", e.target.value)}
            rows={3}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c] resize-y"
          />
        </label>
        {[0, 1, 2].map((i) => (
          <Field
            key={i}
            label={`Compare to resale note ${i + 1}`}
            value={form.compare_to_resale[i] || ""}
            onChange={(v) => {
              const next = [...form.compare_to_resale];
              next[i] = v;
              set("compare_to_resale", next);
            }}
          />
        ))}
      </Section>

      <Section title="Verified considerations">
        <Field
          label="HOA"
          value={form.hoa}
          onChange={(v) => set("hoa", v)}
          placeholder="Not yet verified"
        />
        <Field
          label="Special assessments / Mello-Roos"
          value={form.special_assessments}
          onChange={(v) => set("special_assessments", v)}
          placeholder="Not yet verified"
        />
        <Field
          label="Builder incentives"
          value={form.incentives}
          onChange={(v) => set("incentives", v)}
          placeholder="Not yet verified"
        />
        <Field
          label="Verified date"
          value={form.verified_date}
          onChange={(v) => set("verified_date", v)}
          placeholder="Nov 20, 2026"
        />
      </Section>
    </form>
  );
}
