import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSupabase } from "./supabaseClient";
import { FALLBACK_LISTINGS, type Listing } from "@/data/listings";

export type ListingStatusKind = "active" | "pending" | "closed";

export function listingStatusKind(
  listing: Pick<Listing, "status">,
): ListingStatusKind {
  if (/closed|sold/i.test(listing.status)) return "closed";
  if (/pending|under\s*contract|contingent/i.test(listing.status))
    return "pending";
  return "active";
}

export function isClosedListing(listing: Pick<Listing, "status">): boolean {
  return listingStatusKind(listing) === "closed";
}

export function isPendingListing(listing: Pick<Listing, "status">): boolean {
  return listingStatusKind(listing) === "pending";
}

export function isActiveListing(listing: Pick<Listing, "status">): boolean {
  return listingStatusKind(listing) !== "closed";
}

export function filterActive(listings: Listing[]): Listing[] {
  return listings.filter((l) => listingStatusKind(l) === "active");
}

export function filterPending(listings: Listing[]): Listing[] {
  return listings.filter(isPendingListing);
}

export function filterClosed(listings: Listing[]): Listing[] {
  return listings.filter(isClosedListing);
}

/** Active → Pending → Closed, stable within group */
export function sortEnclosed(listings: Listing[]): Listing[] {
  const rank: Record<ListingStatusKind, number> = {
    active: 0,
    pending: 1,
    closed: 2,
  };
  return [...listings].sort(
    (a, b) => rank[listingStatusKind(a)] - rank[listingStatusKind(b)],
  );
}

export function enclosedInventory(listings: Listing[]): Listing[] {
  return sortEnclosed(listings);
}

/** Flat row shape matching public.listings */
export interface ListingRow {
  id: number;
  price: string;
  status: string;
  beds: string;
  baths: string;
  sqft: string;
  type: string;
  address: string;
  city_state_zip: string;
  mls: string;
  image: string;
  gallery: string[];
  badges: string[];
  photos_count: number;
  description: string;
  overview_property_type: string;
  overview_location: string;
  overview_mls_id: string;
  overview_last_updated: string;
  overview_status: string;
  interior_bedrooms: string;
  interior_full_baths: string;
  interior_half_baths: string;
  interior_flooring: string;
  interior_appliances: string;
  interior_other: string;
  exterior_stories: string;
  exterior_garage: string;
  exterior_water: string;
  exterior_roof: string;
  exterior_ac: string;
  exterior_other: string;
  details_neighborhood: string;
  details_architecture: string;
  details_view: string;
  agent_name: string;
  agent_role: string;
  agent_phone: string;
  agent_email: string;
  agent_image: string;
  admin_notes: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export function fromRow(e: ListingRow): Listing {
  return {
    id: e.id,
    price: e.price,
    status: e.status,
    beds: e.beds,
    baths: e.baths,
    sqft: e.sqft,
    type: e.type,
    address: e.address,
    cityStateZip: e.city_state_zip,
    mls: e.mls,
    image: e.image,
    gallery: e.gallery || [],
    badges: e.badges || [],
    photosCount: e.photos_count,
    description: e.description,
    overview: {
      propertyType: e.overview_property_type,
      location: e.overview_location,
      mlsId: e.overview_mls_id,
      lastUpdated: e.overview_last_updated,
      status: e.overview_status,
    },
    features: {
      interior: {
        bedrooms: e.interior_bedrooms,
        fullBaths: e.interior_full_baths,
        halfBaths: e.interior_half_baths || undefined,
        flooring: e.interior_flooring,
        appliances: e.interior_appliances,
        otherFeatures: e.interior_other,
      },
      exterior: {
        stories: e.exterior_stories,
        garageSpaces: e.exterior_garage,
        waterSource: e.exterior_water,
        roof: e.exterior_roof,
        airConditioning: e.exterior_ac,
        otherFeatures: e.exterior_other,
      },
      details: {
        neighborhood: e.details_neighborhood,
        architectureStyle: e.details_architecture,
        viewDescription: e.details_view,
      },
    },
    agent: {
      name: e.agent_name,
      role: e.agent_role,
      phone: e.agent_phone,
      email: e.agent_email,
      image: e.agent_image,
    },
    videoUrl: (e as ListingRow & { video_url?: string }).video_url || undefined,
  };
}

export function emptyAdminListing(): ListingRow {
  return {
    id: 0,
    price: "",
    status: "For Sale",
    beds: "",
    baths: "",
    sqft: "",
    type: "Single Family",
    address: "",
    city_state_zip: "",
    mls: "",
    image: "",
    gallery: [],
    badges: [],
    photos_count: 1,
    description: "",
    overview_property_type: "",
    overview_location: "",
    overview_mls_id: "",
    overview_last_updated: "",
    overview_status: "",
    interior_bedrooms: "",
    interior_full_baths: "",
    interior_half_baths: "",
    interior_flooring: "",
    interior_appliances: "",
    interior_other: "",
    exterior_stories: "",
    exterior_garage: "",
    exterior_water: "",
    exterior_roof: "",
    exterior_ac: "",
    exterior_other: "",
    details_neighborhood: "",
    details_architecture: "",
    details_view: "",
    agent_name: "Aaron Cervantes",
    agent_role: "Founder - Realtor",
    agent_phone: "",
    agent_email: "",
    agent_image: "",
    admin_notes: "",
    sort_order: 0,
    is_published: true,
    created_at: "",
    updated_at: "",
  };
}

export function usePublicListings() {
  return useQuery({
    queryKey: ["listings", "public"],
    queryFn: async () => {
      const supabase = getSupabase();
      if (!supabase) return [...FALLBACK_LISTINGS];
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data as ListingRow[]).map(fromRow);
    },
    staleTime: 60_000,
  });
}

export function useListingDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["listings", "detail", id],
    queryFn: async () => {
      const supabase = getSupabase();
      if (!supabase)
        return FALLBACK_LISTINGS.find((s) => s.id.toString() === id) || null;
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", Number(id))
        .maybeSingle();
      if (error) throw error;
      return data ? fromRow(data as ListingRow) : null;
    },
    enabled: !!id,
  });
}

export function useAdminListings() {
  return useQuery({
    queryKey: ["listings", "admin"],
    queryFn: async () => {
      const supabase = getSupabase();
      if (!supabase) return [];
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as ListingRow[];
    },
  });
}

export function useAdminListing(id: string | undefined) {
  return useQuery({
    queryKey: ["listings", "admin", id],
    queryFn: async () => {
      const supabase = getSupabase();
      if (!supabase) return null;
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", Number(id))
        .maybeSingle();
      if (error) throw error;
      return (data as ListingRow) || null;
    },
    enabled: !!id,
  });
}

export function useCreateListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (row: Partial<ListingRow>) => {
      const supabase = getSupabase();
      if (!supabase) throw new Error("Supabase is not configured yet.");
      const { data, error } = await supabase
        .from("listings")
        .insert(row)
        .select()
        .single();
      if (error) throw error;
      return data as ListingRow;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["listings"] }),
  });
}

export function useUpdateListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (row: ListingRow) => {
      const supabase = getSupabase();
      if (!supabase) throw new Error("Supabase is not configured yet.");
      const { data, error } = await supabase
        .from("listings")
        .update(row)
        .eq("id", row.id)
        .select()
        .single();
      if (error) throw error;
      return data as ListingRow;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["listings"] }),
  });
}

export function useDeleteListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const supabase = getSupabase();
      if (!supabase) throw new Error("Supabase is not configured yet.");
      const { error } = await supabase.from("listings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["listings"] }),
  });
}

export function useTogglePublished() {
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
        .from("listings")
        .update({ is_published })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["listings"] }),
  });
}

export function useDuplicateListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const supabase = getSupabase();
      if (!supabase) throw new Error("Supabase is not configured yet.");
      const { data: n, error: s } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();
      if (s) throw s;
      const { id: _id, created_at, updated_at, ...rest } = n as ListingRow;
      const { data, error } = await supabase
        .from("listings")
        .insert({
          ...rest,
          is_published: false,
          admin_notes: "Duplicated listing",
        })
        .select()
        .single();
      if (error) throw error;
      return data as ListingRow;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["listings"] }),
  });
}
