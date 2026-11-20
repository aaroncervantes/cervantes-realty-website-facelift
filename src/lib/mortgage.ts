/** Simple P&I mortgage math — estimates only, not a lender quote. */

export const DEFAULT_RATE = 6.3;
export const DEFAULT_TERM_YEARS = 30;
export const DEFAULT_DOWN_PERCENT = 20;

export function parsePrice(input: string | number | undefined | null): number {
  if (typeof input === "number") return Number.isFinite(input) ? input : 0;
  if (!input) return 0;
  const n = Number(String(input).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function formatCurrency(n: number, compact = false): string {
  if (!Number.isFinite(n)) return "$0";
  if (compact && Math.abs(n) >= 1_000_000) {
    return `$${(n / 1_000_000).toFixed(2)}M`;
  }
  if (compact && Math.abs(n) >= 10_000) {
    return `$${Math.round(n / 1000)}K`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export interface MortgageInput {
  price: number;
  downPayment: number;
  ratePercent: number;
  termYears: number;
}

export interface MortgageResult {
  loanAmount: number;
  monthlyPI: number;
  totalInterest: number;
  totalPaid: number;
  paymentCount: number;
}

export function calcMortgage({
  price,
  downPayment,
  ratePercent,
  termYears,
}: MortgageInput): MortgageResult {
  const loanAmount = Math.max(0, price - Math.max(0, downPayment));
  const paymentCount = Math.max(1, Math.round(termYears * 12));
  const monthlyRate = ratePercent / 100 / 12;

  let monthlyPI = 0;
  if (loanAmount <= 0) {
    monthlyPI = 0;
  } else if (monthlyRate === 0) {
    monthlyPI = loanAmount / paymentCount;
  } else {
    const factor = Math.pow(1 + monthlyRate, paymentCount);
    monthlyPI = (loanAmount * monthlyRate * factor) / (factor - 1);
  }

  const totalPaid = monthlyPI * paymentCount;
  const totalInterest = Math.max(0, totalPaid - loanAmount);

  return {
    loanAmount,
    monthlyPI,
    totalInterest,
    totalPaid,
    paymentCount,
  };
}
