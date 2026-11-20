import {
  listingStatusKind,
  type ListingStatusKind,
} from "@/lib/listings";
import type { Listing } from "@/data/listings";

const STYLES: Record<ListingStatusKind, string> = {
  active: "bg-green-600 text-white",
  pending: "bg-[#c9a84c] text-white",
  closed: "bg-[#1a1a1a] text-[#c9a84c] border border-[#c9a84c]/40",
};

const LABELS: Record<ListingStatusKind, string> = {
  active: "Active",
  pending: "Pending",
  closed: "Closed",
};

export function StatusPill({
  listing,
  className = "",
}: {
  listing: Pick<Listing, "status">;
  className?: string;
}) {
  const kind = listingStatusKind(listing);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${STYLES[kind]} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          kind === "closed" ? "bg-[#c9a84c]" : "bg-white"
        }`}
      />
      {LABELS[kind]}
    </span>
  );
}
