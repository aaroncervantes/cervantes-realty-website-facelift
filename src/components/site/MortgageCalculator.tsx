import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { buyTypeform } from "@/lib/typeform";
import {
  DEFAULT_DOWN_PERCENT,
  DEFAULT_RATE,
  DEFAULT_TERM_YEARS,
  RATE_UPDATED_LABEL,
  calcMortgage,
  formatCurrency,
  parsePrice,
} from "@/lib/mortgage";
import { useLang, fill } from "@/lib/i18n";

type Variant = "page" | "sidebar" | "compact";

interface MortgageCalculatorProps {
  initialPrice?: number | string;
  /** Override default 20% when embedding (e.g. new-homes FHA minimum). */
  initialDownPercent?: number;
  /** Override default site rate when embedding. */
  initialRate?: number;
  /** Start with tax & insurance included. */
  initialIncludeTaxIns?: boolean;
  /** Layer FHA-style MIP into the total (new-homes FHA estimates). */
  includeMip?: boolean;
  /** Fixed monthly HOA estimate layered into the total. */
  hoaMonthly?: number;
  variant?: Variant;
  title?: string;
  className?: string;
  showLinkToFull?: boolean;
  showPreapproval?: boolean;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[11px] uppercase tracking-[0.14em] text-gray-400 font-medium">
      {children}
    </span>
  );
}

const inputClass =
  "mt-2 w-full border-0 bg-[#f7f5f2] px-4 py-3.5 text-sm font-semibold text-[#1a1a1a] outline-none ring-1 ring-transparent transition-[box-shadow,background-color] focus:bg-white focus:ring-[#c9a84c]/70";

export function MortgageCalculator({
  initialPrice = 650000,
  initialDownPercent = DEFAULT_DOWN_PERCENT,
  initialRate = DEFAULT_RATE,
  initialIncludeTaxIns = false,
  includeMip = false,
  hoaMonthly = 0,
  variant = "page",
  title,
  className = "",
  showLinkToFull = false,
  showPreapproval = false,
}: MortgageCalculatorProps) {
  const { t } = useLang();
  const heading = title ?? t.estimatePayment;
  const startPrice = parsePrice(initialPrice) || 650000;
  const [price, setPrice] = useState(startPrice);
  const [downPercent, setDownPercent] = useState(initialDownPercent);
  const [rate, setRate] = useState(initialRate);
  const [termYears, setTermYears] = useState(DEFAULT_TERM_YEARS);
  const [includeTaxIns, setIncludeTaxIns] = useState(initialIncludeTaxIns);

  const downPayment = (price * downPercent) / 100;
  const result = useMemo(
    () =>
      calcMortgage({
        price,
        downPayment,
        ratePercent: rate,
        termYears,
        includeTaxIns,
        includeMip,
        hoaMonthly,
      }),
    [price, downPayment, rate, termYears, includeTaxIns, includeMip, hoaMonthly],
  );
  const showExtras = includeTaxIns || includeMip || hoaMonthly > 0;

  const isCompact = variant === "compact";
  const isSidebar = variant === "sidebar" || isCompact;

  return (
    <div
      className={`bg-white text-[#1a1a1a] ${
        isSidebar
          ? "border border-black/5 p-6 md:p-7"
          : "border border-black/[0.04] p-8 md:p-11 shadow-[0_18px_50px_-28px_rgba(26,26,26,0.35)]"
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-6 mb-8">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#c9a84c] font-bold mb-2">
            {t.mortgageEstimate}
          </p>
          <h3
            className={`font-serif font-medium tracking-tight text-[#1a1a1a] ${
              isCompact ? "text-xl" : "text-2xl md:text-[2rem] leading-tight"
            }`}
          >
            {heading}
          </h3>
        </div>
        <div className="text-right shrink-0 pt-1">
          <p className="text-base md:text-lg font-semibold tabular-nums text-[#1a1a1a]">
            {rate.toFixed(2)}%
          </p>
          <p className="mt-0.5 text-[10px] uppercase tracking-wider text-gray-400">
            {fill(t.thirtyYrUpdated, { date: RATE_UPDATED_LABEL })}
          </p>
        </div>
      </div>

      <div
        className={`grid gap-x-8 gap-y-7 ${
          isCompact ? "grid-cols-1" : "md:grid-cols-2"
        }`}
      >
        <label className="block">
          <FieldLabel>{t.homePrice}</FieldLabel>
          <input
            type="number"
            min={0}
            step={1000}
            value={Math.round(price)}
            onChange={(e) => setPrice(Number(e.target.value) || 0)}
            className={inputClass}
          />
        </label>

        <label className="block">
          <FieldLabel>{fill(t.downPayment, { pct: downPercent })}</FieldLabel>
          <input
            type="range"
            min={0}
            max={50}
            step={0.5}
            value={downPercent}
            onChange={(e) => setDownPercent(Number(e.target.value))}
            className="cr-range mt-5"
            style={
              {
                "--cr-range-pct": `${(downPercent / 50) * 100}%`,
              } as React.CSSProperties
            }
            aria-valuemin={0}
            aria-valuemax={50}
            aria-valuenow={downPercent}
          />
          <p className="mt-2.5 text-sm text-gray-500 tabular-nums">
            {formatCurrency(downPayment)}
          </p>
        </label>

        <label className="block">
          <FieldLabel>{t.interestRate}</FieldLabel>
          <input
            type="number"
            min={0}
            max={20}
            step={0.05}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value) || 0)}
            className={inputClass}
          />
        </label>

        <div className="block">
          <FieldLabel>{t.loanTerm}</FieldLabel>
          <div className="mt-2 flex gap-2">
            {[15, 30].map((y) => {
              const active = termYears === y;
              return (
                <button
                  key={y}
                  type="button"
                  onClick={() => setTermYears(y)}
                  className={`flex-1 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors ${
                    active
                      ? "bg-[#1a1a1a] text-white"
                      : "bg-[#f7f5f2] text-[#1a1a1a] hover:bg-[#efebe4]"
                  }`}
                >
                  {y} {t.yrSuffix}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <label className="mt-8 flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={includeTaxIns}
          onChange={(e) => setIncludeTaxIns(e.target.checked)}
          className="cr-check mt-0.5"
        />
        <span className="text-sm text-gray-600 leading-snug group-hover:text-[#1a1a1a] transition-colors">
          {t.addTaxIns}
        </span>
      </label>

      <div className="mt-10 border-t border-black/[0.06] pt-8">
        <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400 font-medium mb-2">
          {showExtras ? t.estMonthlyTotal : t.estMonthlyPI}
        </p>
        <p className="font-serif text-[2.75rem] md:text-5xl leading-none tracking-tight text-[#1a1a1a] tabular-nums">
          {formatCurrency(showExtras ? result.monthlyTotal : result.monthlyPI)}
          <span className="ml-2 align-baseline text-base font-sans font-normal text-gray-400">
            {t.perMonth}
          </span>
        </p>
        {showExtras && (
          <p className="text-xs text-gray-500 mt-3 leading-relaxed">
            {fill(t.piTaxIns, {
              pi: formatCurrency(result.monthlyPI),
              tax: formatCurrency(result.monthlyTax),
              ins: formatCurrency(result.monthlyIns),
            })}
            {includeMip ? ` · MIP ${formatCurrency(result.monthlyMip)}` : ""}
            {hoaMonthly > 0
              ? ` · HOA ${formatCurrency(result.monthlyHoa)}`
              : ""}
          </p>
        )}

        <dl className="mt-8 grid grid-cols-2 gap-6">
          <div>
            <dt className="text-[11px] uppercase tracking-[0.14em] text-gray-400">
              {t.loanAmount}
            </dt>
            <dd className="mt-1.5 text-sm font-semibold tabular-nums">
              {formatCurrency(result.loanAmount)}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.14em] text-gray-400">
              {t.totalInterest}
            </dt>
            <dd className="mt-1.5 text-sm font-semibold tabular-nums">
              {formatCurrency(result.totalInterest)}
            </dd>
          </div>
        </dl>

        <p className="mt-6 text-[11px] text-gray-400 leading-relaxed max-w-prose">
          {t.mortgageDisclaimer}
        </p>

        {(showLinkToFull || showPreapproval) && (
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            {showLinkToFull && (
              <Link
                to="/calculator"
                className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a] hover:text-[#c9a84c] transition-colors"
              >
                {t.openFullCalc}
              </Link>
            )}
            {showPreapproval && (
              <a
                href={buyTypeform("calculator")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c9a84c] hover:opacity-80 transition-opacity"
              >
                {t.getPreapproval}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
