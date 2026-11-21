import { Link, useSearchParams } from "react-router-dom";
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
          {fromIg && (
            <div className="mb-10 border border-[#c9a84c]/40 bg-white px-6 py-5 animate-[cr-fadeup_0.6s_ease-out_both]">
              <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-1">
                {t.newHomesFromIg}
              </p>
              <p className="font-serif text-xl text-[#1a1a1a]">
                {t.newHomesFromIgBody}
              </p>
            </div>
          )}

          <CollaborationMark className="mb-6" />
          <h1 className="font-serif text-4xl md:text-6xl mb-4">
            {t.newHomesTitle}
          </h1>
          <p className="text-gray-600 max-w-2xl mb-4">{t.newHomesLead}</p>
          <p className="text-sm text-gray-500 max-w-2xl mb-4 border-l-2 border-[#c9a84c] pl-4">
            {t.newHomesBrowseOnly}{" "}
            <Link to="/compare" className="underline hover:text-[#c9a84c]">
              {t.newHomesCompareLink}
            </Link>{" "}
            {t.newHomesOr}{" "}
            <Link to="/buy" className="underline hover:text-[#c9a84c]">
              {t.newHomesBuyLink}
            </Link>
            .
          </p>
          <p className="text-xs text-gray-400 mb-12">{t.newHomesFootnote}</p>

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
