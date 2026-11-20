const SELL_BASE =
  "https://form.typeform.com/to/AJGF8W1h?typeform-source=cervantesestates.com#about";
const BUY_BASE =
  "https://form.typeform.com/to/MYDWRuKV?typeform-source=cervantesestates.com#new-menu-item";

export type LeadSource =
  | "calculator"
  | "listing"
  | "new-homes"
  | "ig"
  | "contact"
  | "buy"
  | "sell"
  | "story"
  | "market";

function withSource(base: string, source?: LeadSource): string {
  if (!source) return base;
  const join = base.includes("?") ? "&" : "?";
  return `${base}${join}source=${encodeURIComponent(source)}`;
}

export const SELL_TYPEFORM = SELL_BASE;
export const BUY_TYPEFORM = BUY_BASE;

export function buyTypeform(source?: LeadSource): string {
  return withSource(BUY_BASE, source);
}

export function sellTypeform(source?: LeadSource): string {
  return withSource(SELL_BASE, source);
}
