import { Link } from "react-router-dom";
import type { NewHome } from "@/data/newHomes";
import {
  DEFAULT_TERM_YEARS,
  NEW_HOME_DOWN_PERCENT,
  NEW_HOME_HOA_ESTIMATE,
  NEW_HOME_RATE,
  calcMortgage,
  formatCurrency,
} from "@/lib/mortgage";
import { useLang } from "@/lib/i18n";

/** Dahlia / Bloom / Serrano Oaks — townhome showcase payment assumptions. */
const TOWNHOME_SLUGS = new Set([
  "gated-north-fontana-townhomes",
  "ontario-area-townhomes",
  "jurupa-valley-townhomes",
]);

export function NewHomeCard({ home }: { home: NewHome }) {
  const { t } = useLang();
  const isTownhome = TOWNHOME_SLUGS.has(home.slug);
  const est = calcMortgage({
    price: home.fromPrice,
    downPayment: (home.fromPrice * NEW_HOME_DOWN_PERCENT) / 100,
    ratePercent: NEW_HOME_RATE,
    termYears: DEFAULT_TERM_YEARS,
    includeTaxIns: true,
    includeMip: isTownhome,
    hoaMonthly: isTownhome ? NEW_HOME_HOA_ESTIMATE : 0,
  });
  const priceLine = home.priceLabel
    ? home.priceLabel
    : `${t.fromPrice} ${formatCurrency(home.fromPrice)}`;
  const hasPhoto = Boolean(home.image);
  // Round to nearest $100 so cards read cleanly (~$3,980 → $4,000)
  const estMonthly = Math.round(est.monthlyTotal / 100) * 100;

  return (
    <Link to={`/new-homes/${home.slug}`} className="block group">
      <article className="overflow-hidden border border-gray-200 bg-white hover:border-[#c9a84c]/60 transition-colors">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#ebe6df]">
          {hasPhoto ? (
            <img
              src={home.image}
              alt={home.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
                SoCal’s New Homes
              </p>
              <p className="font-serif text-lg text-[#1a1a1a]/70">
                {t.photosComingSoon}
              </p>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold text-white bg-black/60 backdrop-blur-sm">
              {t.showcaseBadge}
            </span>
          </div>
        </div>
        <div className="p-5">
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-1">
            {home.area}
          </p>
          <h3 className="text-xl font-serif font-medium text-[#1a1a1a] group-hover:text-[#c9a84c] transition-colors mb-2">
            {home.title}
          </h3>
          <p className="text-lg font-bold text-[#1a1a1a]">{priceLine}</p>
          <p className="text-xs text-gray-500 mt-1 mb-3">
            Est. from {formatCurrency(estMonthly)}/mo
            <span className="text-gray-400">
              {" "}
              · {NEW_HOME_DOWN_PERCENT}% down · {NEW_HOME_RATE}%
              {isTownhome
                ? " · tax, ins, MIP & est. HOA"
                : " · tax & ins"}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            {home.beds} beds · {home.baths} baths · {home.sqft} sqft
          </p>
        </div>
      </article>
    </Link>
  );
}
