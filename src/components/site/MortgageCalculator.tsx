import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  DEFAULT_DOWN_PERCENT,
  DEFAULT_RATE,
  DEFAULT_TERM_YEARS,
  calcMortgage,
  formatCurrency,
  parsePrice,
} from "@/lib/mortgage";

type Variant = "page" | "sidebar" | "compact";

interface MortgageCalculatorProps {
  initialPrice?: number | string;
  variant?: Variant;
  title?: string;
  className?: string;
  showLinkToFull?: boolean;
}

export function MortgageCalculator({
  initialPrice = 650000,
  variant = "page",
  title = "Estimate your payment",
  className = "",
  showLinkToFull = false,
}: MortgageCalculatorProps) {
  const startPrice = parsePrice(initialPrice) || 650000;
  const [price, setPrice] = useState(startPrice);
  const [downPercent, setDownPercent] = useState(DEFAULT_DOWN_PERCENT);
  const [rate, setRate] = useState(DEFAULT_RATE);
  const [termYears, setTermYears] = useState(DEFAULT_TERM_YEARS);

  const downPayment = (price * downPercent) / 100;
  const result = useMemo(
    () =>
      calcMortgage({
        price,
        downPayment,
        ratePercent: rate,
        termYears,
      }),
    [price, downPayment, rate, termYears],
  );

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
            Mortgage estimate
          </p>
          <h3
            className={`font-serif font-medium text-[#1a1a1a] ${
              isCompact ? "text-xl" : "text-2xl md:text-3xl"
            }`}
          >
            {title}
          </h3>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
            Rate chip
          </p>
          <p className="text-sm font-semibold text-[#1a1a1a]">
            {DEFAULT_RATE.toFixed(2)}%
          </p>
          <p className="text-[10px] text-gray-400">30-yr · updated weekly</p>
        </div>
      </div>

      <div className={`grid gap-5 ${isCompact ? "grid-cols-1" : "md:grid-cols-2"}`}>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
            Home price
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
            Down payment ({downPercent}%)
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
            Interest rate (%)
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
            Loan term
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
                {y} yr
              </button>
            ))}
          </div>
        </label>
      </div>

      <div className="mt-8 border-t border-gray-100 pt-6">
        <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium mb-1">
          Estimated monthly P&amp;I
        </p>
        <p className="font-serif text-4xl md:text-5xl text-[#1a1a1a] font-medium">
          {formatCurrency(result.monthlyPI)}
          <span className="text-base text-gray-400 font-sans font-normal ml-1">
            /mo
          </span>
        </p>
        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-gray-400">
              Loan amount
            </dt>
            <dd className="font-semibold mt-0.5">
              {formatCurrency(result.loanAmount)}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-gray-400">
              Total interest
            </dt>
            <dd className="font-semibold mt-0.5">
              {formatCurrency(result.totalInterest)}
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-[11px] text-gray-400 leading-relaxed">
          Principal &amp; interest only. Taxes, insurance, and HOA not included.
          Estimate only — not a lender quote.
        </p>
        {showLinkToFull && (
          <Link
            to="/calculator"
            className="inline-block mt-4 text-xs font-bold uppercase tracking-wider text-[#1a1a1a] hover:text-[#c9a84c] transition-colors"
          >
            Open full calculator →
          </Link>
        )}
      </div>
    </div>
  );
}
