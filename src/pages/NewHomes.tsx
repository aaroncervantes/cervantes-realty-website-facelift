import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { NewHomeCard } from "@/components/site/NewHomeCard";
import { NewVsResale } from "@/components/site/NewVsResale";
import { NewHomesQuestionnaireIntegration } from "@/components/site/NewHomesQuestionnaireIntegration";
import { NEW_HOMES } from "@/data/newHomes";
import { Link } from "react-router-dom";
import { usePageTitle } from "@/hooks/use-page-title";

const NewHomes = () => {
  usePageTitle("New construction showcase");
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <SiteHeader />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
            Cervantes Realty × SoCal’s New Homes · Exclusive collaboration
          </p>
          <h1 className="font-serif text-4xl md:text-6xl mb-4">
            New construction showcase
          </h1>
          <p className="text-gray-600 max-w-2xl mb-4">
            Common new-build patterns we post about — kept intentionally vague.
            These are not Cervantes listings.
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mb-12 border-l-2 border-[#c9a84c] pl-4">
            Browse only. No inquire on these products. For community or builder
            details, go direct. Want help deciding resale vs new?{" "}
            <Link to="/buy" className="underline hover:text-[#c9a84c]">
              Start a buy conversation
            </Link>
            .
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEW_HOMES.map((home) => (
              <NewHomeCard key={home.id} home={home} />
            ))}
          </div>
        </div>
      </section>
      <NewVsResale />
      <div className="container mx-auto px-6 max-w-5xl"><NewHomesQuestionnaireIntegration /></div>
      <SiteFooter />
    </div>
  );
};

export default NewHomes;
