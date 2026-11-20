import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MortgageCalculator } from "@/components/site/MortgageCalculator";
import { usePageTitle } from "@/hooks/use-page-title";

const Calculator = () => {
  usePageTitle("Mortgage calculator");
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <SiteHeader />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
            Tools
          </p>
          <h1 className="font-serif text-4xl md:text-6xl mb-4">
            What will your mortgage cost?
          </h1>
          <p className="text-gray-600 mb-10 max-w-xl">
            Adjust the numbers — including an optional tax &amp; insurance
            estimate. Then get pre-approval help when you’re ready.
          </p>
          <MortgageCalculator
            variant="page"
            title="Your estimate"
            showPreapproval
          />
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/buy"
              className="bg-[#1a1a1a] text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider text-center hover:bg-[#c9a84c] transition-colors"
            >
              Buy guide
            </Link>
            <Link
              to="/homes"
              className="border border-[#1a1a1a] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-center hover:border-[#c9a84c] transition-colors"
            >
              Browse homes
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default Calculator;
