import { useMemo } from "react";
import type { Listing } from "@/data/listings";
import { MosaicGallery } from "@/components/site/MosaicGallery";

function statusLabel(status: string): string {
  if (/closed|sold/i.test(status)) return "Sold";
  if (/pending/i.test(status)) return "Pending";
  return "For Sale";
}

export function ListingGallery({ listing }: { listing: Listing }) {
  const slides = useMemo(() => {
    const g = listing.gallery?.filter(Boolean) ?? [];
    if (g.length) return g;
    return listing.image ? [listing.image] : [];
  }, [listing.gallery, listing.image]);

  return (
    <MosaicGallery
      slides={slides}
      title={listing.address}
      overlays={
        <>
          <span className="bg-white text-[#1a1a1a] text-[11px] font-semibold tracking-wide px-3 py-1.5 rounded-full">
            Cervantes Signature
          </span>
          {listing.badges.slice(0, 2).map((badge) => (
            <span
              key={badge}
              className="bg-[#c9a84c] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
            >
              {badge}
            </span>
          ))}
        </>
      }
      statusChip={
        <span className="bg-[#2563eb] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
          {statusLabel(listing.status)}
        </span>
      }
    />
  );
}
