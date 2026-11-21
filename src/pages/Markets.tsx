import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MARKETS } from "@/data/markets";
import { usePageTitle } from "@/hooks/use-page-title";
import { useLang } from "@/lib/i18n";

const Markets = () => {
  usePageTitle("Markets we know");
  const { t } = useLang();
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <SiteHeader />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
            {t.marketsFourEyebrow}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl mb-4">
            {t.marketsTitle}
          </h1>
          <p className="text-gray-600 max-w-2xl mb-12">{t.marketsLead}</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {MARKETS.map((m) => (
              <Link
                key={m.slug}
                to={`/markets/${m.slug}`}
                className="group border border-gray-200 bg-white overflow-hidden hover:border-[#c9a84c] transition-colors"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-1">
                    {m.region}
                  </p>
                  <h2 className="font-serif text-2xl mb-2 group-hover:text-[#c9a84c]">
                    {m.name}
                  </h2>
                  <p className="text-sm text-gray-600">{m.median}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default Markets;
