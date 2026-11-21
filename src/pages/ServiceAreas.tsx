import { lazy, Suspense } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { usePageTitle } from "@/hooks/use-page-title";
import { useLang } from "@/lib/i18n";

const ServiceAreaMap = lazy(() =>
  import("@/components/site/ServiceAreaMap").then((m) => ({
    default: m.ServiceAreaMap,
  })),
);

const ServiceAreasPage = () => {
  const { t } = useLang();
  usePageTitle(t.svcPageTitle);
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <SiteHeader />
      <section className="pt-16 md:pt-24 pb-8">
        <div className="container mx-auto px-6 max-w-[1120px] text-center">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#c9a84c] font-bold mb-3">
            {t.svcEyebrow}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight mb-4">
            {t.svcPageHeading}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-[15px] leading-relaxed">
            {t.svcPageLead}
          </p>
        </div>
      </section>
      <section className="svc-section pb-16 md:pb-24">
        <Suspense
          fallback={
            <div className="svc-wrap">
              <div className="svc-map svc-map-page" />
            </div>
          }
        >
          <ServiceAreaMap mode="page" />
        </Suspense>
        <p className="mt-8 text-center text-[11px] text-gray-400 max-w-2xl mx-auto px-6 leading-relaxed">
          {t.svcDisclaimer}
        </p>
      </section>
      <SiteFooter />
    </div>
  );
};

export default ServiceAreasPage;
