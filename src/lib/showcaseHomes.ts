import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSupabase } from "./supabaseClient";
import {
  FALLBACK_NEW_HOMES,
  getNewHome,
  type NewHome,
} from "@/data/newHomes";

/** Flat row matching public.showcase_homes */
export interface ShowcaseHomeRow {
  id: number;
  slug: string;
  title: string;
  area: string;
  from_price: number;
  price_high: number | null;
  beds: string;
  baths: string;
  sqft: string;
  style: string;
  blurb: string;
  compare_to_resale: string[];
  why_buyers: string;
  hoa: string;
  special_assessments: string;
  incentives: string;
  verified_date: string;
  image: string;
  gallery: string[];
  video_url: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export function fromShowcaseRow(r: ShowcaseHomeRow): NewHome {
  const seeded = getNewHome(r.slug);
  return {
    id: String(r.id),
    slug: r.slug,
    title: r.title,
    area: r.area,
    fromPrice: Number(r.from_price),
    priceHigh: r.price_high != null ? Number(r.price_high) : undefined,
    priceLabel: seeded?.priceLabel,
    beds: r.beds,
    baths: r.baths,
    sqft: r.sqft,
    style: r.style,
    blurb: r.blurb,
    compareToResale: (r.compare_to_resale || []).slice(0, 3) as [
      string,
      string,
      string,
    ],
    whyBuyers: r.why_buyers,
    hoa: r.hoa,
    specialAssessments: r.special_assessments,
    incentives: r.incentives,
    verifiedDate: r.verified_date,
    image: r.image || "",
    gallery: r.gallery || [],
    videoUrl: r.video_url || undefined,
  };
}

export function emptyShowcaseRow(): ShowcaseHomeRow {
  return {
    id: 0,
    slug: "",
    title: "",
    area: "",
    from_price: 0,
    price_high: null,
    beds: "",
    baths: "",
    sqft: "",
    style: "",
    blurb: "",
    compare_to_resale: ["", "", ""],
    why_buyers: "",
    hoa: "Not yet verified",
    special_assessments: "Not yet verified",
    incentives: "Not yet verified",
    verified_date: "",
    image: "",
    gallery: [],
    video_url: "",
    sort_order: 0,
    is_published: true,
    created_at: "",
    updated_at: "",
  };
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function ensureSlug(row: ShowcaseHomeRow): ShowcaseHomeRow {
  const slug = row.slug.trim() || slugify(row.title);
  return { ...row, slug };
}

export function usePublicShowcaseHomes() {
  return useQuery({
    queryKey: ["showcase", "public"],
    queryFn: async () => {
      const supabase = getSupabase();
      if (!supabase) return [...FALLBACK_NEW_HOMES];
      const { data, error } = await supabase
        .from("showcase_homes")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (error) {
        // Table may not exist yet — fall back to static seed
        console.warn("showcase_homes public read:", error.message);
        return [...FALLBACK_NEW_HOMES];
      }
      if (!data?.length) return [...FALLBACK_NEW_HOMES];
      return (data as ShowcaseHomeRow[]).map(fromShowcaseRow);
    },
    staleTime: 60_000,
  });
}

export function useShowcaseDetail(slug: string | undefined) {
  return useQuery({
    queryKey: ["showcase", "detail", slug],
    queryFn: async () => {
      if (!slug) return null;
      const supabase = getSupabase();
      if (!supabase) {
        return getNewHome(slug) || null;
      }
      const { data, error } = await supabase
        .from("showcase_homes")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) {
        console.warn("showcase detail:", error.message);
        return getNewHome(slug) || null;
      }
      if (data) return fromShowcaseRow(data as ShowcaseHomeRow);
      // Try current slug after alias resolve (legacy builder-named URLs)
      const seeded = getNewHome(slug);
      if (seeded && seeded.slug !== slug) {
        const { data: aliased } = await supabase
          .from("showcase_homes")
          .select("*")
          .eq("slug", seeded.slug)
          .maybeSingle();
        if (aliased) return fromShowcaseRow(aliased as ShowcaseHomeRow);
      }
      return seeded || null;
    },
    enabled: !!slug,
  });
}

export function useAdminShowcaseHomes() {
  return useQuery({
    queryKey: ["showcase", "admin"],
    queryFn: async () => {
      const supabase = getSupabase();
      if (!supabase) return [];
      const { data, error } = await supabase
        .from("showcase_homes")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as ShowcaseHomeRow[];
    },
  });
}

export function useAdminShowcaseHome(id: string | undefined) {
  return useQuery({
    queryKey: ["showcase", "admin", id],
    queryFn: async () => {
      const supabase = getSupabase();
      if (!supabase) return null;
      const { data, error } = await supabase
        .from("showcase_homes")
        .select("*")
        .eq("id", Number(id))
        .maybeSingle();
      if (error) throw error;
      return (data as ShowcaseHomeRow) || null;
    },
    enabled: !!id,
  });
}

export function useCreateShowcaseHome() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (row: Partial<ShowcaseHomeRow>) => {
      const supabase = getSupabase();
      if (!supabase) throw new Error("Supabase is not configured yet.");
      const { data, error } = await supabase
        .from("showcase_homes")
        .insert(row)
        .select()
        .single();
      if (error) throw error;
      return data as ShowcaseHomeRow;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["showcase"] }),
  });
}

export function useUpdateShowcaseHome() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (row: ShowcaseHomeRow) => {
      const supabase = getSupabase();
      if (!supabase) throw new Error("Supabase is not configured yet.");
      // Identity `id` cannot appear in SET; timestamps are DB-managed.
      const { id, created_at: _c, updated_at: _u, ...payload } = row;
      const { data, error } = await supabase
        .from("showcase_homes")
        .update(payload)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as ShowcaseHomeRow;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["showcase"] }),
  });
}

export function useDeleteShowcaseHome() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const supabase = getSupabase();
      if (!supabase) throw new Error("Supabase is not configured yet.");
      const { error } = await supabase
        .from("showcase_homes")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["showcase"] }),
  });
}

export function useToggleShowcasePublished() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      is_published,
    }: {
      id: number;
      is_published: boolean;
    }) => {
      const supabase = getSupabase();
      if (!supabase) throw new Error("Supabase is not configured yet.");
      const { error } = await supabase
        .from("showcase_homes")
        .update({ is_published })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["showcase"] }),
  });
}

/** One-click seed from static NEW_HOMES when the table is empty. */
export function useSeedShowcaseFromStatic() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const supabase = getSupabase();
      if (!supabase) throw new Error("Supabase is not configured yet.");
      const rows = FALLBACK_NEW_HOMES.map((h, i) => ({
        slug: h.slug,
        title: h.title,
        area: h.area,
        from_price: h.fromPrice,
        price_high: h.priceHigh ?? null,
        beds: h.beds,
        baths: h.baths,
        sqft: h.sqft,
        style: h.style,
        blurb: h.blurb,
        compare_to_resale: [...h.compareToResale],
        why_buyers: h.whyBuyers,
        hoa: h.hoa,
        special_assessments: h.specialAssessments,
        incentives: h.incentives,
        verified_date: h.verifiedDate,
        // Photos stay empty — upload zips in CMS
        image: "",
        gallery: [] as string[],
        video_url: h.videoUrl || "",
        sort_order: i + 1,
        is_published: true,
      }));
      const { data, error } = await supabase
        .from("showcase_homes")
        .upsert(rows, { onConflict: "slug" })
        .select();
      if (error) throw error;
      return data as ShowcaseHomeRow[];
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["showcase"] }),
  });
}
