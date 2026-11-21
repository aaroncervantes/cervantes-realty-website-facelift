import { useEffect, useState } from "react";
import type { Listing } from "@/data/listings";
import { buyTypeform } from "@/lib/typeform";
import { smsLink } from "@/lib/site";
import {
  DEFAULT_DOWN_PERCENT,
  DEFAULT_RATE,
  DEFAULT_TERM_YEARS,
  calcMortgage,
  formatCurrency,
  parsePrice,
} from "@/lib/mortgage";
import { fill, useLang } from "@/lib/i18n";

export function MobileListingBar({
  listing,
  isClosed,
}: {
  listing: Listing;
  isClosed: boolean;
}) {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  const price = parsePrice(listing.price);
  const est = calcMortgage({
    price,
    downPayment: (price * DEFAULT_DOWN_PERCENT) / 100,
    ratePercent: DEFAULT_RATE,
    termYears: DEFAULT_TERM_YEARS,
  });

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-gray-200 px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.25)] transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="min-w-0">
        <p className="font-serif text-lg font-bold leading-none text-[#1a1a1a]">
          {listing.price}
        </p>
        {!isClosed && price > 0 ? (
          <a
            href="#schedule-tour"
            className="text-[11px] text-[#c9a84c] font-semibold"
          >
            {fill(t.estMoAdjust, { amount: formatCurrency(est.monthlyPI) })}
          </a>
        ) : (
          <p className="text-[11px] text-gray-500 truncate">{listing.address}</p>
        )}
      </div>
      <div className="flex gap-2 shrink-0">
        <a
          href={smsLink(
            `Hi Aaron, I'm looking at ${listing.address}${isClosed ? " (sold — want something similar)" : ""}.`,
          )}
          className="border border-gray-300 px-3 py-3 text-[10px] font-bold uppercase tracking-wider"
        >
          {t.textBtn}
        </a>
        {isClosed ? (
          <a
            href={buyTypeform("listing")}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#c9a84c] text-white px-4 py-3 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
          >
            {t.likeThis}
          </a>
        ) : (
          <a
            href="#schedule-tour"
            className="bg-[#c9a84c] text-white px-4 py-3 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
          >
            {t.tourBtn}
          </a>
        )}
      </div>
    </div>
  );
}
