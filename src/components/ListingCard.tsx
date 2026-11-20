import { Link } from "react-router-dom";
import type { Listing } from "@/lib/listings";
import { Badge } from "@/components/ui/badge";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      to={`/listing/${listing.id}`}
      className="group block overflow-hidden bg-white/40 transition hover:bg-white/70"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={listing.image}
          alt={listing.address}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1">
          {listing.badges?.map((b) => (
            <Badge key={b}>{b}</Badge>
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-2xl">{listing.price}</p>
          <p className="text-xs uppercase tracking-wide text-gold">{listing.status}</p>
        </div>
        <p className="mt-2 text-sm text-ink/70">
          {listing.beds} Beds · {listing.baths} Baths · {listing.sqft} · {listing.type}
        </p>
        <p className="mt-1 text-sm font-medium">
          {listing.address}, {listing.city_state_zip}
        </p>
        <p className="mt-1 text-xs text-ink/45">{listing.mls}</p>
      </div>
    </Link>
  );
}
