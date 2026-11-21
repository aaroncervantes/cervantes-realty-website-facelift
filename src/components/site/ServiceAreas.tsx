import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function ServiceAreas() {
  const { t } = useLang();
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <p className="text-[#c9a84c] font-semibold text-[10px] uppercase tracking-widest mb-2 text-center">
          {t.marketsEyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-center text-[#1a1a1a] mb-10">
          {t.marketsTitle}
        </h2>
        <Link
          to="/markets"
          className="group relative block overflow-hidden min-h-[280px] border border-gray-100"
        >
          <img
            src="/images/socal-markets-map.png"
            alt="Southern California markets map — Long Beach, LA County, Inland Empire, High Desert"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-[#c9a84c]" />
              <span className="text-sm font-bold uppercase tracking-widest">
                Southern California
              </span>
            </div>
            <p className="text-sm text-white/80 font-serif italic max-w-xl mb-4">
              {t.marketsBody}
            </p>
            <span className="text-xs font-bold uppercase tracking-wider text-[#c9a84c]">
              {t.marketsCta}
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
