import { Link } from "react-router-dom";
import type { NewHome } from "@/data/newHomes";
import {
  DEFAULT_DOWN_PERCENT,
  DEFAULT_RATE,
  DEFAULT_TERM_YEARS,
  calcMortgage,
  formatCurrency,
} from "@/lib/mortgage";
import { useLang } from "@/lib/i18n";

export function NewHomeCard({ home }: { home: NewHome }) {
  const { t } = useLang();
  const est = calcMortgage({
    price: home.fromPrice,
    downPayment: (home.fromPrice * DEFAULT_DOWN_PERCENT) / 100,
    ratePercent: DEFAULT_RATE,
    termYears: DEFAULT_TERM_YEARS,
  });
  const priceLine = home.priceLabel
    ? home.priceLabel
    : `${t.fromPrice} ${formatCurrency(home.fromPrice)}`;

  return (
    <Link to={`/new-homes/${home.slug}`} className="block group">
      <article className="overflow-hidden border border-gray-200 bg-white hover:border-[#c9a84c]/60 transition-colors">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={home.image}
            alt={home.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
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
            Est. from {formatCurrency(est.monthlyPI)}/mo P&amp;I
          </p>
          <p className="text-sm text-gray-600">
            {home.beds} beds · {home.baths} baths · {home.sqft} sqft
          </p>
        </div>
      </article>
    </Link>
  );
}
