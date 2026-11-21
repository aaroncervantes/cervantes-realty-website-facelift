import {
  listingStatusKind,
  type ListingStatusKind,
} from "@/lib/listings";
import type { Listing } from "@/data/listings";
import { useLang } from "@/lib/i18n";

const STYLES: Record<ListingStatusKind, string> = {
  active: "bg-green-600 text-white",
  pending: "bg-[#c9a84c] text-white",
  closed: "bg-[#1a1a1a] text-[#c9a84c] border border-[#c9a84c]/40",
};

export function StatusPill({
  listing,
  className = "",
}: {
  listing: Pick<Listing, "status">;
  className?: string;
}) {
  const { t } = useLang();
  const kind = listingStatusKind(listing);
  const labels: Record<ListingStatusKind, string> = {
    active: t.statusActive,
    pending: t.statusPending,
    closed: t.statusClosed,
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${STYLES[kind]} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          kind === "closed" ? "bg-[#c9a84c]" : "bg-white"
        }`}
      />
      {labels[kind]}
    </span>
  );
}
