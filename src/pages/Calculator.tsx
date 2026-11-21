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
      <section className="relative overflow-hidden pt-8 pb-12 md:pt-10 md:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.07),_transparent_50%)]"
        />
        <div className="container relative mx-auto px-6 max-w-5xl">
          <div className="mb-5 md:mb-6 max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#c9a84c] font-bold mb-2">
              {t.calcEyebrow}
            </p>
            <h1 className="font-serif text-3xl md:text-5xl tracking-tight mb-2">
              {t.calcTitle}
            </h1>
            <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
              {t.calcLead}
            </p>
          </div>

          <MortgageCalculator variant="page" showPreapproval />

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to="/buy"
              className="bg-[#1a1a1a] text-white px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-center hover:bg-[#c9a84c] transition-colors"
            >
              {t.buyGuide}
            </Link>
            <Link
              to="/homes"
              className="border border-[#1a1a1a] px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-center hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
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
