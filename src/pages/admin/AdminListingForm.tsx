import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import type { ListingRow } from "@/lib/listings";
import { GalleryMediaUploader } from "@/components/admin/GalleryMediaUploader";

const STATUS_OPTIONS = [
  "For Sale",
  "Active",
  "Pending",
  "Closed",
  "Sold",
  "Coming Soon",
];
const TYPE_OPTIONS = [
  "Single Family",
  "Condo",
  "Townhouse",
  "Multi-Family",
  "Land",
  "Commercial",
  "Other",
];

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

function PreviewBadge({ status, hidden }: { status: string; hidden: boolean }) {
  if (hidden) {
    return (
      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
        Hidden
      </span>
    );
  }
  const s = status.toLowerCase();
  let cls = "bg-gray-100 text-gray-600";
  if (s.includes("for sale") || s.includes("active"))
    cls = "bg-green-100 text-green-700";
  else if (s.includes("pending")) cls = "bg-amber-100 text-amber-700";
  else if (s.includes("closed") || s.includes("sold"))
    cls = "bg-blue-100 text-blue-700";
  return (
    <span
      className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${cls}`}
    >
      {status}
    </span>
  );
}

interface AdminListingFormProps {
  initial: ListingRow;
  mode: "new" | "edit";
  onSubmit: (row: ListingRow) => void | Promise<void>;
  submitting: boolean;
  error?: string | null;
}

export default function AdminListingForm({
  initial,
  mode,
  onSubmit,
  submitting,
  error,
}: AdminListingFormProps) {
  const [form, setForm] = useState<ListingRow>(initial);
  const [localError, setLocalError] = useState<string | null>(null);

  const set = <K extends keyof ListingRow>(key: K, value: ListingRow[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!form.price.trim()) return setLocalError("Price is required.");
    if (!form.address.trim()) return setLocalError("Address is required.");
    if (!form.status.trim()) return setLocalError("Status is required.");
    const gallery = form.gallery.map((g) => g.trim()).filter(Boolean);
    const badges = form.badges.map((b) => b.trim()).filter(Boolean);
    onSubmit({
      ...form,
      gallery,
      badges,
      photos_count: gallery.length || 1,
    });
  };

  const displayError = localError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-16">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/listings"
            className="p-2 rounded-md hover:bg-white text-gray-500"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-serif text-2xl font-bold text-[#1a1a1a]">
            {mode === "new" ? "New Listing" : "Edit Listing"}
          </h1>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-[#c9a84c] transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {submitting ? "Saving…" : "Save Listing"}
        </button>
      </div>

      {displayError && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-4 py-3">
          {displayError}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-4">
        <div className="w-24 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
          {form.image ? (
            <img
              src={form.image}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1a1a1a]">
              {form.price || "$—"}
            </span>
            <PreviewBadge
              status={form.status}
              hidden={!form.is_published}
            />
          </div>
          <p className="text-sm text-gray-600 truncate">
            {form.address || "Address"}
            {form.city_state_zip ? `, ${form.city_state_zip}` : ""}
          </p>
          <p className="text-xs text-gray-400">
            {form.beds || "0"} bd · {form.baths || "0"} ba · {form.sqft || "—"}{" "}
            · {form.mls}
          </p>
        </div>
      </div>

      <Section title="Basics">
        <Field
          label="Price"
          value={form.price}
          onChange={(v) => set("price", v)}
          placeholder="$429,999"
        />
        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            Status
          </span>
          <select
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c]"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <Field
          label="Beds"
          value={form.beds}
          onChange={(v) => set("beds", v)}
          placeholder="3"
        />
        <Field
          label="Baths"
          value={form.baths}
          onChange={(v) => set("baths", v)}
          placeholder="2"
        />
        <Field
          label="Sqft"
          value={form.sqft}
          onChange={(v) => set("sqft", v)}
          placeholder="1,796 sqft"
        />
        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            Property Type
          </span>
          <select
            value={form.type}
            onChange={(e) => set("type", e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c]"
          >
            {TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <Field
          label="Address (street)"
          value={form.address}
          onChange={(v) => set("address", v)}
          placeholder="12858 Atsina Rd"
        />
        <Field
          label="City, State Zip"
          value={form.city_state_zip}
          onChange={(v) => set("city_state_zip", v)}
          placeholder="Phelan, CA 92371"
        />
        <Field
          label="MLS #"
          value={form.mls}
          onChange={(v) => set("mls", v)}
          placeholder="MLS# CV26183674"
        />
        <label className="block sm:col-span-2">
          <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            Badges (comma separated)
          </span>
          <input
            value={form.badges.join(", ")}
            onChange={(e) =>
              set(
                "badges",
                e.target.value
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean),
              )
            }
            placeholder="Represented Buyer, Representing Seller"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c]"
          />
          <span className="block text-[10px] text-gray-400 mt-1">
            Shown as gold pills on the card. e.g. Represented Buyer, Represented
            Seller, Representing Seller
          </span>
        </label>
      </Section>

      <Section title="Media — Serhant-style photo gallery" full>
        <label className="block mb-4">
          <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            Primary Image URL
          </span>
          <input
            value={form.image}
            onChange={(e) => set("image", e.target.value)}
            placeholder="Auto-filled from first upload, or paste a URL"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c]"
          />
        </label>
        <GalleryMediaUploader
          gallery={form.gallery}
          primaryImage={form.image}
          folder="listings"
          entityId={form.id ? String(form.id) : "draft"}
          onChange={({ gallery, image }) =>
            setForm((prev) => ({
              ...prev,
              gallery,
              image: image ?? prev.image,
            }))
          }
          hint="Upload a zip of property photos or multi-select images. They feed the full-bleed gallery on the listing page."
        />
        {(!form.image.trim() ||
          form.gallery.map((g) => g.trim()).filter(Boolean).length < 5) && (
          <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2">
            Photo quality tip: add a primary image and at least 5 gallery photos
            before publishing — Serhant-style pages need depth.
          </p>
        )}
      </Section>

      <Section title="Description" full>
        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            Description
          </span>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={5}
            placeholder="Property description…"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c] resize-y"
          />
        </label>
      </Section>

      <Section title="Overview Details">
        <Field
          label="Property Type"
          value={form.overview_property_type}
          onChange={(v) => set("overview_property_type", v)}
          placeholder="Single Family Residence"
        />
        <Field
          label="Location"
          value={form.overview_location}
          onChange={(v) => set("overview_location", v)}
          placeholder="12858 Atsina Rd, Phelan, CA 92371"
        />
        <Field
          label="MLS ID"
          value={form.overview_mls_id}
          onChange={(v) => set("overview_mls_id", v)}
          placeholder="CV26183674"
        />
        <Field
          label="Last Updated"
          value={form.overview_last_updated}
          onChange={(v) => set("overview_last_updated", v)}
          placeholder="Active Listing"
        />
        <Field
          label="Overview Status"
          value={form.overview_status}
          onChange={(v) => set("overview_status", v)}
          placeholder="Active / For Sale"
        />
      </Section>

      <Section title="Interior Features">
        <Field
          label="Bedrooms"
          value={form.interior_bedrooms}
          onChange={(v) => set("interior_bedrooms", v)}
          placeholder="3 Bedrooms"
        />
        <Field
          label="Full Baths"
          value={form.interior_full_baths}
          onChange={(v) => set("interior_full_baths", v)}
          placeholder="2 Full Baths"
        />
        <Field
          label="Half Baths"
          value={form.interior_half_baths}
          onChange={(v) => set("interior_half_baths", v)}
          placeholder=""
        />
        <Field
          label="Flooring"
          value={form.interior_flooring}
          onChange={(v) => set("interior_flooring", v)}
          placeholder="Laminate Wood, Tile"
        />
        <Field
          label="Appliances"
          value={form.interior_appliances}
          onChange={(v) => set("interior_appliances", v)}
          placeholder="Oven/Range, Dishwasher"
        />
        <label className="block sm:col-span-2">
          <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            Other Interior Features
          </span>
          <input
            value={form.interior_other}
            onChange={(e) => set("interior_other", e.target.value)}
            placeholder="Spacious Living Room, Dining Area…"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c]"
          />
        </label>
      </Section>

      <Section title="Exterior Features">
        <Field
          label="Stories"
          value={form.exterior_stories}
          onChange={(v) => set("exterior_stories", v)}
          placeholder="1 Story"
        />
        <Field
          label="Garage / Parking"
          value={form.exterior_garage}
          onChange={(v) => set("exterior_garage", v)}
          placeholder="2 Car Attached Garage"
        />
        <Field
          label="Water Source"
          value={form.exterior_water}
          onChange={(v) => set("exterior_water", v)}
          placeholder="Public Water"
        />
        <Field
          label="Roof"
          value={form.exterior_roof}
          onChange={(v) => set("exterior_roof", v)}
          placeholder="Tile / Shingle"
        />
        <Field
          label="Air Conditioning"
          value={form.exterior_ac}
          onChange={(v) => set("exterior_ac", v)}
          placeholder="Central Air & Heat"
        />
        <label className="block sm:col-span-2">
          <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            Other Exterior Features
          </span>
          <input
            value={form.exterior_other}
            onChange={(e) => set("exterior_other", e.target.value)}
            placeholder="Large Open Lot, RV Parking…"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c]"
          />
        </label>
      </Section>

      <Section title="Location Details & Architecture">
        <Field
          label="Neighborhood"
          value={form.details_neighborhood}
          onChange={(v) => set("details_neighborhood", v)}
          placeholder="Phelan Rural / High Desert"
        />
        <Field
          label="Architecture Style"
          value={form.details_architecture}
          onChange={(v) => set("details_architecture", v)}
          placeholder="Ranch Contemporary"
        />
        <Field
          label="View"
          value={form.details_view}
          onChange={(v) => set("details_view", v)}
          placeholder="Desert & Mountain Views"
        />
      </Section>

      <Section title="Listing Agent">
        <Field
          label="Agent Name"
          value={form.agent_name}
          onChange={(v) => set("agent_name", v)}
          placeholder="Aaron Cervantes"
        />
        <Field
          label="Agent Role"
          value={form.agent_role}
          onChange={(v) => set("agent_role", v)}
          placeholder="Founder - Realtor"
        />
        <Field
          label="Agent Phone"
          value={form.agent_phone}
          onChange={(v) => set("agent_phone", v)}
          placeholder="(661) 839-4931"
        />
        <Field
          label="Agent Email"
          value={form.agent_email}
          onChange={(v) => set("agent_email", v)}
          placeholder="aaron@cervantesestates.com"
        />
        <label className="block sm:col-span-2">
          <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            Agent Image URL
          </span>
          <input
            value={form.agent_image}
            onChange={(e) => set("agent_image", e.target.value)}
            placeholder="https://vibe.filesafe.space/..."
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c]"
          />
        </label>
      </Section>

      <Section title="Admin Controls">
        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            Sort Order
          </span>
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => set("sort_order", Number(e.target.value))}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c]"
          />
          <span className="block text-[10px] text-gray-400 mt-1">
            Lower numbers appear first on the homepage.
          </span>
        </label>
        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            Published
          </span>
          <div className="flex items-center gap-3 h-10">
            <button
              type="button"
              onClick={() => set("is_published", !form.is_published)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                form.is_published ? "bg-[#c9a84c]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  form.is_published ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className="text-sm text-gray-600">
              {form.is_published ? "Visible on site" : "Hidden"}
            </span>
          </div>
        </label>
        <label className="block sm:col-span-2">
          <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            Admin Notes (private)
          </span>
          <textarea
            value={form.admin_notes}
            onChange={(e) => set("admin_notes", e.target.value)}
            rows={2}
            placeholder="Internal notes, not shown publicly…"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c] resize-y"
          />
        </label>
      </Section>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-6 py-3 rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-[#c9a84c] transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {submitting ? "Saving…" : "Save Listing"}
        </button>
      </div>
    </form>
  );
}
