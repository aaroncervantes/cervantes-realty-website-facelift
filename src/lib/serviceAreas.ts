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

/** Soft Apple-Maps-friendly fills: keep hue, gentle chroma, mid-lightness. */
export function punchCityColor(hex: string): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return hex;
  const n = Number.parseInt(m[1], 16);
  let r = ((n >> 16) & 255) / 255;
  let g = ((n >> 8) & 255) / 255;
  let b = (n & 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  let s = 0;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  // Clearer than the old washed pastels, but not neon over cream land.
  const s2 = Math.min(0.62, Math.max(0.42, s * 0.95));
  const l2 = Math.min(0.72, Math.max(0.58, l * 0.86));

  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };

  let r2: number;
  let g2: number;
  let b2: number;
  if (s2 === 0) {
    r2 = g2 = b2 = l2;
  } else {
    const q = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2;
    const p = 2 * l2 - q;
    r2 = hue2rgb(p, q, h + 1 / 3);
    g2 = hue2rgb(p, q, h);
    b2 = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (v: number) =>
    Math.round(Math.min(1, Math.max(0, v)) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`.toUpperCase();
}

export async function loadServiceAreas(): Promise<ServiceAreaCollection> {
  if (cached) return cached;
  const res = await fetch("/data/service-area.json");
  if (!res.ok) throw new Error("Could not load service areas");
  const data = (await res.json()) as ServiceAreaCollection;
  for (const f of data.features) {
    f.properties.color = punchCityColor(f.properties.color);
  }
  cached = data;
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
