import { Link, useParams } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MortgageCalculator } from "@/components/site/MortgageCalculator";
import { CollaborationMark } from "@/components/site/CollaborationMark";
import { NewHomeGallery } from "@/components/site/NewHomeGallery";
import { useShowcaseDetail } from "@/lib/showcaseHomes";
import { formatCurrency } from "@/lib/mortgage";
import { usePageTitle } from "@/hooks/use-page-title";
import { useLang } from "@/lib/i18n";

function Snap({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
        {label}
      </dt>
      <dd className="text-sm font-semibold text-[#1a1a1a] mt-1">{value}</dd>
    </div>
  );
}

const NewHomeDetail = () => {
  const { slug } = useParams();
  const { t } = useLang();
  const { data: home, isLoading } = useShowcaseDetail(slug);
  usePageTitle(home ? home.title : "Showcase");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center text-gray-500 text-sm">
        {t.showcaseLoading}
      </div>
    );
  }

  if (!home) {
    return (
      <div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center text-gray-500 text-sm">
        {t.showcaseNotFound}{" "}
        <Link to="/new-homes" className="underline ml-2">
          {t.showcaseBack}
        </Link>
      </div>
    );
  }

  const priceRange = home.priceHigh
    ? `${formatCurrency(home.fromPrice)} – ${formatCurrency(home.priceHigh)}`
    : `${t.fromPrice} ${formatCurrency(home.fromPrice)}`;

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <SiteHeader />
      <NewHomeGallery home={home} />
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link
            to="/new-homes"
            className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#c9a84c]"
          >
            {t.showcaseBackShort}
          </Link>
          <div className="grid lg:grid-cols-3 gap-10 mt-8 items-start">
            <div className="lg:col-span-2 space-y-10">
              {home.videoUrl && (
                <div className="aspect-video overflow-hidden border border-gray-200">
                  <iframe
                    title={`${home.title} video`}
                    src={home.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              <div>
                <CollaborationMark className="mb-4" />
                <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
                  {home.area} · {home.style}
                </p>
                <h1 className="font-serif text-4xl md:text-5xl mb-4">
                  {home.title}
                </h1>
                <p className="text-2xl font-bold mb-2">{priceRange}</p>
                <p className="text-sm text-gray-600 mb-8">
                  {home.beds} {t.bedsLabel} · {home.baths} {t.bathsLabel} ·{" "}
                  {home.sqft} sqft
                </p>
                <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mb-10">
                  {home.blurb}
                </p>

                <h2 className="font-serif text-2xl mb-5">
                  {t.communitySnapshot}
                </h2>
                <dl className="grid grid-cols-2 gap-x-8 gap-y-6 mb-4 max-w-2xl">
                  <Snap label={t.labelGeneralArea} value={home.area} />
                  <Snap label={t.labelPriceRange} value={priceRange} />
                  <Snap label={t.labelBeds} value={home.beds} />
                  <Snap label={t.labelBaths} value={home.baths} />
                  <Snap label={t.labelSqft} value={home.sqft} />
                  <Snap label={t.labelStyle} value={home.style} />
                  <Snap label={t.labelHoa} value={home.hoa} />
                  <Snap
                    label={t.labelAssessments}
                    value={home.specialAssessments}
                  />
                  <Snap label={t.labelIncentives} value={home.incentives} />
                  <Snap label={t.labelVerified} value={home.verifiedDate} />
                </dl>
                <p className="text-xs text-gray-400 mb-12">
                  {t.showcaseAddressNote}
                </p>

                <h2 className="font-serif text-2xl mb-3">{t.whyBuyersTitle}</h2>
                <p className="text-gray-700 leading-relaxed max-w-2xl mb-10">
                  {home.whyBuyers}
                </p>

                <h2 className="font-serif text-2xl mb-4">{t.whyCompareTitle}</h2>
                <ul className="space-y-4 mb-10">
                  {home.compareToResale.map((line) => (
                    <li
                      key={line}
                      className="border-l-2 border-[#c9a84c] pl-4 text-gray-700 leading-relaxed"
                    >
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="p-6 bg-[#1a1a1a] text-white">
                  <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
                    {t.notCervantesListing}
                  </p>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {t.notCervantesBody}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link
                      to="/compare"
                      className="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-gray-100"
                    >
                      {t.newVsResale}
                    </Link>
                    <Link
                      to="/buy"
                      className="border border-white/40 px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-white/10"
                    >
                      {t.buyGuide}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:sticky lg:top-36">
              <MortgageCalculator
                initialPrice={home.fromPrice}
                variant="sidebar"
                title={t.estPaymentFrom}
                showLinkToFull
              />
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default NewHomeDetail;
