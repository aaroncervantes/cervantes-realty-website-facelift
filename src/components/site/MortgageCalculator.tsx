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
  const showExtras =
    includeTaxIns || includeMip || hoaMonthly > 0;

  const isCompact = variant === "compact";
  const isSidebar = variant === "sidebar" || isCompact;

  return (
    <div
      className={`bg-white border border-gray-200 ${
        isSidebar ? "rounded-2xl p-6 shadow-sm" : "rounded-none p-8 md:p-12"
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-1">
            {t.mortgageEstimate}
          </p>
          <h3
            className={`font-serif font-medium text-[#1a1a1a] ${
              isCompact ? "text-xl" : "text-2xl md:text-3xl"
            }`}
          >
            {heading}
          </h3>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-semibold text-[#1a1a1a]">
            {rate.toFixed(2)}%
          </p>
          <p className="text-[10px] text-gray-400">
            {fill(t.thirtyYrUpdated, { date: RATE_UPDATED_LABEL })}
          </p>
        </div>
      </div>

      <div className={`grid gap-5 ${isCompact ? "grid-cols-1" : "md:grid-cols-2"}`}>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
            {t.homePrice}
          </span>
          <input
            type="number"
            min={0}
            step={1000}
            value={Math.round(price)}
            onChange={(e) => setPrice(Number(e.target.value) || 0)}
            className="mt-1.5 w-full border border-gray-200 bg-[#f7f5f2] px-4 py-3 text-sm font-semibold text-[#1a1a1a] outline-none focus:border-[#c9a84c]"
          />
        </label>

        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
            {fill(t.downPayment, { pct: downPercent })}
          </span>
          <input
            type="range"
            min={0}
            max={50}
            step={1}
            value={downPercent}
            onChange={(e) => setDownPercent(Number(e.target.value))}
            className="mt-3 w-full accent-[#c9a84c]"
          />
          <p className="mt-1 text-xs text-gray-500">
            {formatCurrency(downPayment)}
          </p>
        </label>

        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
            {t.interestRate}
          </span>
          <input
            type="number"
            min={0}
            max={20}
            step={0.05}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value) || 0)}
            className="mt-1.5 w-full border border-gray-200 bg-[#f7f5f2] px-4 py-3 text-sm font-semibold text-[#1a1a1a] outline-none focus:border-[#c9a84c]"
          />
        </label>

        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
            {t.loanTerm}
          </span>
          <div className="mt-1.5 flex gap-2">
            {[15, 30].map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setTermYears(y)}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider border transition-colors ${
                  termYears === y
                    ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                    : "bg-[#f7f5f2] text-[#1a1a1a] border-gray-200 hover:border-[#c9a84c]"
                }`}
              >
                {y} {t.yrSuffix}
              </button>
            ))}
          </div>
        </label>
      </div>

      <label className="mt-5 flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={includeTaxIns}
          onChange={(e) => setIncludeTaxIns(e.target.checked)}
          className="accent-[#c9a84c] w-4 h-4"
        />
        <span className="text-sm text-gray-600">{t.addTaxIns}</span>
      </label>

      <div className="mt-8 border-t border-gray-100 pt-6">
        <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium mb-1">
          {showExtras ? t.estMonthlyTotal : t.estMonthlyPI}
        </p>
        <p className="font-serif text-4xl md:text-5xl text-[#1a1a1a] font-medium">
          {formatCurrency(showExtras ? result.monthlyTotal : result.monthlyPI)}
          <span className="text-base text-gray-400 font-sans font-normal ml-1">
            {t.perMonth}
          </span>
        </p>
        {showExtras && (
          <p className="text-xs text-gray-500 mt-2">
            {fill(t.piTaxIns, {
              pi: formatCurrency(result.monthlyPI),
              tax: formatCurrency(result.monthlyTax),
              ins: formatCurrency(result.monthlyIns),
            })}
            {includeMip
              ? ` · MIP ${formatCurrency(result.monthlyMip)}`
              : ""}
            {hoaMonthly > 0
              ? ` · HOA ${formatCurrency(result.monthlyHoa)}`
              : ""}
          </p>
        )}
        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-gray-400">
              {t.loanAmount}
            </dt>
            <dd className="font-semibold mt-0.5">
              {formatCurrency(result.loanAmount)}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-gray-400">
              {t.totalInterest}
            </dt>
            <dd className="font-semibold mt-0.5">
              {formatCurrency(result.totalInterest)}
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-[11px] text-gray-400 leading-relaxed">
          {t.mortgageDisclaimer}
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          {showLinkToFull && (
            <Link
              to="/calculator"
              className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a] hover:text-[#c9a84c] transition-colors"
            >
              {t.openFullCalc}
            </Link>
          )}
          {showPreapproval && (
            <a
              href={buyTypeform("calculator")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-wider text-[#c9a84c] hover:opacity-80"
            >
              {t.getPreapproval}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
