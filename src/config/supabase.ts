// ============================================================
// Supabase config for Cervantes Realty listings CMS
// NEW project for facelift rebuild — see internal/credentials.md
// ============================================================

export const SUPABASE_URL = "https://cstiewwawgtjimofbxhj.supabase.co";
export const SUPABASE_ANON_KEY =
  "sb_publishable_H1nqW1__pcMkMdkF6TLw1A_KA3Bv5oX";

export const SUPABASE_CONFIGURED =
  !SUPABASE_URL.includes("YOUR-PROJECT-ref") &&
  !SUPABASE_ANON_KEY.includes("YOUR-ANON-PUBLIC-KEY");
