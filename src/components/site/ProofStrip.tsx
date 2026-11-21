import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import {
  DEFAULT_RATE,
  RATE_UPDATED_LABEL,
} from "@/lib/mortgage";
import { useLang, fill } from "@/lib/i18n";
import { REPLY_HOURS, smsLink } from "@/lib/site";

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
  const weeklySms = smsLink(
    "Hi Aaron — please text me weekly mortgage rate updates.",
  );

  return (
    <section className="py-20 md:py-24 bg-[#f7f5f2]">
      <div className="container mx-auto px-6 max-w-5xl">
        <p className="text-[10px] uppercase tracking-[0.18em] text-[#c9a84c] font-bold mb-10 text-center">
          {t.proofEyebrow}
        </p>
        <div className="grid md:grid-cols-3 gap-10 md:gap-8 mb-12">
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

        {/* Live rate card — layout matches reference; Cervantes palette + type */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 bg-white rounded-2xl px-5 py-5 sm:px-6 sm:py-5 shadow-[0_16px_40px_-24px_rgba(26,26,26,0.45)] border border-black/[0.04]">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#c9a84c]/20 text-[#1a1a1a]"
            aria-hidden
          >
            <Home className="h-5 w-5" strokeWidth={1.75} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold uppercase tracking-[0.12em]">
              <span className="inline-flex items-center gap-1.5 text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {t.rateLiveLabel}
              </span>
              <span className="text-[#1a1a1a]/80">{t.rateLiveTitle}</span>
            </p>

            <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
              <p className="font-serif text-3xl sm:text-[2rem] leading-none tracking-tight text-[#1a1a1a] tabular-nums">
                {DEFAULT_RATE.toFixed(2)}%
              </p>
              <span className="inline-flex items-center rounded-full bg-[#c9a84c]/15 px-2.5 py-1 text-[11px] font-semibold text-[#8a6f28]">
                {t.rateEstimateBadge}
              </span>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              {fill(t.rateMetaLine, { date: RATE_UPDATED_LABEL })}
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={weeklySms}
              className="inline-flex w-full sm:w-auto flex-col items-center justify-center rounded-full bg-[#1a1a1a] px-7 py-3.5 text-center text-white transition-colors hover:bg-[#c9a84c]"
            >
              <span className="text-sm font-semibold leading-tight">
                {t.rateWeeklyCta}
              </span>
              <span className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-white/55">
                {fill(t.rateWeeklySub, { hours: REPLY_HOURS })}
              </span>
            </a>
            <div className="flex flex-wrap justify-center sm:justify-end gap-x-5 gap-y-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a]">
              <Link to="/calculator" className="hover:text-[#c9a84c] transition-colors">
                {t.calcLink}
              </Link>
              <Link
                to="/stories/rhea-st"
                className="hover:text-[#c9a84c] transition-colors"
              >
                {t.caseStudyLink}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
