import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchListingById } from "@/lib/listings";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ScheduleTour } from "@/components/ScheduleTour";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export default function ListingDetail() {
  const { id } = useParams();
  const listingId = Number(id);
  const { data: listing, isLoading, error } = useQuery({
    queryKey: ["listing", listingId],
    queryFn: () => fetchListingById(listingId),
    enabled: Number.isFinite(listingId),
  });

  return (
    <div className="min-h-screen bg-cream">
      <div className="relative bg-ink pb-10">
        <SiteHeader />
        <div className="h-20" />
      </div>
      <main className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        {isLoading && <p>Loading…</p>}
        {error && <p className="text-red-700">Could not load listing.</p>}
        {!isLoading && !listing && (
          <p>
            Listing not found. <Link to="/" className="text-gold underline">Home</Link>
          </p>
        )}
        {listing && (
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-ink/5">
                <img
                  src={listing.image}
                  alt={listing.address}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-3 top-3 flex gap-1">
                  {listing.badges?.map((b) => (
                    <Badge key={b}>{b}</Badge>
                  ))}
                </div>
              </div>
              {listing.gallery?.length > 1 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {listing.gallery.slice(0, 6).map((src) => (
                    <img key={src} src={src} alt="" className="aspect-video object-cover" />
                  ))}
                </div>
              )}
              <h1 className="mt-8 font-display text-4xl">{listing.price}</h1>
              <p className="mt-1 text-gold">{listing.status}</p>
              <p className="mt-3 text-lg">
                {listing.address}, {listing.city_state_zip}
              </p>
              <p className="mt-1 text-sm text-ink/55">
                {listing.beds} Beds · {listing.baths} Baths · {listing.sqft} · {listing.type} · {listing.mls}
              </p>
              <p className="mt-6 leading-relaxed text-ink/80">{listing.description}</p>

              <Section title="Overview">
                <KV label="Property type" value={listing.overview_property_type} />
                <KV label="Location" value={listing.overview_location} />
                <KV label="MLS" value={listing.overview_mls_id} />
                <KV label="Updated" value={listing.overview_last_updated} />
                <KV label="Status" value={listing.overview_status} />
              </Section>
              <Section title="Interior">
                <KV label="Bedrooms" value={listing.interior_bedrooms} />
                <KV label="Full baths" value={listing.interior_full_baths} />
                <KV label="Flooring" value={listing.interior_flooring} />
                <KV label="Appliances" value={listing.interior_appliances} />
                <KV label="Other" value={listing.interior_other} />
              </Section>
              <Section title="Exterior">
                <KV label="Stories" value={listing.exterior_stories} />
                <KV label="Garage" value={listing.exterior_garage} />
                <KV label="Water" value={listing.exterior_water} />
                <KV label="Roof" value={listing.exterior_roof} />
                <KV label="A/C" value={listing.exterior_ac} />
                <KV label="Other" value={listing.exterior_other} />
              </Section>
              <Section title="Details">
                <KV label="Neighborhood" value={listing.details_neighborhood} />
                <KV label="Architecture" value={listing.details_architecture} />
                <KV label="View" value={listing.details_view} />
              </Section>
            </div>
            <aside className="space-y-6">
              <ScheduleTour />
              <div className="border border-ink/10 bg-white/50 p-6">
                <div className="flex items-center gap-4">
                  {listing.agent_image && (
                    <img
                      src={listing.agent_image}
                      alt={listing.agent_name}
                      className="h-16 w-16 object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium">{listing.agent_name}</p>
                    <p className="text-sm text-ink/55">{listing.agent_role}</p>
                  </div>
                </div>
                {listing.agent_phone && (
                  <p className="mt-4 text-sm">{listing.agent_phone}</p>
                )}
                {listing.agent_email && (
                  <a className="text-sm text-gold" href={`mailto:${listing.agent_email}`}>
                    {listing.agent_email}
                  </a>
                )}
              </div>
            </aside>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10 border-t border-ink/10 pt-6">
      <h2 className="font-display text-2xl">{title}</h2>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">{children}</dl>
    </section>
  );
}

function KV({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-ink/45">{label}</dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  );
}
