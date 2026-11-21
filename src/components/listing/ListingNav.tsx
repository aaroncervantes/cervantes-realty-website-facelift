import { useState } from "react";
import type { Listing } from "@/data/listings";
import { buyTypeform } from "@/lib/typeform";

export function ListingNav({
  listing,
  isClosed,
}: {
  listing: Listing;
  isClosed: boolean;
}) {
  const [active, setActive] = useState("overview");
  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "features", label: "Features & Amenities" },
    { key: "location", label: "Location" },
  ];

  const go = (key: string) => {
    setActive(key);
    document
      .getElementById(`${key}-section`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-24 z-40 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between gap-4 h-14">
        <div className="flex gap-5 md:gap-8 overflow-x-auto no-scrollbar text-xs tracking-wider uppercase font-semibold">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => go(tab.key)}
              className={`py-4 border-b-2 transition-colors whitespace-nowrap ${
                active === tab.key
                  ? "border-[#c9a84c] text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {isClosed ? (
            <>
              <a
                href={`mailto:${listing.agent.email}`}
                className="text-[#1a1a1a] px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Ask Aaron
              </a>
              <a
                href={buyTypeform("listing")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#c9a84c] text-white px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Get a home like this
              </a>
            </>
          ) : (
            <>
              <a
                href="#schedule-tour"
                className="bg-[#1a1a1a] text-white px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider hover:bg-black/80 transition-colors"
              >
                Get in Touch
              </a>
              <a
                href="#schedule-tour"
                className="bg-[#c9a84c] text-white px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Schedule a Tour
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
