import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ListingCard } from "@/components/listing/ListingCard";
import {
  usePublicListings,
  enclosedInventory,
  filterClosed,
  listingStatusKind,
} from "@/lib/listings";
import { usePageTitle } from "@/hooks/use-page-title";

type Filter = "all" | "active" | "closed";

const Homes = () => {
  usePageTitle("Homes — Active & recently closed");
  const { data, isLoading } = usePublicListings();
  const [filter, setFilter] = useState<Filter>("all");
  const listings = data || [];

  const enclosed = useMemo(() => enclosedInventory(listings), [listings]);
  const actives = useMemo(
    () =>
      enclosed.filter(
        (l) =>
          listingStatusKind(l) === "active" ||
          listingStatusKind(l) === "pending",
      ),
    [enclosed],
  );
  const closeds = useMemo(() => filterClosed(enclosed), [enclosed]);

  const shown = useMemo(() => {
    if (filter === "active") return actives;
    if (filter === "closed") return closeds;
    return enclosed;
  }, [filter, actives, closeds, enclosed]);

  const emptyActives = !isLoading && actives.length === 0 && filter !== "closed";

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <SiteHeader />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
            Enclosed inventory
          </p>
          <h1 className="font-serif text-4xl md:text-6xl mb-4">
            Active & recently closed
          </h1>
          <p className="text-gray-600 max-w-2xl mb-8">
            Your Cervantes resale book — tour what’s live, study what we just
            closed. Status is on every card.
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {(
              [
                ["all", "All"],
                ["active", "Active"],
                ["closed", "Closed"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider border transition-colors ${
                  filter === key
                    ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                    : "bg-white text-[#1a1a1a] border-gray-200 hover:border-[#c9a84c]"
                }`}
              >
                {label}
                <span className="ml-2 opacity-60">
                  {key === "all"
                    ? enclosed.length
                    : key === "active"
                      ? actives.length
                      : closeds.length}
                </span>
              </button>
            ))}
          </div>

          {isLoading && (
            <p className="text-gray-400 text-sm py-8">Loading listings…</p>
          )}

          {emptyActives && filter === "active" && (
            <div className="mb-12 border border-gray-200 bg-white p-8 md:p-10">
              <h2 className="font-serif text-2xl mb-3">
                No active homes right now
              </h2>
              <p className="text-gray-600 mb-6 max-w-xl">
                We’ll find the next one. Meanwhile, here’s recent proof — or
                start a buy conversation.
              </p>
              <Link
                to="/buy"
                className="inline-block bg-[#1a1a1a] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider"
              >
                Start a buy conversation
              </Link>
            </div>
          )}

          {!isLoading && shown.length === 0 && filter === "closed" && (
            <p className="text-gray-500 text-sm py-8">No closed listings yet.</p>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {(emptyActives && filter === "active" ? closeds : shown).map(
              (listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ),
            )}
          </div>

          <div className="border border-gray-200 overflow-hidden bg-white">
            <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-1">
                  Service map
                </p>
                <h2 className="font-serif text-2xl">Southern California</h2>
              </div>
              <Link
                to="/markets"
                className="text-xs font-bold uppercase tracking-wider hover:text-[#c9a84c]"
              >
                Market pages →
              </Link>
            </div>
            <iframe
              title="Cervantes Realty service area map"
              src="https://maps.google.com/maps?q=Long%20Beach%2C%20CA&z=9&output=embed"
              className="w-full h-[320px] md:h-[400px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="px-6 py-4 text-xs text-gray-500">
              Orientation only — not a pin-for-every-listing map. Use filters
              above and{" "}
              <Link to="/markets" className="underline">
                markets
              </Link>{" "}
              for local perspective.
            </p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default Homes;
