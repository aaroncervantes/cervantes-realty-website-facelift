import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CollaborationMark } from "@/components/site/CollaborationMark";
import { usePageTitle } from "@/hooks/use-page-title";
import { useLang } from "@/lib/i18n";

const Join = () => {
  usePageTitle("Join Our Team");
  const { t, lang } = useLang();

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a] font-sans selection:bg-black selection:text-white flex flex-col">
      <SiteHeader darkTrigger />
      <main className="flex-1 py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl md:text-6xl mb-6 font-medium">
              {t.joinTitle}
            </h1>
            <p className="text-lg text-gray-600 font-serif italic max-w-2xl mx-auto leading-relaxed">
              {lang === "es"
                ? "Dos caminos claros. Sin híbridos. Excelencia, infraestructura compartida, y una colaboración exclusiva con SoCal’s New Homes."
                : "Two clear paths. No hybrids. Excellence, shared infrastructure, and an exclusive collaboration with SoCal’s New Homes."}
            </p>
          </div>

          <CollaborationMark className="text-center mb-14" />

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="border border-gray-200 bg-white p-8 md:p-10 animate-[cr-fadeup_0.7s_ease-out_both]">
              <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-3">
                Option A
              </p>
              <h2 className="font-serif text-2xl md:text-3xl mb-4">
                Independent Brand Agent
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Join Cervantes Realty while building and operating your own
                social platforms and book of business. You keep your brand voice;
                you gain team support and shared infrastructure.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                <li>Operate your own social media and personal brand</li>
                <li>Generate and own your pipeline</li>
                <li>Access team systems, culture, and backup</li>
              </ul>
            </div>
            <div className="border border-gray-200 bg-white p-8 md:p-10 animate-[cr-fadeup_0.7s_ease-out_both]" style={{ animationDelay: "0.08s" }}>
              <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-3">
                Option B
              </p>
              <h2 className="font-serif text-2xl md:text-3xl mb-4">
                SoCal’s New Homes Agent
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Join Cervantes Realty and participate in the SoCal’s New Homes
                marketing platform — centralized marketing and potential assigned
                lead opportunities through that collaboration.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                <li>Participate in SoCal’s New Homes marketing</li>
                <li>Centralized campaigns and brand presence</li>
                <li>Potential assigned opportunities via the platform</li>
              </ul>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mb-10 max-w-2xl mx-auto">
            There is no hybrid path. We don’t advertise guaranteed leads, income,
            or unapproved commission splits — conversations stay honest.
          </p>

          <div className="text-center">
            <Link
              to="/contact"
              className="inline-block bg-[#1a1a1a] text-white px-8 py-4 text-sm font-semibold hover:bg-[#c9a84c] transition-colors uppercase tracking-wider"
            >
              {lang === "es" ? "Hablar con nosotros" : "Contact us to apply"}
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Join;
