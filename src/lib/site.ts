/** Site-wide copy/config — swap when Aaron confirms real values. */

export const REPLY_HOURS = 2;

/** Public California DRE for Aaron Gilberto Cervantes (active salesperson). */
export const DRE_NUMBER = "02064152";

/**
 * Phone from public agent listings tied to DRE 02064152.
 * Confirm with Aaron if SMS should use a different line.
 */
export const AGENT_PHONE_DISPLAY = "(661) 839-4931";
export const AGENT_PHONE_SMS = "6618394931";
export const AGENT_EMAIL = "aaron@cervantesre.com";

/** Leave blank until Aaron confirms — Contact hides the link when empty. */
export const CALENDLY_URL = ""; // e.g. https://calendly.com/aaron-cervantes/15min

/** Leave blank until Aaron confirms — footer hides the link when empty. */
export const SNH_INSTAGRAM = ""; // e.g. https://www.instagram.com/socalsnewhomes/

/**
 * Live SoCal’s New Homes questionnaire (Railway).
 * Cannot be iframed (X-Frame-Options: SAMEORIGIN) — open in a new tab.
 * Hard-refresh the Railway URL if an old funnel still caches.
 *
 * Public short links (use these in bios / ads — never the raw Railway host):
 * - https://cervantesre.com/start  → questionnaire with source=ig
 * - Optional dedicated SNH domain can CNAME onto the questionnaire Railway
 *   service, or URL-forward to https://cervantesre.com/start
 */
export const SNH_QUESTIONNAIRE_URL =
  "https://web-production-a651e071.up.railway.app/";

/** Clean bio / ad entry on this site. */
export const SNH_START_PATH = "/start";

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

export const LICENSE_LINE = `DRE #${DRE_NUMBER} · California Licensed Realtor · Equal Housing Opportunity`;

export const MORTGAGE_RATE_UPDATED = "Nov 20, 2026";

export function smsLink(body: string): string {
  return `sms:${AGENT_PHONE_SMS}?&body=${encodeURIComponent(body)}`;
}
