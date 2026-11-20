import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MortgageCalculator } from "@/components/site/MortgageCalculator";
import { BUY_TYPEFORM } from "@/lib/typeform";

const Calculator = () => {
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
            Adjust the numbers and see principal &amp; interest instantly. Then
            get pre-approved when you’re ready — this is an estimate, not a
            lender quote.
          </p>
          <MortgageCalculator variant="page" title="Your estimate" />
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href={BUY_TYPEFORM}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a1a1a] text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider text-center hover:bg-[#c9a84c] transition-colors"
            >
              Get help buying
            </a>
            <Link
              to="/homes"
              className="border border-[#1a1a1a] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-center hover:border-[#c9a84c] transition-colors"
            >
              Browse active homes
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default Calculator;
