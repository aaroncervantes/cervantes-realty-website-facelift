import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { NewHome } from "@/data/newHomes";

/** Full-bleed photo rail for showcase communities (browse-only). */
export function NewHomeGallery({ home }: { home: NewHome }) {
  const slides = home.gallery.length ? home.gallery : home.image ? [home.image] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: slides.length > 1,
    align: "center",
  });
  const [index, setIndex] = useState(0);
  const onSelect = useCallback(() => {
    if (emblaApi) setIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  if (!slides.length) return null;

  return (
    <section className="bg-[#1a1a1a]">
      <div className="overflow-hidden relative" ref={emblaRef}>
        <div className="flex">
          {slides.map((src, i) => (
            <div key={i} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative h-[48vh] md:h-[68vh] min-h-[320px] w-full">
                <img
                  src={src}
                  alt={`${home.title} — photo ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-5 left-5 z-10 bg-black/55 backdrop-blur text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5">
          SoCal’s New Homes · Browse only
        </div>
        <div className="absolute top-5 right-5 z-10 bg-black/55 backdrop-blur text-white text-[11px] font-semibold px-3 py-1.5">
          {index + 1} / {slides.length}
        </div>
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-black flex items-center justify-center"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-black flex items-center justify-center"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
      {slides.length > 1 && (
        <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
          {slides.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              className={`shrink-0 w-16 h-11 overflow-hidden border-2 transition ${
                index === i
                  ? "border-[#c9a84c] opacity-100"
                  : "border-transparent opacity-45 hover:opacity-90"
              }`}
              aria-label={`Go to photo ${i + 1}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
