import { Heart, Camera } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { usePublicListings } from "@/lib/listings";
import { SiteHeader } from "@/components/site/SiteHeader";
import { CompetitiveEdge } from "@/components/site/CompetitiveEdge";
import { Values } from "@/components/site/Values";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const { data, isLoading } = usePublicListings();
  const listings = data || [];

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      <SiteHeader />

      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png"
            alt="Luxurious modern living room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium drop-shadow-lg">
            Find Your Home in the World
          </h1>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#f7f5f2]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-0 max-w-5xl mx-auto items-stretch">
            <div className="relative h-[400px] md:h-auto overflow-hidden">
              <video
                src="https://storage.googleapis.com/msgsndr/yvIB8uaPt79VRC8MA1HI/media/6977f3cda87beb5bbc21004e.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="bg-[#1e1e1e] text-white p-12 md:p-16 lg:p-20 flex flex-col justify-center items-start">
              <h2 className="font-serif text-4xl md:text-5xl mb-6 font-medium">
                Cervantes Concierge
              </h2>
              <p className="text-lg md:text-xl font-serif italic mb-10 text-white/90 leading-relaxed">
                Concierge helps you sell your home faster and for more money -
                with the no hassle for you - kick your feet up and let us be
                Real Estate Professionals.
              </p>
              <a
                href="/contact"
                className="bg-white text-black px-8 py-4 text-sm font-semibold hover:bg-gray-100 transition-colors uppercase tracking-wider"
              >
                Get in touch with an agent!
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <h2 className="text-3xl md:text-4xl font-sans font-bold mb-8 text-[#1a1a1a]">
            Recent - Listings/Closings
          </h2>
          {isLoading && (
            <p className="text-gray-400 text-sm py-8 text-center">
              Loading listings…
            </p>
          )}
          {!isLoading && listings.length === 0 && (
            <p className="text-gray-400 text-sm py-8 text-center">
              No listings available.
            </p>
          )}
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 3000 })]}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4">
              {listings.map((listing) => (
                <CarouselItem
                  key={listing.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <a href={`/listing/${listing.id}`} className="block group">
                    <Card className="overflow-hidden border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={listing.image}
                          alt={listing.address}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                          {listing.badges.map((badge, i) => (
                            <span
                              key={i}
                              className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold text-white rounded-full ${
                                badge.includes("Represented") ||
                                badge.includes("Representing")
                                  ? "bg-[#c9a84c]"
                                  : "bg-black/60 backdrop-blur-sm"
                              }`}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-black/20 transition-colors"
                        >
                          <Heart className="w-6 h-6 text-white" />
                        </button>
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                          <Camera className="w-3.5 h-3.5" />
                          <span>{listing.photosCount}</span>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-2xl font-bold text-[#1a1a1a] group-hover:text-[#c9a84c] transition-colors">
                            {listing.price}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-600" />
                            <span className="text-xs font-medium text-gray-700">
                              {listing.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-[#1a1a1a] mb-2">
                          <span>{listing.beds} Beds</span>
                          <span className="text-gray-300">•</span>
                          <span>{listing.baths} Baths</span>
                          <span className="text-gray-300">•</span>
                          <span>{listing.sqft}</span>
                          <span className="text-gray-300">•</span>
                          <span>{listing.type}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4 truncate">
                          {listing.address}
                          {listing.cityStateZip
                            ? `, ${listing.cityStateZip}`
                            : ""}
                        </p>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <p className="text-xs text-gray-500">{listing.mls}</p>
                          <div className="w-6 h-6 rounded flex items-center justify-center bg-sidebar-accent-foreground border-amber-500">
                            <span className="text-white text-[10px] font-bold">
                              CR
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="block">
              <CarouselPrevious className="left-0 md:-left-4 bg-white/90 hover:bg-white border border-gray-200 shadow-lg h-10 w-10 md:h-12 md:w-12" />
              <CarouselNext className="right-0 md:-right-4 bg-white/90 hover:bg-white border border-gray-200 shadow-lg h-10 w-10 md:h-12 md:w-12" />
            </div>
          </Carousel>
        </div>
      </section>

      <CompetitiveEdge />
      <Values />
      <SiteFooter />
    </div>
  );
};

export default Index;
