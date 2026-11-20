import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ListingCard } from "@/components/ListingCard";
import { CompetitiveEdge } from "@/components/CompetitiveEdge";
import { HomeTeam } from "@/components/HomeTeam";
import { Values } from "@/components/Values";
import { ServiceAreas } from "@/components/ServiceAreas";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { fetchPublishedListings } from "@/lib/listings";

const HERO = "https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png";
const BUY = "https://form.typeform.com/to/MYDWRuKV?typeform-source=cervantesestates.com#new-menu-item";
const SELL = "https://form.typeform.com/to/AJGF8W1h?typeform-source=cervantesestates.com#about";

export default function Index() {
  const { data: listings = [], isLoading } = useQuery({
    queryKey: ["listings", "published"],
    queryFn: fetchPublishedListings,
  });

  return (
    <div className="min-h-screen bg-cream">
      <section className="relative min-h-[100svh] overflow-hidden">
        <img
          src={HERO}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/35 to-cream" />
        <SiteHeader />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-24 pt-32 md:px-8">
          <p className="text-sm uppercase tracking-[0.25em] text-gold">
            Cervantes Realty
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl leading-tight text-cream md:text-7xl">
            Find Your Home in the World
          </h1>
          <p className="mt-5 max-w-xl text-cream/85">
            Helping buyers and sellers like yourself — across Southern California
            with expert guidance and exceptional service.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg">
              <a href={BUY} target="_blank" rel="noreferrer">
                I Want to Buy
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-cream/50 text-cream hover:bg-cream/10"
            >
              <a href={SELL} target="_blank" rel="noreferrer">
                I Want to Sell
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-16 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl md:text-4xl">Cervantes Concierge</h2>
            <p className="mt-3 max-w-2xl text-ink/70">
              Concierge helps you sell your home faster and for more money — with
              no hassle for you. Kick your feet up and let us be Real Estate
              Professionals.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl md:text-4xl">
            Recent — Listings/Closings
          </h2>
          {isLoading ? (
            <p className="mt-8 text-ink/50">Loading listings…</p>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {listings.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CompetitiveEdge />
      <HomeTeam />
      <Values />
      <ServiceAreas />
      <ClosingCTA />
      <SiteFooter />
    </div>
  );
}
