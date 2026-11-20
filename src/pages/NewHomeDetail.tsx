import { Link, useParams } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MortgageCalculator } from "@/components/site/MortgageCalculator";
import { getNewHome } from "@/data/newHomes";
import { formatCurrency } from "@/lib/mortgage";
import { usePageTitle } from "@/hooks/use-page-title";

const NewHomeDetail = () => {
  const { slug } = useParams();
  const home = slug ? getNewHome(slug) : undefined;
  usePageTitle(home ? home.title : "Showcase");

  if (!home) {
    return (
      <div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center text-gray-500 text-sm">
        Showcase item not found.{" "}
        <Link to="/new-homes" className="underline ml-2">
          Back to showcase
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
            to="/new-homes"
            className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#c9a84c]"
          >
            ← Showcase
          </Link>
          <div className="grid lg:grid-cols-3 gap-10 mt-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={home.image}
                  alt={home.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
                  {home.area} · {home.style} · SoCal’s New Homes
                </p>
                <h1 className="font-serif text-4xl md:text-5xl mb-4">
                  {home.title}
                </h1>
                <p className="text-2xl font-bold mb-2">
                  From {formatCurrency(home.fromPrice)}
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  {home.beds} beds · {home.baths} baths · {home.sqft} sqft
                </p>
                <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mb-10">
                  {home.blurb}
                </p>

                <h2 className="font-serif text-2xl mb-4">
                  Why buyers compare this to resale
                </h2>
                <ul className="space-y-4 mb-10">
                  {home.compareToResale.map((line) => (
                    <li
                      key={line}
                      className="border-l-2 border-[#c9a84c] pl-4 text-gray-700 leading-relaxed"
                    >
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="p-6 bg-[#1a1a1a] text-white">
                  <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
                    Not a Cervantes listing
                  </p>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Featured for market awareness via SoCal’s New Homes. You
                    cannot inquire about this product here. Contact the builder
                    or visit the community for availability. Want help comparing
                    new vs resale strategy? Talk to us generally — not about this
                    specific home.
                  </p>
                  <Link
                    to="/buy"
                    className="inline-block mt-6 bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-gray-100"
                  >
                    Talk buying strategy
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:sticky lg:top-36">
              <MortgageCalculator
                initialPrice={home.fromPrice}
                variant="sidebar"
                title="Est. payment from"
                showLinkToFull
              />
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default NewHomeDetail;
