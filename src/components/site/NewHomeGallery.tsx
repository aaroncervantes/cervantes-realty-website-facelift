import { useMemo } from "react";
import type { NewHome } from "@/data/newHomes";
import { MosaicGallery } from "@/components/site/MosaicGallery";

/** Serhant-style mosaic for showcase communities (browse-only). */
export function NewHomeGallery({ home }: { home: NewHome }) {
  const slides = useMemo(() => {
    const g = home.gallery?.filter(Boolean) ?? [];
    if (g.length) return g;
    return home.image ? [home.image] : [];
  }, [home.gallery, home.image]);

  return (
    <MosaicGallery
      slides={slides}
      title={home.title}
      overlays={
        <span className="bg-black/55 backdrop-blur text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
          SoCal’s New Homes · Browse only
        </span>
      }
    />
  );
}
