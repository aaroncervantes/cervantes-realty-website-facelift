import { useParams, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useListingDetail } from "@/lib/listings";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SELL_URL, BUY_URL } from "@/components/site/SiteHeader";
import { ListingGallery } from "@/components/listing/ListingGallery";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { ListingNav } from "@/components/listing/ListingNav";
import { ListingBody } from "@/components/listing/ListingDetails";
import { MobileListingBar } from "@/components/listing/MobileListingBar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

function ListingPageHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#f7f5f2]/95 backdrop-blur-md border-b border-gray-200/60">
      <div className="container mx-auto px-6 h-24 flex items-center justify-between max-w-7xl">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://assets.cdn.filesafe.space/yvIB8uaPt79VRC8MA1HI/media/69e6c389571cca8e954ff6a8.png"
            alt="Cervantes Realty"
            className="h-16 md:h-20 w-auto object-contain"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-xs font-semibold tracking-widest uppercase">
          <a
            href={SELL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            Sell
          </a>
          <a
            href={BUY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            Buy
          </a>
          <Link to="/team" className="hover:opacity-60 transition-opacity">
            Team
          </Link>
          <Link to="/contact" className="hover:opacity-60 transition-opacity">
            Contact
          </Link>
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 hover:bg-black/5 rounded-md transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#f7f5f2] border-l-0 w-[300px] sm:w-[400px]"
            >
              <nav className="flex flex-col gap-8 mt-12 text-base tracking-widest uppercase font-medium">
                <a href={SELL_URL} target="_blank" rel="noopener noreferrer">
                  Sell
                </a>
                <a href={BUY_URL} target="_blank" rel="noopener noreferrer">
                  Buy
                </a>
                <Link to="/team">Team</Link>
                <Link to="/contact">Contact</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

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
      <ListingPageHeader />
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
