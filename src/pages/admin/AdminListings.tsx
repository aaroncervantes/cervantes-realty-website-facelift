import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Pencil,
  ExternalLink,
  Copy,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";
import {
  useAdminListings,
  useTogglePublished,
  useDeleteListing,
  useDuplicateListing,
  type ListingRow,
} from "@/lib/listings";

const FILTERS = ["All", "For Sale", "Pending", "Closed", "Hidden"] as const;

function StatusPill({ status, hidden }: { status: string; hidden: boolean }) {
  if (hidden) {
    return (
      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
        Hidden
      </span>
    );
  }
  const s = status.toLowerCase();
  let cls = "bg-gray-100 text-gray-600";
  if (s.includes("for sale") || s.includes("active"))
    cls = "bg-green-100 text-green-700";
  else if (s.includes("pending")) cls = "bg-amber-100 text-amber-700";
  else if (s.includes("closed") || s.includes("sold"))
    cls = "bg-blue-100 text-blue-700";
  return (
    <span
      className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${cls}`}
    >
      {status}
    </span>
  );
}

function ListingRowCard({
  listing,
  onToggle,
  onDelete,
  onDuplicate,
}: {
  listing: ListingRow;
  onToggle: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="w-full sm:w-40 h-28 sm:h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
        {listing.image ? (
          <img
            src={listing.image}
            alt={listing.address}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
            No image
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="font-bold text-[#1a1a1a]">{listing.price}</span>
          <StatusPill status={listing.status} hidden={!listing.is_published} />
        </div>
        <p className="text-sm text-gray-700 truncate">
          {listing.address}
          {listing.city_state_zip ? `, ${listing.city_state_zip}` : ""}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          {listing.mls} • {listing.beds || "0"} bd / {listing.baths || "0"} ba •
          Order #{listing.sort_order}
        </p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <Link
          to={`/admin/listings/${listing.id}/edit`}
          title="Edit"
          className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
        >
          <Pencil className="w-4 h-4" />
        </Link>
        <a
          href={`/listing/${listing.id}`}
          target="_blank"
          rel="noreferrer"
          title="View on site"
          className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
        <button
          onClick={onDuplicate}
          title="Duplicate"
          className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          onClick={onToggle}
          title={listing.is_published ? "Hide" : "Unhide"}
          className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
        >
          {listing.is_published ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
        <button
          onClick={onDelete}
          title="Delete"
          className="p-2 rounded-md hover:bg-red-50 text-red-500"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

const AdminListings = () => {
  const { data, isLoading, error } = useAdminListings();
  const toggle = useTogglePublished();
  const del = useDeleteListing();
  const dup = useDuplicateListing();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered = (data || []).filter((row) => {
    if (filter === "All") return true;
    if (filter === "Hidden") return !row.is_published;
    const status = row.status.toLowerCase();
    if (!row.is_published) return false;
    if (filter === "Closed")
      return status.includes("closed") || status.includes("sold");
    if (filter === "For Sale")
      return status.includes("for sale") || status.includes("active");
    if (filter === "Pending") return status.includes("pending");
    return true;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1a1a1a]">
            Listings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all property listings & transactions.
          </p>
        </div>
        <Link
          to="/admin/listings/new"
          className="inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-[#c9a84c] transition-colors"
        >
          <Plus className="w-4 h-4" /> New Listing
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
              filter === f
                ? "bg-[#1a1a1a] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-[#c9a84c]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {isLoading && (
        <p className="text-gray-400 text-sm">Loading listings…</p>
      )}
      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-md p-4">
          Failed to load listings: {(error as Error).message}
        </div>
      )}
      {!isLoading && !error && filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-400 text-sm">No listings found.</p>
        </div>
      )}
      <div className="grid gap-3">
        {filtered.map((row) => (
          <ListingRowCard
            key={row.id}
            listing={row}
            onToggle={() =>
              toggle.mutate({
                id: row.id,
                is_published: !row.is_published,
              })
            }
            onDelete={() => {
              if (confirm("Permanently delete this listing?"))
                del.mutate(row.id);
            }}
            onDuplicate={() => dup.mutate(row.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminListings;
