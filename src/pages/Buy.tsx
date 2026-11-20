import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BUY_TYPEFORM } from "@/lib/typeform";

const STEPS = [
  {
    n: "01",
    title: "Get pre-approved",
    body: "A real letter beats a guess. We connect you with lenders who close on time — FHA, conventional, and first-time programs.",
  },
  {
    n: "02",
    title: "Know the full monthly",
    body: "Use our calculator for P&I, then we layer taxes, insurance, and HOA so the payment isn’t a surprise.",
  },
  {
    n: "03",
    title: "Tour the right homes",
    body: "Active enclosed resales you can actually write on — plus a browse-only look at new construction patterns via SoCal’s New Homes.",
  },
  {
    n: "04",
    title: "Offer with strategy",
    body: "Price, contingencies, and timing — structured so sellers take you seriously without you overpaying on adrenaline.",
  },
  {
    n: "05",
    title: "Escrow to keys",
    body: "Inspection, appraisal, contingencies, walkthrough. You’re never guessing what day you’re on.",
  },
];

const Buy = () => {
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <SiteHeader />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
            Buy with Cervantes
          </p>
          <h1 className="font-serif text-4xl md:text-6xl mb-4">
            Buying, step by step
          </h1>
          <p className="text-gray-600 text-lg mb-12 leading-relaxed">
            Luxury guidance with useful clarity — resale inventory you can tour,
            new-build context when it helps, and a simple path from “thinking”
            to keys.
          </p>
          <ol className="space-y-10 mb-16">
            {STEPS.map((step) => (
              <li key={step.n} className="flex gap-6">
                <span className="text-[#c9a84c] font-bold text-sm tracking-widest shrink-0">
                  {step.n}
                </span>
                <div>
                  <h2 className="font-serif text-2xl mb-2">{step.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href={BUY_TYPEFORM}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a1a1a] text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider text-center hover:bg-[#c9a84c] transition-colors"
            >
              Start a buy conversation
            </a>
            <Link
              to="/calculator"
              className="border border-[#1a1a1a] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-center hover:border-[#c9a84c] transition-colors"
            >
              Run the calculator
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Prefer to browse first?{" "}
            <Link to="/homes" className="underline hover:text-[#c9a84c]">
              Active homes
            </Link>{" "}
            ·{" "}
            <Link to="/new-homes" className="underline hover:text-[#c9a84c]">
              New homes showcase
            </Link>
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default Buy;
