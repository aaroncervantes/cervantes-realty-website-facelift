/** Site-wide copy/config — swap when Aaron confirms real values. */

export const REPLY_HOURS = 2;
export const AGENT_PHONE_DISPLAY = "(562) 555-0199";
export const AGENT_PHONE_SMS = "5625550199";
export const AGENT_EMAIL = "aaron@cervantesre.com";

/** Leave blank until Aaron confirms — footer hides the link when empty. */
export const SNH_INSTAGRAM = ""; // e.g. https://www.instagram.com/socalsnewhomes/

export const LICENSE_LINE =
  "California Licensed Realtor · Equal Housing Opportunity";

export const MORTGAGE_RATE_UPDATED = "Nov 20, 2026";

export function smsLink(body: string): string {
  return `sms:${AGENT_PHONE_SMS}?&body=${encodeURIComponent(body)}`;
}
