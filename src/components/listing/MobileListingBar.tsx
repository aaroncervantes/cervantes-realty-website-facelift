import { useEffect, useState } from "react";
import type { Listing } from "@/data/listings";
import { BUY_URL } from "@/components/site/SiteHeader";

export function MobileListingBar({
  listing,
  isClosed,
}: {
  listing: Listing;
  isClosed: boolean;
}) {
  const [show, setShow] = useState(false);

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
        <p className="text-[11px] text-gray-500 truncate">{listing.address}</p>
      </div>
      {isClosed ? (
        <a
          href={BUY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#c9a84c] text-white px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap"
        >
          Get a home like this
        </a>
      ) : (
        <a
          href="#schedule-tour"
          className="bg-[#c9a84c] text-white px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap"
        >
          Schedule a Tour
        </a>
      )}
    </div>
  );
}
