import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { buyTypeform } from "@/lib/typeform";
import {
  DEFAULT_DOWN_PERCENT,
  DEFAULT_RATE,
  DEFAULT_TERM_YEARS,
  NEW_HOME_RATE,
  RATE_UPDATED_LABEL,
  calcMortgage,
  formatCurrency,
  parsePrice,
} from "@/lib/mortgage";
import { useLang, fill } from "@/lib/i18n";

type Variant = "page" | "sidebar" | "compact";

interface MortgageCalculatorProps {
  initialPrice?: number | string;
  initialDownPercent?: number;
  initialRate?: number;
  initialIncludeTaxIns?: boolean;
  includeMip?: boolean;
  hoaMonthly?: number;
  variant?: Variant;
  title?: string;
  className?: string;
  showLinkToFull?: boolean;
  showPreapproval?: boolean;
}

const TERM_OPTIONS = [30, 20, 15, 10] as const;

const COLORS = {
  pi: "#1a1a1a",
  tax: "#c9a84c",
  ins: "#a89060",
  hoa: "#8a8780",
  mip: "#5c5a55",
} as const;

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[13px] font-semibold text-[#1a1a1a]">
      {children}
    </span>
  );
}

function PaymentDonut({
  segments,
  size = 160,
}: {
  segments: { value: number; color: string }[];
  size?: number;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = 40;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="shrink-0 -rotate-90"
      aria-hidden
    >
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="#efebe4"
        strokeWidth="16"
      />
      {segments
        .filter((s) => s.value > 0)
        .map((s, i) => {
          const len = (s.value / total) * c;
          const el = (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="16"
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return el;
        })}
    </svg>
  );
}

export function MortgageCalculator({
  initialPrice = 650000,
  initialDownPercent = DEFAULT_DOWN_PERCENT,
  initialRate = DEFAULT_RATE,
  initialIncludeTaxIns = false,
  includeMip = false,
  hoaMonthly: hoaProp = 0,
  variant = "page",
  title,
  className = "",
  showLinkToFull = false,
  showPreapproval = false,
}: MortgageCalculatorProps) {
  const { t } = useLang();
  const isPage = variant === "page";
  const isCompact = variant === "compact";
  const isSidebar = variant === "sidebar" || isCompact;

  const startPrice = parsePrice(initialPrice) || 650000;
  const [price, setPrice] = useState(startPrice);
  const [downPercent, setDownPercent] = useState(initialDownPercent);
  const [rate, setRate] = useState(initialRate);
  const [rateMode, setRateMode] = useState<"site" | "own" | "promo">(
    Math.abs(initialRate - NEW_HOME_RATE) < 0.001
      ? "promo"
      : Math.abs(initialRate - DEFAULT_RATE) < 0.001
        ? "site"
        : "own",
  );
  const [termYears, setTermYears] = useState(DEFAULT_TERM_YEARS);
  const [includeTaxIns, setIncludeTaxIns] = useState(
    isPage ? true : initialIncludeTaxIns,
  );
  const [hoaMonthly, setHoaMonthly] = useState(hoaProp);
  // Collapsed by default so payment + CTA show on first paint (NW pattern)
  const [extrasOpen, setExtrasOpen] = useState(
    !isPage && (initialIncludeTaxIns || hoaProp > 0),
  );

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
  const monthly = showExtras ? result.monthlyTotal : result.monthlyPI;

  const segments = useMemo(() => {
    const list: { value: number; color: string; key: string }[] = [
      { value: result.monthlyPI, color: COLORS.pi, key: "pi" },
    ];
    if (includeTaxIns) {
      list.push({ value: result.monthlyTax, color: COLORS.tax, key: "tax" });
      list.push({ value: result.monthlyIns, color: COLORS.ins, key: "ins" });
    }
    if (includeMip && result.monthlyMip > 0) {
      list.push({ value: result.monthlyMip, color: COLORS.mip, key: "mip" });
    }
    if (hoaMonthly > 0) {
      list.push({ value: result.monthlyHoa, color: COLORS.hoa, key: "hoa" });
    }
    return list;
  }, [result, includeTaxIns, includeMip, hoaMonthly]);

  const payoff = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + termYears);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }, [termYears]);

  const setDownDollars = (dollars: number) => {
    if (price <= 0) return;
    const pct = Math.min(50, Math.max(0, (dollars / price) * 100));
    setDownPercent(Math.round(pct * 10) / 10);
  };

  const pickSite = () => {
    setRateMode("site");
    setRate(DEFAULT_RATE);
  };
  const pickPromo = () => {
    setRateMode("promo");
    setRate(NEW_HOME_RATE);
  };

  const inputShell =
    "flex items-center rounded-xl bg-white border border-black/10 focus-within:border-[#c9a84c] focus-within:ring-2 focus-within:ring-[#c9a84c]/25 transition-[box-shadow,border-color]";

  const shell = isSidebar
    ? "border border-black/5 bg-white p-6 md:p-7"
    : "overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-28px_rgba(26,26,26,0.55)] ring-1 ring-black/5";

  const inputs = (
    <div className={isPage ? "bg-[#f3f1ec] p-5 md:p-7 h-full" : ""}>
      <h3
        className={`font-serif font-medium tracking-tight text-[#1a1a1a] mb-5 ${
          isCompact ? "text-xl" : "text-2xl"
        }`}
      >
        {isPage ? t.loanDetails : title ?? t.estimatePayment}
      </h3>

      <div className="grid gap-4">
        <label className="block">
          <FieldLabel>{t.homePrice}</FieldLabel>
          <div className={`mt-1.5 ${inputShell}`}>
            <span className="pl-3.5 text-sm text-gray-400">$</span>
            <input
              type="number"
              min={0}
              step={1000}
              value={Math.round(price)}
              onChange={(e) => setPrice(Number(e.target.value) || 0)}
              className="w-full border-0 bg-transparent px-2.5 py-3 text-sm font-semibold outline-none"
            />
          </div>
        </label>

        <div className="block">
          <FieldLabel>{t.downPaymentLabel}</FieldLabel>
          <div className="mt-1.5 grid grid-cols-[1fr_5.75rem] gap-2">
            <div className={inputShell}>
              <span className="pl-3.5 text-sm text-gray-400">$</span>
              <input
                type="number"
                min={0}
                step={1000}
                value={Math.round(downPayment)}
                onChange={(e) => setDownDollars(Number(e.target.value) || 0)}
                className="w-full border-0 bg-transparent px-2.5 py-3 text-sm font-semibold outline-none"
              />
            </div>
            <div className={inputShell}>
              <input
                type="number"
                min={0}
                max={50}
                step={0.5}
                value={downPercent}
                onChange={(e) =>
                  setDownPercent(
                    Math.min(50, Math.max(0, Number(e.target.value) || 0)),
                  )
                }
                className="w-full border-0 bg-transparent px-2.5 py-3 text-sm font-semibold outline-none"
              />
              <span className="pr-3 text-sm text-gray-400">%</span>
            </div>
          </div>
          {!isPage && (
            <input
              type="range"
              min={0}
              max={50}
              step={0.5}
              value={downPercent}
              onChange={(e) => setDownPercent(Number(e.target.value))}
              className="cr-range mt-3"
              style={
                {
                  "--cr-range-pct": `${(downPercent / 50) * 100}%`,
                } as React.CSSProperties
              }
            />
          )}
        </div>

        <div className="block">
          <FieldLabel>{t.loanTerm}</FieldLabel>
          <div className="mt-1.5 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TERM_OPTIONS.map((y) => {
              const active = termYears === y;
              return (
                <button
                  key={y}
                  type="button"
                  onClick={() => setTermYears(y)}
                  className={`rounded-full py-2.5 text-[12px] font-semibold transition-colors ${
                    active
                      ? "bg-white text-[#1a1a1a] ring-2 ring-[#c9a84c]"
                      : "bg-white/80 text-[#1a1a1a] ring-1 ring-black/10 hover:ring-[#c9a84c]/50"
                  }`}
                >
                  {y} {t.yearsWord}
                </button>
              );
            })}
          </div>
        </div>

        <div className="block">
          <FieldLabel>{t.interestRate}</FieldLabel>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={pickSite}
              className={`rounded-xl px-2.5 py-3 text-left transition-colors ${
                rateMode === "site"
                  ? "bg-[#c9a84c]/15 ring-2 ring-[#c9a84c]"
                  : "bg-white ring-1 ring-black/10 hover:ring-[#c9a84c]/50"
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                {t.siteRateLabel}
              </p>
              <p className="mt-1 text-base font-bold tabular-nums">
                {DEFAULT_RATE.toFixed(2)}%
              </p>
            </button>
            <button
              type="button"
              onClick={() => setRateMode("own")}
              className={`rounded-xl px-2.5 py-3 text-left transition-colors ${
                rateMode === "own"
                  ? "bg-[#c9a84c]/15 ring-2 ring-[#c9a84c]"
                  : "bg-white ring-1 ring-black/10 hover:ring-[#c9a84c]/50"
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                {t.enterOwnRate}
              </p>
              <div className="mt-1 flex items-center gap-0.5">
                <input
                  type="number"
                  min={0}
                  max={20}
                  step={0.05}
                  value={rate}
                  onFocus={() => setRateMode("own")}
                  onChange={(e) => {
                    setRateMode("own");
                    setRate(Number(e.target.value) || 0);
                  }}
                  className="w-full border-0 bg-transparent p-0 text-base font-bold tabular-nums outline-none"
                />
                <span className="text-xs text-gray-400">%</span>
              </div>
            </button>
            <button
              type="button"
              onClick={pickPromo}
              className={`rounded-xl px-2.5 py-3 text-left transition-colors ${
                rateMode === "promo"
                  ? "bg-[#c9a84c]/15 ring-2 ring-[#c9a84c]"
                  : "bg-white ring-1 ring-black/10 hover:ring-[#c9a84c]/50"
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8a6f28]">
                {t.promoRateLabel}
              </p>
              <p className="mt-1 text-base font-bold tabular-nums">
                {NEW_HOME_RATE.toFixed(2)}%
              </p>
            </button>
          </div>
          <p className="mt-2 text-[11px] text-gray-500">
            {fill(t.thirtyYrUpdated, { date: RATE_UPDATED_LABEL })}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExtrasOpen((o) => !o)}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a6f28] hover:text-[#1a1a1a] transition-colors"
      >
        {t.editTaxInsHoa}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${extrasOpen ? "rotate-180" : ""}`}
        />
      </button>

      {extrasOpen && (
        <div className="mt-3 space-y-3 rounded-xl border border-black/5 bg-white p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeTaxIns}
              onChange={(e) => setIncludeTaxIns(e.target.checked)}
              className="cr-check mt-0.5"
            />
            <span className="text-sm text-gray-600 leading-snug">
              {t.addTaxIns}
            </span>
          </label>
          <label className="block">
            <FieldLabel>{t.hoaMonthlyLabel}</FieldLabel>
            <div className={`mt-1.5 ${inputShell}`}>
              <span className="pl-3.5 text-sm text-gray-400">$</span>
              <input
                type="number"
                min={0}
                step={25}
                value={Math.round(hoaMonthly)}
                onChange={(e) => setHoaMonthly(Number(e.target.value) || 0)}
                className="w-full border-0 bg-transparent px-2.5 py-3 text-sm font-semibold outline-none"
              />
            </div>
          </label>
        </div>
      )}
    </div>
  );

  const results = (
    <div
      className={
        isPage
          ? "p-5 md:p-7 flex flex-col h-full bg-white"
          : "mt-6 border-t border-black/[0.06] pt-6"
      }
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400 mb-1">
        {t.monthlyPaymentLabel}
      </p>
      <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
        <p className="font-serif text-4xl md:text-5xl leading-none tracking-tight tabular-nums text-[#1a1a1a]">
          {formatCurrency(monthly)}
        </p>
        <p className="pb-1 text-sm text-gray-500">
          {fill(t.atRateTerm, {
            rate: rate.toFixed(2),
            term: termYears,
          })}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-5">
        <PaymentDonut segments={segments} size={isSidebar ? 124 : 168} />
        <ul className="space-y-3 text-sm min-w-0 flex-1">
          <li className="flex items-center gap-2.5">
            <i className="h-3 w-3 shrink-0 rounded-sm" style={{ background: COLORS.pi }} />
            <span className="text-gray-600 truncate">{t.principalInterest}</span>
            <span className="ml-auto font-bold tabular-nums">
              {formatCurrency(result.monthlyPI)}
            </span>
          </li>
          {includeTaxIns && (
            <>
              <li className="flex items-center gap-2.5">
                <i className="h-3 w-3 shrink-0 rounded-sm" style={{ background: COLORS.tax }} />
                <span className="text-gray-600 truncate">{t.propertyTaxes}</span>
                <span className="ml-auto font-bold tabular-nums">
                  {formatCurrency(result.monthlyTax)}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <i className="h-3 w-3 shrink-0 rounded-sm" style={{ background: COLORS.ins }} />
                <span className="text-gray-600 truncate">{t.homeInsurance}</span>
                <span className="ml-auto font-bold tabular-nums">
                  {formatCurrency(result.monthlyIns)}
                </span>
              </li>
            </>
          )}
          {includeMip && result.monthlyMip > 0 && (
            <li className="flex items-center gap-2.5">
              <i className="h-3 w-3 shrink-0 rounded-sm" style={{ background: COLORS.mip }} />
              <span className="text-gray-600 truncate">MIP</span>
              <span className="ml-auto font-bold tabular-nums">
                {formatCurrency(result.monthlyMip)}
              </span>
            </li>
          )}
          {hoaMonthly > 0 && (
            <li className="flex items-center gap-2.5">
              <i className="h-3 w-3 shrink-0 rounded-sm" style={{ background: COLORS.hoa }} />
              <span className="text-gray-600 truncate">HOA</span>
              <span className="ml-auto font-bold tabular-nums">
                {formatCurrency(result.monthlyHoa)}
              </span>
            </li>
          )}
        </ul>
      </div>

      <dl className="mt-6 grid grid-cols-3 gap-3 rounded-xl border border-black/10 p-4 text-sm">
        <div>
          <dt className="text-[11px] text-gray-500">{t.loanAmount}</dt>
          <dd className="mt-1 font-bold tabular-nums">
            {formatCurrency(result.loanAmount)}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] text-gray-500">{t.totalInterestPaid}</dt>
          <dd className="mt-1 font-bold tabular-nums">
            {formatCurrency(result.totalInterest)}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] text-gray-500">{t.payoffDate}</dt>
          <dd className="mt-1 font-bold tabular-nums">{payoff}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-6 space-y-2.5">
        {showPreapproval && (
          <a
            href={buyTypeform("calculator")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-xl bg-[#1a1a1a] px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#c9a84c]"
          >
            {t.getMyRateCta}
          </a>
        )}
        {showPreapproval && (
          <p className="flex items-center justify-center gap-1.5 text-[12px] text-gray-500">
            <ShieldCheck className="h-3.5 w-3.5 text-[#c9a84c]" />
            {t.noCreditImpact}
          </p>
        )}
        {showLinkToFull && (
          <Link
            to="/calculator"
            className="block text-center text-[11px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a] hover:text-[#c9a84c] transition-colors"
          >
            {t.openFullCalc}
          </Link>
        )}
        <p className="text-[11px] text-gray-400 leading-relaxed text-center pt-1">
          {t.mortgageDisclaimer}
        </p>
      </div>
    </div>
  );

  if (isPage) {
    return (
      <div className={`${shell} ${className}`}>
        <div className="grid lg:grid-cols-2 min-h-[560px]">
          {inputs}
          {results}
        </div>
      </div>
    );
  }

  return (
    <div className={`${shell} ${className}`}>
      {inputs}
      {results}
    </div>
  );
}
