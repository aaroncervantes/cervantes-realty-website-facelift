/** Service-area city helpers (Census TIGER polygons in /public/data/service-area.json). */

export interface ServiceAreaProps {
  slug: string;
  name: string;
  county: string;
  value: string;
  url: string;
  color: string;
  center: [number, number];
  pop?: number;
  anchor?: string;
  bbox: [number, number, number, number];
  size?: number;
  coastal?: boolean;
  kind?: string;
}

export interface ServiceAreaFeature {
  type: "Feature";
  id: number;
  properties: ServiceAreaProps;
  geometry: GeoJSON.Geometry;
}

export interface ServiceAreaCollection {
  type: "FeatureCollection";
  credit?: string;
  frame: [number, number, number, number];
  features: ServiceAreaFeature[];
}

let cached: ServiceAreaCollection | null = null;

export async function loadServiceAreas(): Promise<ServiceAreaCollection> {
  if (cached) return cached;
  const res = await fetch("/data/service-area.json");
  if (!res.ok) throw new Error("Could not load service areas");
  cached = (await res.json()) as ServiceAreaCollection;
  return cached;
}

export function findServiceArea(
  data: ServiceAreaCollection,
  slug: string,
): ServiceAreaFeature | undefined {
  return data.features.find((f) => f.properties.slug === slug);
}

/** Parse “Typical value $928K” / “Median $1.08M” into a rough price for payment estimates. */
export function parseServiceAreaPrice(value: string): number {
  if (!value) return 750000;
  const m = value.match(/\$([\d.]+)\s*([KkMm])?/);
  if (!m) return 750000;
  const n = Number(m[1]);
  if (!Number.isFinite(n)) return 750000;
  const unit = (m[2] || "").toUpperCase();
  if (unit === "M") return Math.round(n * 1_000_000);
  if (unit === "K") return Math.round(n * 1_000);
  return Math.round(n);
}

export function plainCity(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function countyShort(county: string): string {
  return county.replace(/\s*County\s*$/i, "").trim();
}
