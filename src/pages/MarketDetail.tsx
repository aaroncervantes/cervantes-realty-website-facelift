import { Link, useParams } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MortgageCalculator } from "@/components/site/MortgageCalculator";
import { getMarket } from "@/data/markets";
import { buyTypeform } from "@/lib/typeform";
import { usePageTitle } from "@/hooks/use-page-title";

const MarketDetail = () => {
  const { slug } = useParams();
  const market = slug ? getMarket(slug) : undefined;
  usePageTitle(market ? market.name : "Market");

  if (!market) {
    return (
      <div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center text-sm text-gray-500">
        Market not found.{" "}
        <Link to="/markets" className="underline ml-2">
          All markets
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <SiteHeader />
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link
            to="/markets"
            className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#c9a84c]"
          >
            ← Markets
          </Link>
          <div className="grid lg:grid-cols-3 gap-10 mt-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={market.image}
                  alt={market.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
                  {market.region}
                </p>
                <h1 className="font-serif text-4xl md:text-5xl mb-4">
                  {market.name}
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  {market.vibe}
                </p>
                <p className="text-sm text-gray-500 mb-8">{market.median}</p>
                <ul className="space-y-4 mb-10">
                  {market.bullets.map((b) => (
                    <li
                      key={b}
                      className="border-l-2 border-[#c9a84c] pl-4 text-gray-700"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href={buyTypeform("market")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#1a1a1a] text-white px-8 py-4 text-xs font-bold uppercase tracking-wider hover:bg-[#c9a84c]"
                >
                  Talk {market.name} with us
                </a>
              </div>
            </div>
            <div className="lg:sticky lg:top-36">
              <MortgageCalculator
                initialPrice={market.samplePrice}
                variant="sidebar"
                title={`Sample ${market.name} payment`}
                showLinkToFull
                showPreapproval
              />
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default MarketDetail;
