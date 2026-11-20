import { FormEvent, useState, type ChangeEvent } from "react";
import type { ListingInput } from "@/lib/listings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TEXT_FIELDS: { key: keyof ListingInput; label: string }[] = [
  { key: "price", label: "Price" },
  { key: "status", label: "Status" },
  { key: "beds", label: "Beds" },
  { key: "baths", label: "Baths" },
  { key: "sqft", label: "Sqft" },
  { key: "type", label: "Type" },
  { key: "address", label: "Address" },
  { key: "city_state_zip", label: "City / State / ZIP" },
  { key: "mls", label: "MLS" },
  { key: "image", label: "Primary image URL" },
  { key: "overview_property_type", label: "Overview: property type" },
  { key: "overview_location", label: "Overview: location" },
  { key: "overview_mls_id", label: "Overview: MLS id" },
  { key: "overview_last_updated", label: "Overview: last updated" },
  { key: "overview_status", label: "Overview: status" },
  { key: "interior_bedrooms", label: "Interior: bedrooms" },
  { key: "interior_full_baths", label: "Interior: full baths" },
  { key: "interior_half_baths", label: "Interior: half baths" },
  { key: "interior_flooring", label: "Interior: flooring" },
  { key: "interior_appliances", label: "Interior: appliances" },
  { key: "interior_other", label: "Interior: other" },
  { key: "exterior_stories", label: "Exterior: stories" },
  { key: "exterior_garage", label: "Exterior: garage" },
  { key: "exterior_water", label: "Exterior: water" },
  { key: "exterior_roof", label: "Exterior: roof" },
  { key: "exterior_ac", label: "Exterior: A/C" },
  { key: "exterior_other", label: "Exterior: other" },
  { key: "details_neighborhood", label: "Details: neighborhood" },
  { key: "details_architecture", label: "Details: architecture" },
  { key: "details_view", label: "Details: view" },
  { key: "agent_name", label: "Agent name" },
  { key: "agent_role", label: "Agent role" },
  { key: "agent_phone", label: "Agent phone" },
  { key: "agent_email", label: "Agent email" },
  { key: "agent_image", label: "Agent image URL" }
];

export function AdminListingForm({
  initial,
  onSubmit,
  busy,
}: {
  initial: ListingInput;
  onSubmit: (values: ListingInput) => void;
  busy?: boolean;
}) {
  const [values, setValues] = useState<ListingInput>(initial);
  const [gallery, setGallery] = useState((initial.gallery ?? []).join("\n"));
  const [badges, setBadges] = useState((initial.badges ?? []).join(", "));

  const set =
    (key: keyof ListingInput) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const v = e.target.value;
      setValues((prev) => ({ ...prev, [key]: v }));
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...values,
      gallery: gallery
        .split(/\n|,/)
        .map((s) => s.trim())
        .filter(Boolean),
      badges: badges
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      photos_count: Number(values.photos_count) || 1,
      sort_order: Number(values.sort_order) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        {TEXT_FIELDS.map(({ key, label }) => (
          <div key={String(key)} className="space-y-2">
            <Label htmlFor={String(key)}>{label}</Label>
            <Input
              id={String(key)}
              value={String(values[key] ?? "")}
              onChange={set(key)}
            />
          </div>
        ))}
        <div className="space-y-2">
          <Label htmlFor="photos_count">Photos count</Label>
          <Input
            id="photos_count"
            type="number"
            value={values.photos_count}
            onChange={(e) =>
              setValues((p) => ({ ...p, photos_count: Number(e.target.value) }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sort_order">Sort order</Label>
          <Input
            id="sort_order"
            type="number"
            value={values.sort_order}
            onChange={(e) =>
              setValues((p) => ({ ...p, sort_order: Number(e.target.value) }))
            }
          />
        </div>
        <div className="flex items-center gap-2 md:col-span-2">
          <input
            id="is_published"
            type="checkbox"
            checked={!!values.is_published}
            onChange={(e) =>
              setValues((p) => ({ ...p, is_published: e.target.checked }))
            }
          />
          <Label htmlFor="is_published">Published</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={6}
          value={values.description}
          onChange={set("description")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="gallery">Gallery URLs (one per line)</Label>
        <Textarea
          id="gallery"
          rows={5}
          value={gallery}
          onChange={(e) => setGallery(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="badges">Badges (comma-separated)</Label>
        <Input id="badges" value={badges} onChange={(e) => setBadges(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="admin_notes">Admin notes</Label>
        <Textarea
          id="admin_notes"
          rows={3}
          value={values.admin_notes}
          onChange={set("admin_notes")}
        />
      </div>

      <Button type="submit" variant="gold" disabled={busy}>
        {busy ? "Saving…" : "Save listing"}
      </Button>
    </form>
  );
}
