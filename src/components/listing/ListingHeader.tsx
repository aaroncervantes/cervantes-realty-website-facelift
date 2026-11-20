import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BedDouble,
  Bath,
  Ruler,
  MapPin,
  ChevronRight,
  Heart,
  Share2,
  Check,
} from "lucide-react";
import type { Listing } from "@/data/listings";

function StatusBadge({
  status,
  isClosed,
}: {
  status: string;
  isClosed: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
        isClosed ? "bg-[#1a1a1a] text-white" : "bg-green-600 text-white"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${isClosed ? "bg-[#c9a84c]" : "bg-white"}`}
      />
      {status}
    </span>
  );
}

function SaveShare({ listing }: { listing: Listing }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(localStorage.getItem(`cr-saved-${listing.id}`) === "1");
  }, [listing.id]);

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

  const toggleSave = () => {
    const next = !saved;
    setSaved(next);
    localStorage.setItem(`cr-saved-${listing.id}`, next ? "1" : "0");
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={toggleSave}
        className={`flex items-center gap-2 px-5 py-3 rounded-full border text-xs font-semibold uppercase tracking-wider transition-colors ${
          saved
            ? "bg-red-50 text-red-600 border-red-200"
            : "border-gray-300 hover:bg-white"
        }`}
      >
        <Heart className={`w-4 h-4 ${saved ? "fill-red-600 text-red-600" : ""}`} />
        {saved ? "Saved" : "Save"}
      </button>
      <button
        onClick={share}
        className="flex items-center gap-2 px-5 py-3 rounded-full border border-gray-300 text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <Share2 className="w-4 h-4" />
        )}
        {copied ? "Copied" : "Share"}
      </button>
    </div>
  );
}

export function ListingHeader({
  listing,
  isClosed,
}: {
  listing: Listing;
  isClosed: boolean;
}) {
  return (
    <section className="bg-[#f7f5f2] border-b border-gray-200">
      <div className="container mx-auto px-6 max-w-7xl py-6">
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span>Properties</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black font-medium truncate max-w-[220px]">
            {listing.address}
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mt-6">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <StatusBadge status={listing.status} isClosed={isClosed} />
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
            <div className="flex items-center gap-6 mt-5">
              <span className="font-serif text-3xl md:text-4xl font-bold text-[#1a1a1a]">
                {listing.price}
              </span>
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex items-center gap-5 text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-1.5">
                  <BedDouble className="w-4 h-4 text-[#c9a84c]" />
                  {listing.beds} Beds
                </span>
                <span className="flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-[#c9a84c]" />
                  {listing.baths} Baths
                </span>
                <span className="flex items-center gap-1.5">
                  <Ruler className="w-4 h-4 text-[#c9a84c]" />
                  {listing.sqft}
                </span>
              </div>
            </div>
          </div>
          <SaveShare listing={listing} />
        </div>
      </div>
    </section>
  );
}
