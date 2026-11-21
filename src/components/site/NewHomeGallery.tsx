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

  if (!slides.length) {
    return (
      <div className="w-full bg-[#ebe6df] border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-7xl py-24 md:py-32 text-center">
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-3">
            SoCal’s New Homes · Browse only
          </p>
          <p className="font-serif text-2xl md:text-3xl text-[#1a1a1a]/70">
            Photos coming soon — ask Devante for a private look.
          </p>
        </div>
      </div>
    );
  }

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
