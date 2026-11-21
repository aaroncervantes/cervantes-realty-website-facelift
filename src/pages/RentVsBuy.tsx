import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  DEFAULT_DOWN_PERCENT,
  DEFAULT_RATE,
  DEFAULT_TERM_YEARS,
  calcMortgage,
  formatCurrency,
} from "@/lib/mortgage";
import { usePageTitle } from "@/hooks/use-page-title";
import { useLang, fill } from "@/lib/i18n";

const RentVsBuy = () => {
  usePageTitle("Rent vs buy");
  const { t } = useLang();
  const [rent, setRent] = useState(2800);
  const [price, setPrice] = useState(650000);
  const pay = useMemo(
    () =>
      calcMortgage({
        price,
        downPayment: (price * DEFAULT_DOWN_PERCENT) / 100,
        ratePercent: DEFAULT_RATE,
        termYears: DEFAULT_TERM_YEARS,
      }).monthlyPI,
    [price],
  );

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <SiteHeader />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
            {t.rentEyebrow}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl mb-4">
            {t.rentTitle}
          </h1>
          <p className="text-gray-600 mb-10 leading-relaxed">{t.rentLead}</p>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <label className="bg-white border border-gray-200 p-6">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                {t.monthlyRent}
              </span>
              <input
                type="range"
                min={1200}
                max={6000}
                step={50}
                value={rent}
                onChange={(e) => setRent(Number(e.target.value))}
                className="mt-4 w-full accent-[#c9a84c]"
              />
              <p className="mt-2 font-serif text-3xl">{formatCurrency(rent)}</p>
            </label>
            <label className="bg-white border border-gray-200 p-6">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                {t.homePrice}
              </span>
              <input
                type="range"
                min={350000}
                max={1400000}
                step={5000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="mt-4 w-full accent-[#c9a84c]"
              />
              <p className="mt-2 font-serif text-3xl">{formatCurrency(price)}</p>
              <p className="text-sm text-gray-500 mt-1">
                {t.estPI} {formatCurrency(pay)}
                {t.perMonth} · {DEFAULT_DOWN_PERCENT}% down · {DEFAULT_RATE}%
              </p>
            </label>
          </div>
          <div className="border-t border-gray-200 pt-8 mb-10">
            <p className="font-serif text-2xl mb-2">
              {pay > rent
                ? fill(t.rentVsBuyAboveRent, {
                    amount: formatCurrency(pay - rent),
                  })
                : fill(t.rentVsBuyAboveBuy, {
                    amount: formatCurrency(rent - pay),
                  })}
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t.rentVsBuyNote}
            </p>
          </div>
          <Link
            to="/buy"
            className="inline-block bg-[#1a1a1a] text-white px-8 py-4 text-xs font-bold uppercase tracking-wider hover:bg-[#c9a84c]"
          >
            {t.continueBuyGuide}
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default RentVsBuy;
