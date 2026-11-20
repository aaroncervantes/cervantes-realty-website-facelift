import { Link } from "react-router-dom";
import { DEFAULT_RATE } from "@/lib/mortgage";

export function ProofStrip() {
  return (
    <section className="py-20 md:py-24 bg-white border-y border-gray-100">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-10 md:gap-12 items-start">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-3">
              Client voice
            </p>
            <p className="font-serif italic text-xl md:text-2xl text-[#1a1a1a] leading-relaxed">
              “Sold our home in 6 days above asking. Aaron knows exactly what
              buyers want.”
            </p>
            <p className="mt-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
              Michael S.
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-3">
              Recent result
            </p>
            <p className="font-serif text-3xl text-[#1a1a1a] mb-2">$130K over</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Negotiated above asking with no seller-paid closing costs — strategy
              over hope.
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-3">
              Today’s rate chip
            </p>
            <p className="font-serif text-3xl text-[#1a1a1a] mb-2">
              {DEFAULT_RATE.toFixed(2)}%
            </p>
            <p className="text-sm text-gray-600 mb-4">
              30-yr fixed estimate · updated weekly. Run your numbers before you
              tour.
            </p>
            <Link
              to="/calculator"
              className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a] hover:text-[#c9a84c] transition-colors"
            >
              Mortgage calculator →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
