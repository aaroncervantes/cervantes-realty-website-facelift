import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ListingCard } from "@/components/listing/ListingCard";
import { usePublicListings, filterActive } from "@/lib/listings";

const Homes = () => {
  const { data, isLoading } = usePublicListings();
  const active = filterActive(data || []);

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <SiteHeader />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
            Cervantes Realty
          </p>
          <h1 className="font-serif text-4xl md:text-6xl mb-4">Active homes</h1>
          <p className="text-gray-600 max-w-2xl mb-12">
            Enclosed resale inventory you can tour. Full address, payment
            estimate, and a real next step with our team.
          </p>
          {isLoading && (
            <p className="text-gray-400 text-sm py-8">Loading listings…</p>
          )}
          {!isLoading && active.length === 0 && (
            <p className="text-gray-500 text-sm py-8">
              No active listings published right now.
            </p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {active.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default Homes;
