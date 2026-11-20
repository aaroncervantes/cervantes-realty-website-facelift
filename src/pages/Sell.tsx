import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SELL_TYPEFORM } from "@/lib/typeform";

const MOVES = [
  {
    n: "01",
    title: "Valuation",
    body: "Real comps and a pricing plan built to attract the right buyers — not a guess or a Zestimate.",
  },
  {
    n: "02",
    title: "Prep & list",
    body: "Photos, staging guidance, and marketing that travels — Concierge handles the hassle.",
  },
  {
    n: "03",
    title: "Offers & negotiation",
    body: "Multiple offers when the market allows. Highest isn’t always best — we protect your net.",
  },
  {
    n: "04",
    title: "Close & celebrate",
    body: "Escrow, inspections, and clear communication until keys and funds move.",
  },
];

const Sell = () => {
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <SiteHeader />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
            Cervantes Concierge
          </p>
          <h1 className="font-serif text-4xl md:text-6xl mb-4">
            Sell smarter. Walk away richer.
          </h1>
          <p className="text-gray-600 text-lg mb-12 leading-relaxed">
            Kick your feet up. We run a system designed to sell faster and for
            more — with less stress on you.
          </p>
          <ol className="space-y-10 mb-16">
            {MOVES.map((step) => (
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
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={SELL_TYPEFORM}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a1a1a] text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider text-center hover:bg-[#c9a84c] transition-colors"
            >
              Get a Concierge valuation
            </a>
            <Link
              to="/contact"
              className="border border-[#1a1a1a] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-center hover:border-[#c9a84c] transition-colors"
            >
              Contact the team
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default Sell;
