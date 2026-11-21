import { Link } from "react-router-dom";
import { DEFAULT_RATE } from "@/lib/mortgage";
import { useLang } from "@/lib/i18n";

const QUOTES = [
  {
    text: "Sold our home in 6 days above asking. Aaron knows exactly what buyers want.",
    author: "Michael S.",
  },
  {
    text: "He negotiated $130k over asking with their strategy and I had to cover no closing costs.",
    author: "Leo A.",
  },
  {
    text: "Responded within minutes, day or night. Truly client-first.",
    author: "Araceli T.",
  },
];

export function ProofStrip() {
  const { t } = useLang();
  return (
    <section className="py-20 md:py-24 bg-white border-y border-gray-100">
      <div className="container mx-auto px-6 max-w-5xl">
        <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-10 text-center">
          {t.proofEyebrow}
        </p>
        <div className="grid md:grid-cols-3 gap-10 md:gap-8 mb-14">
          {QUOTES.map((q) => (
            <blockquote key={q.author}>
              <p className="font-serif italic text-lg text-[#1a1a1a] leading-relaxed mb-4">
                “{q.text}”
              </p>
              <footer className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                {q.author} · {t.googleReview}
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-100 pt-10">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-1">
              {t.rateChip}
            </p>
            <p className="font-serif text-3xl text-[#1a1a1a]">
              {DEFAULT_RATE.toFixed(2)}%
              <span className="text-sm text-gray-400 font-sans ml-2">
                {t.thirtyYrEstimate}
              </span>
            </p>
          </div>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-wider">
            <Link to="/calculator" className="hover:text-[#c9a84c]">
              {t.calcLink}
            </Link>
            <Link to="/stories/rhea-st" className="hover:text-[#c9a84c]">
              {t.caseStudyLink}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
