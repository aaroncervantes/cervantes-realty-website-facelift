import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a] font-sans selection:bg-black selection:text-white flex flex-col">
      <SiteHeader darkTrigger />
      <main className="flex-1 py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="font-serif text-5xl md:text-6xl mb-4 font-medium text-center">
            Terms of Service
          </h1>
          <p className="text-center text-sm text-gray-500 mb-12">
            Last updated: June 2026
          </p>
          <div className="prose prose-lg mx-auto text-gray-700 font-serif leading-relaxed space-y-6">
            <p>
              Welcome to Cervantes Realty. These Terms of Service ("Terms")
              govern your access to and use of the Cervantes Realty website,
              services, and applications (collectively, the "Services"). By
              accessing or using our Services, you agree to be bound by these
              Terms.
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] !mt-10">
              1. Acceptance of Terms
            </h2>
            <p>
              By using our Services, you agree to these Terms. If you do not
              agree to these Terms, do not use the Services. We may update these
              Terms from time to time, and your continued use of the Services
              constitutes acceptance of those changes.
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] !mt-10">
              2. Description of Services
            </h2>
            <p>
              Cervantes Realty provides real estate brokerage services,
              including but not limited to property listings, real estate market
              information, and related concierge services. Our Services are
              intended to assist users in buying, selling, and managing real
              estate properties.
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] !mt-10">
              3. User Conduct
            </h2>
            <p>
              You agree to use the Services only for lawful purposes. You must
              not use the Services to transmit any material that is illegal,
              defamatory, offensive, or otherwise objectionable. You agree not
              to attempt to gain unauthorized access to any portion of the
              Services or any systems or networks connected to the Services.
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] !mt-10">
              4. Intellectual Property
            </h2>
            <p>
              All content, trademarks, service marks, logos, and intellectual
              property displayed on the Services are the property of Cervantes
              Realty or their respective owners. You may not use, reproduce, or
              distribute any content from the Services without our prior written
              consent.
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] !mt-10">
              5. Disclaimer of Warranties
            </h2>
            <p>
              The Services are provided on an "as-is" and "as available" basis.
              Cervantes Realty makes no representations or warranties of any
              kind, express or implied, as to the operation of the Services or
              the information, content, or materials included therein.
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] !mt-10">
              6. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Cervantes Realty shall not
              be liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of or related to your use of the
              Services.
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] !mt-10">
              7. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the State of California, without regard to its
              conflict of law principles.
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] !mt-10">
              8. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms, please contact us
              through our Contact page.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Terms;
