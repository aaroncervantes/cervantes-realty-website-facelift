// ============================================================
// Supabase config for Cervantes Realty listings CMS
// Facelift project — see Project store internal/credentials.md
// ============================================================

export const SUPABASE_URL = "https://cstiewwawgtjimofbxhj.supabase.co";

/** Legacy anon JWT (compat with @supabase/supabase-js auth + RLS) */
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzdGlld3dhd2d0amltb2ZieGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUyMDczMzcsImV4cCI6MjExMDc4MzMzN30.9-KIcj0aLaJpN1PmGfUVdfXtFssq97-JTLKBm9YWnRM";

/** New publishable key (also provisioned): sb_publishable_H1nqW1__pcMkMdkF6TLw1A_KA3Bv5oX */

export const SUPABASE_CONFIGURED =
  !SUPABASE_URL.includes("YOUR-PROJECT-ref") &&
  !SUPABASE_ANON_KEY.includes("YOUR-ANON-PUBLIC-KEY");
