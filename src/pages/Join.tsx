import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const Join = () => {
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a] font-sans selection:bg-black selection:text-white flex flex-col">
      <SiteHeader darkTrigger />
      <main className="flex-1 py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-8 font-medium">
            Join Our Team
          </h1>
          <p className="text-lg text-gray-600 font-serif italic mb-10 max-w-2xl mx-auto leading-relaxed">
            We're always looking for driven, passionate individuals to join
            Cervantes Realty. If you're dedicated to excellence and want to grow
            your career in luxury real estate, we'd love to hear from you.
          </p>
          <div className="grid sm:grid-cols-2 gap-5 mb-10 text-left"><div className="border border-gray-200 bg-white p-6"><h2 className="font-serif text-2xl mb-3">A. Independent Brand Agent</h2><p className="text-sm text-gray-600">Develop your own social media presence, lead generation and professional identity with shared team support.</p></div><div className="border border-gray-200 bg-white p-6"><h2 className="font-serif text-2xl mb-3">B. SoCal’s New Homes Agent</h2><p className="text-sm text-gray-600">Participate in the team’s SoCal’s New Homes marketing platform and assigned lead opportunities.</p></div></div>
          <p className="text-gray-600 mb-10">
            Reach out to us to explore current opportunities and see how you can
            become part of our dream team.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#1a1a1a] text-white px-8 py-4 text-sm font-semibold hover:bg-[#c9a84c] transition-colors uppercase tracking-wider rounded"
          >
            Contact Us to Apply
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Join;
