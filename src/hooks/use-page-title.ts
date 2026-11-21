import { useEffect } from "react";

const BASE = "Cervantes Realty";
const DEFAULT_DESC =
  "Cervantes Realty × SoCal’s New Homes — enclosed resale you can tour, new construction to study, Concierge for sellers.";

function ensureMeta(name: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector(
    `meta[${attr}="${name}"]`,
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  return el;
}

/** Sets document title + basic SEO description / OG title for the route. */
export function usePageTitle(title?: string, description?: string) {
  useEffect(() => {
    const full = title ? `${title} · ${BASE}` : `${BASE} — Find Your Home in the World`;
    document.title = full;
    const desc = description || DEFAULT_DESC;
    ensureMeta("description").content = desc;
    ensureMeta("og:title", "property").content = full;
    ensureMeta("og:description", "property").content = desc;
    ensureMeta("twitter:title").content = full;
    ensureMeta("twitter:description").content = desc;
    return () => {
      document.title = `${BASE} — Find Your Home in the World`;
    };
  }, [title, description]);
}
