import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { WhenVisible } from "@/components/site/WhenVisible";
import { useLang } from "@/lib/i18n";

const ServiceAreaMap = lazy(() =>
  import("@/components/site/ServiceAreaMap").then((m) => ({
    default: m.ServiceAreaMap,
  })),
);

function MapSkeleton() {
  return (
    <div className="svc-wrap" aria-hidden>
      <div className="svc-map svc-map-main svc-map-skeleton">
        <p className="svc-skeleton-label">Map loads as you scroll</p>
      </div>
      <aside className="svc-side svc-side-skeleton" />
    </div>
  );
}

export function ServiceAreas() {
  const { t } = useLang();
  return (
    <section className="svc-section svc-onhome" id="service-map">
      <div className="container mx-auto px-6 max-w-[1120px]">
        <p className="text-[10px] uppercase tracking-[0.18em] text-[#c9a84c] font-bold mb-3 text-center">
          {t.svcEyebrow}
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-center text-[#1a1a1a] tracking-tight mb-3">
          {t.svcTitle}
          <br />
          <span className="text-[#1a1a1a]/75">{t.svcTitleEm}</span>
        </h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto mb-10 text-[15px] leading-relaxed">
          {t.svcLead}
        </p>
      </div>

      <WhenVisible
        rootMargin="500px 0px"
        fallback={<MapSkeleton />}
      >
        <Suspense fallback={<MapSkeleton />}>
          <ServiceAreaMap mode="home" />
        </Suspense>
      </WhenVisible>

      <div className="mt-8 text-center">
        <Link
          to="/service-areas"
          className="inline-flex text-[12px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a] hover:text-[#c9a84c] transition-colors"
        >
          {t.svcSeeEvery}
        </Link>
      </div>
    </section>
  );
}
