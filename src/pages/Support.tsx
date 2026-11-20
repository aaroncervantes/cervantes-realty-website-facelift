import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const Support = () => {
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a] font-sans selection:bg-black selection:text-white flex flex-col">
      <SiteHeader darkTrigger />
      <main className="flex-1 py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-8 font-medium">
            Support
          </h1>
          <p className="text-lg text-gray-600 font-serif italic mb-12 max-w-2xl mx-auto">
            We are here to help you with any questions or concerns you may have
            regarding our services, properties, or your real estate journey.
          </p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 md:p-14 text-left">
            <h2 className="font-serif text-2xl font-bold mb-4">
              Need immediate assistance?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              The fastest way to get in touch with our team is through our
              contact page, where you can direct your inquiry to the right
              department.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#1a1a1a] text-white px-8 py-4 text-sm font-semibold hover:bg-[#c9a84c] transition-colors uppercase tracking-wider rounded"
            >
              Go to Contact Page
            </a>
            <p className="text-sm text-gray-500 mt-8">
              Our support team typically responds within 24 hours during regular
              business days.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Support;
