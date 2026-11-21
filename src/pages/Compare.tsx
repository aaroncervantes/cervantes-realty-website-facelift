import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { NewVsResaleCompare } from "@/components/site/NewVsResaleCompare";
import { NewHomesQuestionnaireIntegration } from "@/components/site/NewHomesQuestionnaireIntegration";
import { usePageTitle } from "@/hooks/use-page-title";

const Compare = () => {
  usePageTitle("New construction vs resale");
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <SiteHeader />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <NewVsResaleCompare />
          <div className="mt-16">
            <NewHomesQuestionnaireIntegration source="compare" />
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default Compare;
