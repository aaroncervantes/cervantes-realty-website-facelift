import { Link } from "react-router-dom";
import { usePublicListings, filterActive, filterClosed } from "@/lib/listings";
import { NEW_HOMES } from "@/data/newHomes";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ProofStrip } from "@/components/site/ProofStrip";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ListingCard } from "@/components/listing/ListingCard";
import { NewHomeCard } from "@/components/site/NewHomeCard";
import { ServiceAreas } from "@/components/site/ServiceAreas";

const Index = () => {
  const { data, isLoading } = usePublicListings();
  const listings = data || [];
  // Active first, then recently closed — one enclosed inventory strip
  const enclosed = [
    ...filterActive(listings),
    ...filterClosed(listings),
  ].slice(0, 8);
  const showcase = NEW_HOMES.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      <SiteHeader />

      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png"
            alt="Luxurious modern living room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium drop-shadow-lg">
            Find Your Home in the World
          </h1>
          <p className="mt-6 text-white/90 font-serif italic text-lg md:text-xl">
            Cervantes Realty × SoCal’s New Homes
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/homes"
              className="bg-white text-black px-8 py-4 text-sm font-semibold hover:bg-gray-100 transition-colors uppercase tracking-wider"
            >
              Browse homes
            </Link>
            <Link
              to="/sell"
              className="border border-white text-white px-8 py-4 text-sm font-semibold hover:bg-white/10 transition-colors uppercase tracking-wider"
            >
              Sell with Concierge
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#f7f5f2]">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-3 text-center">
            Two ways to look
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-center text-[#1a1a1a] mb-12">
            Resale you can tour. New builds to study.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              to="/homes"
              className="group relative min-h-[280px] overflow-hidden bg-[#1e1e1e] text-white"
            >
              <img
                src="https://vibe.filesafe.space/1781750305487395093/attachments/30397204-2352-42bc-a0ce-1d14274c5ef3.webp"
                alt="Active enclosed homes"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="relative z-10 p-10 md:p-14 flex flex-col justify-end h-full min-h-[280px]">
                <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
                  Cervantes Realty
                </p>
                <h3 className="font-serif text-3xl md:text-4xl mb-3">
                  Active enclosed homes
                </h3>
                <p className="text-white/80 text-sm max-w-sm">
                  Your listings — full address, tour, and real next steps.
                </p>
              </div>
            </Link>
            <Link
              to="/new-homes"
              className="group relative min-h-[280px] overflow-hidden bg-[#1e1e1e] text-white"
            >
              <img
                src="https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png"
                alt="New construction showcase"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="relative z-10 p-10 md:p-14 flex flex-col justify-end h-full min-h-[280px]">
                <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
                  SoCal’s New Homes
                </p>
                <h3 className="font-serif text-3xl md:text-4xl mb-3">
                  New construction showcase
                </h3>
                <p className="text-white/80 text-sm max-w-sm">
                  Browse-only inspiration — vague on purpose, no inquire.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
                Enclosed inventory
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1a1a1a]">
                Active & recently closed
              </h2>
            </div>
            <Link
              to="/homes"
              className="text-xs font-bold uppercase tracking-wider hover:text-[#c9a84c] transition-colors"
            >
              View all homes →
            </Link>
          </div>
          {isLoading && (
            <p className="text-gray-400 text-sm py-8 text-center">
              Loading listings…
            </p>
          )}
          {!isLoading && enclosed.length === 0 && (
            <p className="text-gray-400 text-sm py-8 text-center">
              No listings right now — check back soon or{" "}
              <Link to="/buy" className="underline">
                start a buy conversation
              </Link>
              .
            </p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {enclosed.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#f7f5f2]">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
                SoCal’s New Homes
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1a1a1a]">
                Popular new builds we’re seeing
              </h2>
            </div>
            <Link
              to="/new-homes"
              className="text-xs font-bold uppercase tracking-wider hover:text-[#c9a84c] transition-colors"
            >
              Browse showcase →
            </Link>
          </div>
          <p className="text-sm text-gray-500 mb-10 max-w-2xl">
            Featured for market awareness only. These are not Cervantes listings
            and cannot be inquired on here — talk to the builder or community for
            details.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcase.map((home) => (
              <NewHomeCard key={home.id} home={home} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#f7f5f2]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-0 max-w-5xl mx-auto items-stretch">
            <div className="relative h-[400px] md:h-auto overflow-hidden">
              <video
                src="https://storage.googleapis.com/msgsndr/yvIB8uaPt79VRC8MA1HI/media/6977f3cda87beb5bbc21004e.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="bg-[#1e1e1e] text-white p-12 md:p-16 lg:p-20 flex flex-col justify-center items-start">
              <h2 className="font-serif text-4xl md:text-5xl mb-6 font-medium">
                Cervantes Concierge
              </h2>
              <p className="text-lg md:text-xl font-serif italic mb-10 text-white/90 leading-relaxed">
                Concierge helps you sell your home faster and for more money —
                with no hassle for you. Kick your feet up and let us be Real
                Estate Professionals.
              </p>
              <Link
                to="/sell"
                className="bg-white text-black px-8 py-4 text-sm font-semibold hover:bg-gray-100 transition-colors uppercase tracking-wider"
              >
                Start selling
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-3 text-center">
            Useful, not noisy
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-center text-[#1a1a1a] mb-12">
            Tools for buyers and sellers
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                to: "/calculator",
                title: "Mortgage calculator",
                copy: "Price, down, rate, term — see P&I instantly.",
              },
              {
                to: "/buy",
                title: "Buy guide",
                copy: "Pre-approval to keys — clear steps, then a form.",
              },
              {
                to: "/sell",
                title: "Sell guide",
                copy: "Concierge system: price, prep, offers, close.",
              },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="border border-gray-200 p-8 hover:border-[#c9a84c] transition-colors group"
              >
                <h3 className="font-serif text-2xl mb-3 group-hover:text-[#c9a84c] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ProofStrip />
      <ServiceAreas />
      <SiteFooter />
    </div>
  );
};

export default Index;
