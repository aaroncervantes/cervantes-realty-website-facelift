import { ArrowRight, Mail, Phone } from "lucide-react";
import type { Listing } from "@/data/listings";
import { Reveal } from "@/components/site/Reveal";
import { ScheduleTour } from "@/components/site/ScheduleTour";
import { MortgageCalculator } from "@/components/site/MortgageCalculator";
import { buyTypeform } from "@/lib/typeform";
import { parsePrice } from "@/lib/mortgage";

function Meta({
  label,
  value,
  gold = false,
}: {
  label: string;
  value: string;
  gold?: boolean;
}) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
        {label}
      </dt>
      <dd
        className={`text-sm font-semibold mt-0.5 ${gold ? "text-[#c9a84c]" : "text-[#1a1a1a]"}`}
      >
        {value}
      </dd>
    </div>
  );
}

function FeatureGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-widest font-bold text-[#c9a84c] mb-5 pb-2 border-b border-gray-200">
        {title}
      </h3>
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
        {children}
      </dl>
    </div>
  );
}

function Feature({
  label,
  value,
  full = false,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <dt className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
        {label}
      </dt>
      <dd className="text-sm font-semibold text-[#1a1a1a] mt-0.5">{value}</dd>
    </div>
  );
}

function LocationBlock({ listing }: { listing: Listing }) {
  const q = `${listing.address}, ${listing.cityStateZip}`;
  return (
    <div>
      <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2 text-[#1a1a1a]">
        Location
      </h2>
      <p className="text-sm text-gray-600 mb-5">
        {listing.address}, {listing.cityStateZip}
      </p>
      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        <iframe
          title={`Map of ${listing.address}`}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(q)}&output=embed`}
          className="w-full h-[360px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        <Meta
          label="Neighborhood"
          value={listing.features.details.neighborhood}
        />
        <Meta
          label="Architecture"
          value={listing.features.details.architectureStyle}
        />
        <Meta label="View" value={listing.features.details.viewDescription} />
      </div>
      <a
        href={`https://maps.google.com/?q=${encodeURIComponent(q)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-6 text-xs font-bold uppercase tracking-wider text-[#1a1a1a] hover:text-[#c9a84c] transition-colors"
      >
        Open in Google Maps
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

function SidebarCTA({
  listing,
  isClosed,
}: {
  listing: Listing;
  isClosed: boolean;
}) {
  if (isClosed) {
    const seller = listing.badges.some((b) => /seller/i.test(b));
    return (
      <div className="bg-[#1a1a1a] text-white rounded-2xl p-6 shadow-xl">
        <span className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold">
          Recently Sold
        </span>
        <h3 className="font-serif text-2xl font-bold mt-2 mb-2">
          This home is sold.
        </h3>
        <p className="text-sm text-gray-300 mb-5 leading-relaxed">
          We represented the {seller ? "seller" : "buyer"} on this{" "}
          {listing.features.details.neighborhood} property. Looking for
          something similar? I'll help you find it.
        </p>
        <a
          href={buyTypeform("listing")}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#c9a84c] text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-center hover:opacity-90 transition-opacity mb-3"
        >
          Get a home like this
        </a>
        <a
          href={`mailto:${listing.agent.email}`}
          className="block w-full border border-gray-600 text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-center hover:bg-white/5 transition-colors"
        >
          Ask Aaron about this area
        </a>
      </div>
    );
  }
  return <ScheduleTour address={listing.address} />;
}

function AgentCard({ listing }: { listing: Listing }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={listing.agent.image}
          alt={listing.agent.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-[#c9a84c] shrink-0"
        />
        <div className="min-w-0">
          <span className="text-[10px] text-[#c9a84c] font-bold uppercase tracking-wider block">
            Listing Agent
          </span>
          <h4 className="font-serif font-bold text-base text-[#1a1a1a] truncate">
            {listing.agent.name}
          </h4>
          <p className="text-xs text-gray-500 font-medium truncate">
            {listing.agent.role}
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-5">
        <a
          href={`mailto:${listing.agent.email}`}
          className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a1a] text-white py-3 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#c9a84c] transition-colors"
        >
          <Mail className="w-4 h-4" /> Email
        </a>
        {listing.agent.phone && (
          <a
            href={`tel:${listing.agent.phone.replace(/[^0-9+]/g, "")}`}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-gray-50 transition-colors"
          >
            <Phone className="w-4 h-4" /> Call
          </a>
        )}
      </div>
    </div>
  );
}

export function ListingBody({
  listing,
  isClosed,
}: {
  listing: Listing;
  isClosed: boolean;
}) {
  return (
    <section className="py-12 md:py-16 bg-[#f7f5f2]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-2 space-y-14">
            <Reveal id="overview-section" className="scroll-mt-40">
              <div className="space-y-10">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-[#1a1a1a]">
                    About this home
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg max-w-2xl">
                    {listing.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#c9a84c] mb-5 pb-2 border-b border-gray-200">
                    Overview
                  </h3>
                  <dl className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5">
                    <Meta
                      label="Property Type"
                      value={listing.overview.propertyType}
                    />
                    <Meta label="MLS ID" value={listing.overview.mlsId} />
                    <Meta
                      label="Status"
                      value={listing.overview.status}
                      gold
                    />
                    <Meta
                      label="Last Updated"
                      value={listing.overview.lastUpdated}
                    />
                    <Meta label="Location" value={listing.address} />
                  </dl>
                </div>
              </div>
            </Reveal>

            <Reveal id="features-section" className="scroll-mt-40">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-[#1a1a1a]">
                  Features & Amenities
                </h2>
                <div className="space-y-10">
                  <FeatureGroup title="Interior Features">
                    <Feature
                      label="Bedrooms"
                      value={listing.features.interior.bedrooms}
                    />
                    <Feature
                      label="Bathrooms"
                      value={listing.features.interior.fullBaths}
                    />
                    <Feature
                      label="Flooring"
                      value={listing.features.interior.flooring}
                    />
                    <Feature
                      label="Appliances"
                      value={listing.features.interior.appliances}
                    />
                    <Feature
                      label="Other Interior Features"
                      value={listing.features.interior.otherFeatures}
                      full
                    />
                  </FeatureGroup>
                  <FeatureGroup title="Exterior Features">
                    <Feature
                      label="Stories"
                      value={listing.features.exterior.stories}
                    />
                    <Feature
                      label="Garage & Parking"
                      value={listing.features.exterior.garageSpaces}
                    />
                    <Feature
                      label="Water Source"
                      value={listing.features.exterior.waterSource}
                    />
                    <Feature
                      label="Air Conditioning & Heat"
                      value={listing.features.exterior.airConditioning}
                    />
                    <Feature
                      label="Other Exterior Features"
                      value={listing.features.exterior.otherFeatures}
                      full
                    />
                  </FeatureGroup>
                  <FeatureGroup title="Location Details & Architecture">
                    <Feature
                      label="Neighborhood"
                      value={listing.features.details.neighborhood}
                    />
                    <Feature
                      label="Architecture Style"
                      value={listing.features.details.architectureStyle}
                    />
                    <Feature
                      label="View"
                      value={listing.features.details.viewDescription}
                    />
                  </FeatureGroup>
                </div>
              </div>
            </Reveal>

            <Reveal id="location-section" className="scroll-mt-40">
              <LocationBlock listing={listing} />
            </Reveal>
          </div>

          <div
            id="schedule-tour"
            className="space-y-6 scroll-mt-40 lg:sticky lg:top-40 lg:self-start lg:max-h-[calc(100vh-184px)] lg:overflow-y-auto no-scrollbar"
          >
            <SidebarCTA listing={listing} isClosed={isClosed} />
            {!isClosed && (
              <MortgageCalculator
                initialPrice={parsePrice(listing.price)}
                variant="sidebar"
                title="Payment for this home"
                showLinkToFull
              />
            )}
            <AgentCard listing={listing} />
          </div>
        </div>
      </div>
    </section>
  );
}
