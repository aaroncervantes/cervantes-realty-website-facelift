// ============================================================
// Supabase config for Cervantes Realty listings CMS
// Real-estate account project (Cervantes Realty org)
// ============================================================

export const SUPABASE_URL = "https://pdlecpunupzyqreocjnn.supabase.co";

/** Legacy anon JWT — compatible with @supabase/supabase-js auth + RLS */
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkbGVjcHVudXB6eXFyZW9jam5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUyMTE0MDYsImV4cCI6MjExMDc4NzQwNn0.CpK8ubSb5McUnHdONXVVNjKtjvIUfV9y5kE-M0ba06s";

/** Also provisioned: sb_publishable_5WuDPrZkpP_n1SrHxoq1tA_78OoruXz */

export const SUPABASE_CONFIGURED =
  !SUPABASE_URL.includes("YOUR-PROJECT-ref") &&
  !SUPABASE_ANON_KEY.includes("YOUR-ANON-PUBLIC-KEY");
