import { useEffect } from "react";
import { SITE_OG_IMAGE } from "@/lib/site";

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

export type PageMeta = {
  title?: string;
  description?: string;
  /** Absolute image URL for og:image / twitter:image */
  image?: string;
};

/** Sets document title + SEO / OG / Twitter tags for the route. */
export function usePageTitle(
  titleOrMeta?: string | PageMeta,
  description?: string,
) {
  const meta: PageMeta =
    typeof titleOrMeta === "string" || titleOrMeta == null
      ? { title: titleOrMeta, description }
      : titleOrMeta;

  useEffect(() => {
    const full = meta.title
      ? `${meta.title} · ${BASE}`
      : `${BASE} — Find Your Home in the World`;
    document.title = full;
    const desc = meta.description || DEFAULT_DESC;
    const image = meta.image || SITE_OG_IMAGE;
    ensureMeta("description").content = desc;
    ensureMeta("og:title", "property").content = full;
    ensureMeta("og:description", "property").content = desc;
    ensureMeta("og:image", "property").content = image;
    ensureMeta("og:type", "property").content = "website";
    ensureMeta("twitter:card").content = "summary_large_image";
    ensureMeta("twitter:title").content = full;
    ensureMeta("twitter:description").content = desc;
    ensureMeta("twitter:image").content = image;
    return () => {
      document.title = `${BASE} — Find Your Home in the World`;
    };
  }, [meta.title, meta.description, meta.image]);
}
