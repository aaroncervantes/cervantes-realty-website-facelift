import { Link } from "react-router-dom";
import {
  usePublicListings,
  enclosedInventory,
  listingStatusKind,
} from "@/lib/listings";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ProofStrip } from "@/components/site/ProofStrip";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ListingCard } from "@/components/listing/ListingCard";
import { NewHomeCard } from "@/components/site/NewHomeCard";
import { ServiceAreas } from "@/components/site/ServiceAreas";
import { CollaborationMark } from "@/components/site/CollaborationMark";
import { usePublicShowcaseHomes } from "@/lib/showcaseHomes";
import { usePageTitle } from "@/hooks/use-page-title";
import { useLang } from "@/lib/i18n";
import {
  ENCLOSED_DOOR_IMAGE,
  HERO_IMAGE,
  SITE_OG_IMAGE,
  SNH_DOOR_IMAGE,
} from "@/lib/site";

const Index = () => {
  const { t } = useLang();
  usePageTitle({ title: t.heroTitle, image: SITE_OG_IMAGE });
  const { data, isLoading } = usePublicListings();
  const { data: showcaseHomes = [] } = usePublicShowcaseHomes();
  const listings = data || [];
  const enclosed = enclosedInventory(listings).slice(0, 8);
  const actives = enclosed.filter((l) => listingStatusKind(l) !== "closed");
  const showcase = showcaseHomes.slice(0, 3);

  const tools = [
    {
      to: "/calculator",
      title: t.homeToolCalcTitle,
      copy: t.homeToolCalcCopy,
    },
    {
      to: "/compare",
      title: t.homeToolCompareTitle,
      copy: t.homeToolCompareCopy,
    },
    {
      to: "/sell",
      title: t.homeToolSellTitle,
      copy: t.homeToolSellCopy,
    },
  ] as const;

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      <SiteHeader />

      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt=""
            className="w-full h-full object-cover scale-105 animate-[cr-kenburns_28s_ease-in-out_infinite_alternate]"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl animate-[cr-fadeup_1.1s_ease-out_both]">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium drop-shadow-lg">
            {t.heroTitle}
          </h1>
          <p className="mt-6 text-white/90 font-serif italic text-lg md:text-xl">
            {t.heroSub}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/homes"
              className="bg-white text-black px-8 py-4 text-sm font-semibold hover:bg-gray-100 transition-colors uppercase tracking-wider"
            >
              {t.heroBrowse}
            </Link>
            <Link
              to="/sell"
              className="border border-white text-white px-8 py-4 text-sm font-semibold hover:bg-white/10 transition-colors uppercase tracking-wider"
            >
              {t.heroSell}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#f7f5f2]">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-3 text-center">
            {t.doorsEyebrow}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-center text-[#1a1a1a] mb-12">
            {t.doorsTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              to="/homes"
              className="group relative min-h-[280px] overflow-hidden bg-[#1e1e1e] text-white"
            >
              <img
                src={ENCLOSED_DOOR_IMAGE}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="relative z-10 p-10 md:p-14 flex flex-col justify-end h-full min-h-[280px]">
                <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
                  Cervantes Realty
                </p>
                <h3 className="font-serif text-3xl md:text-4xl mb-3">
                  {t.enclosedTitle}
                </h3>
                <p className="text-white/80 text-sm max-w-sm">
                  {t.enclosedBody}
                </p>
              </div>
            </Link>
            <Link
              to="/new-homes"
              className="group relative min-h-[280px] overflow-hidden bg-[#1e1e1e] text-white"
            >
              <img
                src={SNH_DOOR_IMAGE}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="relative z-10 p-10 md:p-14 flex flex-col justify-end h-full min-h-[280px]">
                <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
                  SoCal’s New Homes
                </p>
                <h3 className="font-serif text-3xl md:text-4xl mb-3">
                  {t.showcaseTitle}
                </h3>
                <p className="text-white/80 text-sm max-w-sm">
                  {t.showcaseBody}
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
                {t.homesEyebrow}
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1a1a1a]">
                {t.homesTitle}
              </h2>
            </div>
            <Link
              to="/homes"
              className="text-xs font-bold uppercase tracking-wider hover:text-[#c9a84c] transition-colors"
            >
              {t.homeViewAll}
            </Link>
          </div>
          {isLoading && (
            <p className="text-gray-400 text-sm py-8 text-center">
              {t.homesLoading}
            </p>
          )}
          {!isLoading && actives.length === 0 && (
            <div className="mb-8 border border-gray-200 p-8 bg-[#f7f5f2]">
              <p className="font-serif text-xl mb-2">{t.homesEmptyActiveTitle}</p>
              <p className="text-sm text-gray-600 mb-4">
                {t.homesEmptyActiveBody}
              </p>
              <Link
                to="/buy"
                className="text-xs font-bold uppercase tracking-wider underline"
              >
                {t.homesStartBuy}
              </Link>
            </div>
          )}
          {!isLoading && enclosed.length === 0 && (
            <p className="text-gray-400 text-sm py-8 text-center">
              {t.homesEmptyClosed}
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
              <CollaborationMark className="mb-4" />
              <h2 className="text-3xl md:text-4xl font-serif text-[#1a1a1a]">
                {t.homeShowcasePopular}
              </h2>
            </div>
            <Link
              to="/new-homes"
              className="text-xs font-bold uppercase tracking-wider hover:text-[#c9a84c] transition-colors"
            >
              {t.homeBrowseShowcase}
            </Link>
          </div>
          <p className="text-sm text-gray-500 mb-10 max-w-2xl">
            {t.homeShowcaseNote}
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
            <div className="bg-[#1e1e1e] text-white p-12 md:p-16 lg:p-20 flex flex-col justify-center items-start border-t border-[#c9a84c]/40">
              <h2 className="font-serif text-4xl md:text-5xl mb-6 font-medium">
                {t.sellEyebrow}
              </h2>
              <p className="text-lg md:text-xl font-serif italic mb-6 text-white/90 leading-relaxed">
                {t.homeConciergeBody}
              </p>
              <p className="text-sm text-[#c9a84c] font-serif italic mb-10">
                {t.homeConciergeQuote}
              </p>
              <Link
                to="/sell"
                className="bg-white text-black px-8 py-4 text-sm font-semibold hover:bg-gray-100 transition-colors uppercase tracking-wider"
              >
                {t.homeStartSelling}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProofStrip />

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-3 text-center">
            {t.homeToolsEyebrow}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-center text-[#1a1a1a] mb-12">
            {t.homeToolsTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((item) => (
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

      <ServiceAreas />
      <SiteFooter />
    </div>
  );
};

export default Index;
