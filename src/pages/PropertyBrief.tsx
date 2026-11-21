import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import { useListingDetail } from "@/lib/listings";
import { StatusPill } from "@/components/listing/StatusPill";
import {
  DEFAULT_DOWN_PERCENT,
  DEFAULT_RATE,
  DEFAULT_TERM_YEARS,
  calcMortgage,
  formatCurrency,
  parsePrice,
} from "@/lib/mortgage";
import { LICENSE_LINE } from "@/lib/site";
import { usePageTitle } from "@/hooks/use-page-title";

const PropertyBrief = () => {
  const { id } = useParams();
  const { data, isLoading } = useListingDetail(id);
  usePageTitle(data ? `Brief · ${data.address}` : "Property brief");

  const gallery = useMemo(() => {
    if (!data) return [] as string[];
    const g = data.gallery?.filter(Boolean) ?? [];
    if (g.length) return g;
    return data.image ? [data.image] : [];
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-sm text-gray-400">
        Loading brief…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-sm text-gray-500">
        Listing not found.{" "}
        <Link to="/homes" className="underline ml-2">
          Homes
        </Link>
      </div>
    );
  }

  const price = parsePrice(data.price);
  const est = calcMortgage({
    price,
    downPayment: (price * DEFAULT_DOWN_PERCENT) / 100,
    ratePercent: DEFAULT_RATE,
    termYears: DEFAULT_TERM_YEARS,
  });
  const hero = gallery[0] || data.image;
  const thumbs = gallery.slice(1, 5);

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] print:bg-white">
      <div className="print:hidden sticky top-0 z-10 bg-[#f7f5f2]/95 backdrop-blur border-b border-gray-200">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-3xl">
          <Link
            to={`/listing/${data.id}`}
            className="text-xs font-bold uppercase tracking-wider hover:text-[#c9a84c]"
          >
            ← Back to listing
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-[#1a1a1a] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#c9a84c]"
          >
            Print / Save PDF
          </button>
        </div>
      </div>

      <article className="container mx-auto px-6 py-10 md:py-14 max-w-3xl print:max-w-none print:px-0 print:py-0">
        <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
          Cervantes Realty · Property brief
        </p>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <StatusPill listing={data} />
          <span className="text-xs text-gray-500">{data.mls}</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl mb-2 print:text-3xl">
          {data.address}
        </h1>
        <p className="text-gray-600 mb-6">{data.cityStateZip}</p>
        <p className="font-serif text-3xl mb-8 print:text-2xl">{data.price}</p>

        {hero && (
          <div className="aspect-[16/10] overflow-hidden mb-4 print:break-inside-avoid">
            <img
              src={hero}
              alt={data.address}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {thumbs.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-10 print:break-inside-avoid">
            {thumbs.map((src, i) => (
              <div key={`${src}-${i}`} className="aspect-[4/3] overflow-hidden">
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 text-sm print:break-inside-avoid">
          <div>
            <dt className="text-[10px] uppercase tracking-wider text-gray-400">
              Beds
            </dt>
            <dd className="font-semibold mt-1">{data.beds}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-wider text-gray-400">
              Baths
            </dt>
            <dd className="font-semibold mt-1">{data.baths}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-wider text-gray-400">
              Size
            </dt>
            <dd className="font-semibold mt-1">{data.sqft}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-wider text-gray-400">
              Type
            </dt>
            <dd className="font-semibold mt-1">{data.type}</dd>
          </div>
        </dl>

        <h2 className="font-serif text-2xl mb-3">About</h2>
        <p className="text-gray-700 leading-relaxed mb-8">{data.description}</p>

        <h2 className="font-serif text-2xl mb-3">Specifications</h2>
        <ul className="text-sm text-gray-700 space-y-2 mb-8 print:break-inside-avoid">
          <li>
            Interior: {data.features.interior.bedrooms},{" "}
            {data.features.interior.fullBaths}
          </li>
          <li>Flooring: {data.features.interior.flooring}</li>
          <li>Garage: {data.features.exterior.garageSpaces}</li>
          <li>Neighborhood: {data.features.details.neighborhood}</li>
          <li>Architecture: {data.features.details.architectureStyle}</li>
        </ul>

        {price > 0 && (
          <div className="border border-gray-200 p-6 mb-8 print:break-inside-avoid">
            <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
              Payment estimate
            </p>
            <p className="font-serif text-2xl mb-1">
              {formatCurrency(est.monthlyPI)}
              <span className="text-sm text-gray-400 font-sans"> /mo P&I</span>
            </p>
            <p className="text-xs text-gray-500">
              Assumes {DEFAULT_DOWN_PERCENT}% down · {DEFAULT_RATE}% ·{" "}
              {DEFAULT_TERM_YEARS}-yr. Estimate only — not a lender quote.
            </p>
          </div>
        )}

        <div className="flex items-center gap-4 mb-10 print:break-inside-avoid">
          <img
            src={data.agent.image}
            alt={data.agent.name}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="font-serif font-bold">{data.agent.name}</p>
            <p className="text-xs text-gray-500">{data.agent.role}</p>
            <p className="text-xs text-gray-500">{data.agent.email}</p>
            {data.agent.phone ? (
              <p className="text-xs text-gray-500">{data.agent.phone}</p>
            ) : null}
          </div>
        </div>

        <p className="text-[11px] text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
          {LICENSE_LINE}. Information believed accurate but not guaranteed.
          Buyers should verify all facts. Cervantes Realty.
        </p>
      </article>
    </div>
  );
};

export default PropertyBrief;
