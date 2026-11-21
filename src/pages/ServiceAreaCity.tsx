import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MortgageCalculator } from "@/components/site/MortgageCalculator";
import {
  findServiceArea,
  loadServiceAreas,
  parseServiceAreaPrice,
  type ServiceAreaFeature,
} from "@/lib/serviceAreas";
import { usePageTitle } from "@/hooks/use-page-title";
import { useLang, fill } from "@/lib/i18n";
import { buyTypeform } from "@/lib/typeform";

const ServiceAreaCity = () => {
  const { slug } = useParams();
  const { t } = useLang();
  const [city, setCity] = useState<ServiceAreaFeature | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;
    loadServiceAreas()
      .then((data) => {
        if (cancelled) return;
        setCity(slug ? findServiceArea(data, slug) || null : null);
      })
      .catch(() => {
        if (!cancelled) setCity(null);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const name = city?.properties.name || "City";
  usePageTitle(city ? `${name} real estate` : "Service area");

  if (city === undefined) {
    return (
      <div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center text-sm text-gray-500">
        Loading…
      </div>
    );
  }

  if (!city) {
    return (
      <div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center text-sm text-gray-500">
        City not found.{" "}
        <Link to="/service-areas" className="underline ml-2">
          Back to service areas
        </Link>
      </div>
    );
  }

  const p = city.properties;
  const price = parseServiceAreaPrice(p.value);

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <SiteHeader />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#c9a84c] font-bold mb-3">
            {p.county}
          </p>
          <div className="flex flex-wrap items-end gap-4 mb-4">
            <span
              className="inline-block h-10 w-10 rounded-xl border border-black/10"
              style={{ background: p.color }}
              aria-hidden
            />
            <h1 className="font-serif text-4xl md:text-6xl tracking-tight">
              {p.name}
            </h1>
          </div>
          <p className="text-lg text-gray-600 mb-2">{p.value}</p>
          <p className="text-sm text-gray-500 max-w-2xl mb-10 leading-relaxed">
            {fill(t.svcCityLead, { city: p.name })}
          </p>

          <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
            <div>
              <h2 className="font-serif text-2xl mb-3">{t.svcCityNext}</h2>
              <p className="text-gray-600 mb-6 max-w-xl leading-relaxed">
                {t.svcCityBody}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={buyTypeform("market")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1a1a1a] text-white px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-[#c9a84c] transition-colors"
                >
                  {t.svcCityBuyCta}
                </a>
                <Link
                  to="/homes"
                  className="border border-[#1a1a1a] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
                >
                  {t.svcCityBrowse}
                </Link>
                <Link
                  to="/service-areas"
                  className="px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500 hover:text-[#c9a84c] transition-colors"
                >
                  {t.svcCityBack}
                </Link>
              </div>
            </div>
            <MortgageCalculator
              initialPrice={price}
              variant="sidebar"
              title={t.estPaymentFrom}
              showLinkToFull
              showPreapproval
            />
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default ServiceAreaCity;
