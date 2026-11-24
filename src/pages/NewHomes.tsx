import { useSearchParams } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { NewHomeCard } from "@/components/site/NewHomeCard";
import { CollaborationMark } from "@/components/site/CollaborationMark";
import { NewHomesQuestionnaireIntegration } from "@/components/site/NewHomesQuestionnaireIntegration";
import { usePublicShowcaseHomes } from "@/lib/showcaseHomes";
import { usePageTitle } from "@/hooks/use-page-title";
import { useLang } from "@/lib/i18n";

const NewHomes = () => {
  usePageTitle("New construction showcase");
  const { t } = useLang();
  const [params] = useSearchParams();
  const fromIg = params.get("from") === "ig";
  const { data: homes = [], isLoading } = usePublicShowcaseHomes();

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <SiteHeader />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <CollaborationMark compact className="mb-4" />
          <h1 className="font-serif text-4xl md:text-6xl mb-3">
            {t.newHomesTitle}
          </h1>
          <p className="text-gray-600 max-w-xl mb-12">{t.newHomesBrowseOnly}</p>

          {isLoading ? (
            <p className="text-sm text-gray-400 mb-16">{t.newHomesLoading}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {homes.map((home) => (
                <NewHomeCard key={home.id} home={home} />
              ))}
            </div>
          )}

          <NewHomesQuestionnaireIntegration
            source={fromIg ? "ig" : "new-homes"}
          />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default NewHomes;
