import { Camera } from "lucide-react";
import { Link } from "react-router-dom";
import type { Listing } from "@/data/listings";
import { isClosedListing } from "@/lib/listings";
import {
  DEFAULT_DOWN_PERCENT,
  DEFAULT_RATE,
  DEFAULT_TERM_YEARS,
  calcMortgage,
  formatCurrency,
  parsePrice,
} from "@/lib/mortgage";

export function ListingCard({ listing }: { listing: Listing }) {
  const closed = isClosedListing(listing);
  const price = parsePrice(listing.price);
  const est = calcMortgage({
    price,
    downPayment: (price * DEFAULT_DOWN_PERCENT) / 100,
    ratePercent: DEFAULT_RATE,
    termYears: DEFAULT_TERM_YEARS,
  });

  return (
    <Link to={`/listing/${listing.id}`} className="block group">
      <article className="overflow-hidden border border-gray-200 bg-white hover:border-[#c9a84c]/60 transition-colors">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={listing.image}
            alt={listing.address}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            {listing.badges.map((badge, i) => (
              <span
                key={i}
                className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold text-white ${
                  badge.includes("Represented") ||
                  badge.includes("Representing")
                    ? "bg-[#c9a84c]"
                    : "bg-black/60 backdrop-blur-sm"
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 text-xs flex items-center gap-1">
            <Camera className="w-3.5 h-3.5" />
            <span>{listing.photosCount}</span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-2 gap-3">
            <h3 className="text-2xl font-bold text-[#1a1a1a] group-hover:text-[#c9a84c] transition-colors">
              {listing.price}
            </h3>
            <div className="flex items-center gap-1.5 mt-1.5 shrink-0">
              <span
                className={`w-2 h-2 rounded-full ${closed ? "bg-gray-400" : "bg-green-600"}`}
              />
              <span className="text-xs font-medium text-gray-700">
                {listing.status}
              </span>
            </div>
          </div>
          {!closed && price > 0 && (
            <p className="text-xs text-gray-500 mb-2">
              Est. {formatCurrency(est.monthlyPI)}/mo P&amp;I
            </p>
          )}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-[#1a1a1a] mb-2">
            <span>{listing.beds} Beds</span>
            <span className="text-gray-300">•</span>
            <span>{listing.baths} Baths</span>
            <span className="text-gray-300">•</span>
            <span>{listing.sqft}</span>
            <span className="text-gray-300">•</span>
            <span>{listing.type}</span>
          </div>
          <p className="text-sm text-gray-600 truncate">
            {listing.address}
            {listing.cityStateZip ? `, ${listing.cityStateZip}` : ""}
          </p>
        </div>
      </article>
    </Link>
  );
}
