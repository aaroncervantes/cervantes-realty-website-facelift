import { Link, useParams } from "react-router-dom";
import { useListingDetail } from "@/lib/listings";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { MortgageCalculator } from "@/components/site/MortgageCalculator";
import { parsePrice } from "@/lib/mortgage";
import { usePageTitle } from "@/hooks/use-page-title";

const PropertyBrief = () => {
  const { id } = useParams();
  const { data: listing, isLoading } = useListingDetail(id);
  usePageTitle("Property brief");
  if (isLoading) return <div className="p-10 text-gray-600">Loading property brief…</div>;
  if (!listing) return <div className="p-10"><p>Property not found.</p><Link to="/homes" className="underline">Browse homes</Link></div>;
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <div className="print:hidden"><SiteHeader /></div>
      <main className="max-w-4xl mx-auto px-6 py-12 print:py-0 print:px-0">
        <div className="print:hidden flex items-center justify-between mb-9">
          <Link to={`/listing/${listing.id}`} className="text-sm underline underline-offset-4">← Property details</Link>
          <button type="button" onClick={() => window.print()} className="bg-[#1a1a1a] text-white px-5 py-3 text-xs uppercase tracking-widest">Print / Save PDF</button>
        </div>
        <p className="text-[10px] text-[#c9a84c] uppercase tracking-widest font-bold mb-3">Cervantes Realty · Property Brief</p>
        <h1 className="font-serif text-4xl mb-2">{listing.address}</h1>
        <p className="text-gray-600 mb-5">{listing.cityStateZip}</p>
        <div className="grid sm:grid-cols-2 gap-6 items-start">
          <div><img src={listing.image} alt={listing.address} className="w-full aspect-[4/3] object-cover print:max-h-[240px]" /></div>
          <div>
            <p className="font-serif text-3xl mb-4">{listing.price}</p>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              {([["Status", listing.status],["Bedrooms",listing.beds],["Bathrooms",listing.baths],["Square feet",listing.sqft],["Property type",listing.overview.propertyType],["MLS",listing.overview.mlsId]] as const).filter(([,value]) => Boolean(value?.trim())).map(([label,value]) => <div key={label}><dt className="text-gray-500 text-xs">{label}</dt><dd className="font-semibold">{value}</dd></div>)}
            </dl>
          </div>
        </div>
        <h2 className="font-serif text-2xl mt-9 mb-3">About the property</h2>
        <p className="text-sm leading-relaxed text-gray-700">{listing.description}</p>
        <div className="print:hidden mt-9"><MortgageCalculator initialPrice={parsePrice(listing.price)} variant="sidebar" title="Illustrative monthly payment" /></div>
        <p className="text-xs text-gray-500 mt-9">Property details, availability and pricing should be independently verified. Payment figures shown elsewhere on this site are estimates, not financing offers.</p>
        <div className="border-t border-gray-300 mt-6 pt-5 text-sm">
          <p className="font-semibold">{listing.agent.name}</p>
          <p>{listing.agent.role}</p>
          {listing.agent.phone && <p>{listing.agent.phone}</p>}
          {listing.agent.email && <p>{listing.agent.email}</p>}
        </div>
      </main>
      <div className="print:hidden"><SiteFooter /></div>
    </div>
  );
};

export default PropertyBrief;
