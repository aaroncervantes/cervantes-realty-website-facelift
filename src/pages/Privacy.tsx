import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a] font-sans selection:bg-black selection:text-white flex flex-col">
      <SiteHeader darkTrigger />
      <main className="flex-1 py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="font-serif text-5xl md:text-6xl mb-4 font-medium text-center">
            Privacy Policy
          </h1>
          <p className="text-center text-sm text-gray-500 mb-12">
            Last updated: June 2026
          </p>
          <div className="prose prose-lg mx-auto text-gray-700 font-serif leading-relaxed space-y-6">
            <p>
              At Cervantes Realty, we take your privacy seriously. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website or use our services. Please
              read this privacy policy carefully. If you do not agree with the
              terms of this privacy policy, please do not access the site.
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] !mt-10">
              Information We Collect
            </h2>
            <p>
              We may collect personal identification information from Users in a
              variety of ways, including, but not limited to, when Users visit
              our site, fill out a form, and in connection with other
              activities, services, features, or resources we make available on
              our Site. Users may be asked for, as appropriate, name, email
              address, mailing address, phone number.
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] !mt-10">
              How We Use Collected Information
            </h2>
            <p>
              Cervantes Realty may collect and use Users' personal information
              for the following purposes: to improve customer service, to
              personalize user experience, to improve our Site, and to send
              periodic emails regarding updates or relevant real estate
              opportunities.
            </p>
            <p>
              If you have any questions about this Privacy Policy, the practices
              of this site, or your dealings with this site, please contact us
              through our Contact page.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Privacy;
