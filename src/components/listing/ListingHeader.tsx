import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BedDouble,
  Bath,
  Ruler,
  MapPin,
  ChevronRight,
  Share2,
  Check,
} from "lucide-react";
import type { Listing } from "@/data/listings";
import { StatusPill } from "@/components/listing/StatusPill";
import { useLang } from "@/lib/i18n";

function ShareButton({ listing }: { listing: Listing }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: listing.address, url });
        return;
      } catch {
        /* fall through */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="flex items-center gap-2 px-5 py-3 border border-gray-300 text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Share2 className="w-4 h-4" />
      )}
      {copied ? t.copied : t.share}
    </button>
  );
}

export function ListingHeader({
  listing,
}: {
  listing: Listing;
  isClosed?: boolean;
}) {
  const { t } = useLang();
  return (
    <section className="bg-[#f7f5f2] border-b border-gray-200">
      <div className="container mx-auto px-6 max-w-7xl py-6">
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">
            {t.breadcrumbHome}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/homes" className="hover:text-black">
            {t.navHomes}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black font-medium truncate max-w-[220px]">
            {listing.address}
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mt-6">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <StatusPill listing={listing} />
              <span className="text-[#c9a84c] text-[11px] uppercase font-bold tracking-widest">
                {listing.type} • {listing.features.details.neighborhood}
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1a1a1a] leading-tight">
              {listing.address}
            </h1>
            <p className="text-gray-500 text-sm mt-2 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-[#c9a84c]" />
              {listing.cityStateZip}
            </p>
            <div className="flex items-center gap-6 mt-5 flex-wrap">
              <span className="font-serif text-3xl md:text-4xl font-bold text-[#1a1a1a]">
                {listing.price}
              </span>
              <div className="h-8 w-px bg-gray-300 hidden sm:block" />
              <div className="flex items-center gap-5 text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-1.5">
                  <BedDouble className="w-4 h-4 text-[#c9a84c]" />
                  {listing.beds} {t.beds}
                </span>
                <span className="flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-[#c9a84c]" />
                  {listing.baths} {t.baths}
                </span>
                <span className="flex items-center gap-1.5">
                  <Ruler className="w-4 h-4 text-[#c9a84c]" />
                  {listing.sqft}
                </span>
              </div>
            </div>
          </div>
          <ShareButton listing={listing} />
        </div>
      </div>
    </section>
  );
}
