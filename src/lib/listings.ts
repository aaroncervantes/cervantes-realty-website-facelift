import { getSupabase } from "./supabaseClient";

export interface Listing {
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
  created_at?: string;
  updated_at?: string;
}

export type ListingInput = Omit<Listing, "id" | "created_at" | "updated_at"> & {
  id?: number;
};

export async function fetchPublishedListings(): Promise<Listing[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Listing[];
}

export async function fetchListingById(id: number): Promise<Listing | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as Listing | null;
}

export async function fetchAllListingsAdmin(): Promise<Listing[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Listing[];
}

export async function upsertListing(input: ListingInput): Promise<Listing> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("listings")
    .upsert(input)
    .select("*")
    .single();
  if (error) throw error;
  return data as Listing;
}

export async function deleteListing(id: number): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase not configured");
  const { error } = await supabase.from("listings").delete().eq("id", id);
  if (error) throw error;
}

export function emptyListing(): ListingInput {
  return {
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
    agent_email: "aaron@cervantesre.com",
    agent_image: "",
    admin_notes: "",
    sort_order: 0,
    is_published: true,
  };
}
