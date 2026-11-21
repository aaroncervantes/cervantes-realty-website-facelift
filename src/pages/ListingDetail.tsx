import { useParams } from "react-router-dom";
import { useListingDetail } from "@/lib/listings";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ListingGallery } from "@/components/listing/ListingGallery";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { ListingNav } from "@/components/listing/ListingNav";
import { ListingBody } from "@/components/listing/ListingDetails";
import { MobileListingBar } from "@/components/listing/MobileListingBar";
import { usePageTitle } from "@/hooks/use-page-title";
import { useLang } from "@/lib/i18n";

const ListingDetail = () => {
  const { id } = useParams();
  const { t } = useLang();
  const { data, isLoading } = useListingDetail(id);

  usePageTitle(
    data
      ? {
          title: data.address,
          description: `${data.price} · ${data.beds} bed · ${data.baths} bath · ${data.cityStateZip}`,
          image: data.image || data.gallery?.[0],
        }
      : { title: undefined },
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center text-gray-400 text-sm">
        {t.listingLoading}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center text-gray-500 text-sm">
        {t.listingNotFound}
      </div>
    );
  }

  const isClosed = /closed|sold/i.test(data.status);

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      <SiteHeader />
      <ListingGallery listing={data} />
      {data.videoUrl && (
        <div className="container mx-auto px-6 max-w-7xl py-8">
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-3">
            {t.listingWalkthrough}
          </p>
          <div className="aspect-video overflow-hidden border border-gray-200 bg-black">
            <iframe
              title={`${data.address} walkthrough`}
              src={data.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
      <ListingHeader listing={data} isClosed={isClosed} />
      <ListingNav listing={data} isClosed={isClosed} />
      <ListingBody listing={data} isClosed={isClosed} />
      <SiteFooter />
      <MobileListingBar listing={data} isClosed={isClosed} />
    </div>
  );
};

export default ListingDetail;
