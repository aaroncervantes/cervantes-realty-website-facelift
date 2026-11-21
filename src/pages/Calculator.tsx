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

      {/* Stage band — fills first viewport like NW’s green header, Cervantes charcoal/gold */}
      <section className="relative bg-[#1a1a1a] text-white overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.35) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1a1a1a] to-transparent"
        />

        <div className="container relative mx-auto px-6 max-w-5xl pt-8 pb-28 md:pt-10 md:pb-36">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#c9a84c] font-bold mb-2">
            {t.calcEyebrow}
          </p>
          <h1 className="font-serif text-3xl md:text-5xl tracking-tight text-white mb-2 max-w-2xl">
            {t.calcTitle}
          </h1>
          <p className="text-white/65 text-sm md:text-[15px] leading-relaxed max-w-xl">
            {t.calcLead}
          </p>
        </div>
      </section>

      {/* Card pulls up into the band so the tool dominates the fold */}
      <section className="relative z-10 -mt-20 md:-mt-28 pb-12 md:pb-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <MortgageCalculator variant="page" showPreapproval />

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Link
              to="/buy"
              className="bg-[#1a1a1a] text-white px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-center hover:bg-[#c9a84c] transition-colors"
            >
              {t.buyGuide}
            </Link>
            <Link
              to="/homes"
              className="border border-[#1a1a1a] bg-white px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-center hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
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
