import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MortgageCalculator } from "@/components/site/MortgageCalculator";
import { usePageTitle } from "@/hooks/use-page-title";
import { useLang } from "@/lib/i18n";

const Calculator = () => {
  usePageTitle("Mortgage calculator");
  const { t } = useLang();
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <SiteHeader />
      <section className="relative overflow-hidden py-16 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.08),_transparent_55%)]"
        />
        <div className="container relative mx-auto px-6 max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#c9a84c] font-bold mb-3 animate-[cr-fadeup_0.6s_ease-out_both]">
            {t.calcEyebrow}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight mb-5 animate-[cr-fadeup_0.7s_ease-out_both]">
            {t.calcTitle}
          </h1>
          <p className="text-gray-600 mb-12 max-w-xl text-[15px] leading-relaxed animate-[cr-fadeup_0.7s_ease-out_both]">
            {t.calcLead}
          </p>
          <div className="animate-[cr-fadeup_1.1s_ease-out_both]">
            <MortgageCalculator
              variant="page"
              title={t.calcYourEstimate}
              showPreapproval
            />
          </div>
          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link
              to="/buy"
              className="bg-[#1a1a1a] text-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.14em] text-center hover:bg-[#c9a84c] transition-colors"
            >
              {t.buyGuide}
            </Link>
            <Link
              to="/homes"
              className="border border-[#1a1a1a] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.14em] text-center hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
            >
              {t.calcBrowseHomes}
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default Calculator;
