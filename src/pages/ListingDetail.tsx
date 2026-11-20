import { useParams } from "react-router-dom";
import { useListingDetail } from "@/lib/listings";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ListingGallery } from "@/components/listing/ListingGallery";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { ListingNav } from "@/components/listing/ListingNav";
import { ListingBody } from "@/components/listing/ListingDetails";
import { MobileListingBar } from "@/components/listing/MobileListingBar";

const ListingDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useListingDetail(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center text-gray-400 text-sm">
        Loading property…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center text-gray-500 text-sm">
        Property not found or no longer available.
      </div>
    );
  }

  const isClosed = /closed|sold/i.test(data.status);

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      <SiteHeader />
      <ListingGallery listing={data} />
      <ListingHeader listing={data} isClosed={isClosed} />
      <ListingNav listing={data} isClosed={isClosed} />
      <ListingBody listing={data} isClosed={isClosed} />
      <SiteFooter />
      <MobileListingBar listing={data} isClosed={isClosed} />
    </div>
  );
};

export default ListingDetail;
