/** Site-wide copy/config — swap when Aaron confirms real values. */

export const REPLY_HOURS = 2;
export const AGENT_PHONE_DISPLAY = "(562) 555-0199";
export const AGENT_PHONE_SMS = "5625550199";
export const AGENT_EMAIL = "aaron@cervantesre.com";

/** Leave blank until Aaron confirms — footer hides the link when empty. */
export const SNH_INSTAGRAM = ""; // e.g. https://www.instagram.com/socalsnewhomes/

/**
 * Live SoCal’s New Homes questionnaire (Railway).
 * Cannot be iframed (X-Frame-Options: SAMEORIGIN) — open in a new tab.
 * Hard-refresh the Railway URL if an old funnel still caches.
 */
export const SNH_QUESTIONNAIRE_URL =
  "https://web-production-a651e071.up.railway.app/";

export type SnhSource =
  | "new-homes"
  | "compare"
  | "ig"
  | "home"
  | "listing";

export function snhQuestionnaire(source?: SnhSource): string {
  if (!source) return SNH_QUESTIONNAIRE_URL;
  const join = SNH_QUESTIONNAIRE_URL.includes("?") ? "&" : "?";
  return `${SNH_QUESTIONNAIRE_URL}${join}source=${encodeURIComponent(source)}`;
}

export const LICENSE_LINE =
  "California Licensed Realtor · Equal Housing Opportunity";

export const MORTGAGE_RATE_UPDATED = "Nov 20, 2026";

export function smsLink(body: string): string {
  return `sms:${AGENT_PHONE_SMS}?&body=${encodeURIComponent(body)}`;
}
