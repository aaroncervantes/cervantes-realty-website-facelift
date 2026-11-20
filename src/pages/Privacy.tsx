import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ClosingCTA } from "@/components/ClosingCTA";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="relative bg-ink">
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-5 pb-16 pt-28 md:px-8">
          <h1 className="font-display text-4xl text-cream md:text-5xl">Privacy Policy</h1>
        </div>
      </div>
      <main className="mx-auto max-w-3xl px-5 py-12 md:px-8">
        
        <p className="text-sm text-ink/50">Last updated: June 2026</p>
        <div className="mt-6 space-y-5 leading-relaxed text-ink/80">
          <p>
            At Cervantes Realty, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when
            you visit our website or use our services.
          </p>
          <h2 className="font-display text-2xl text-ink">Information We Collect</h2>
          <p>
            We may collect personal identification information from Users in a variety of
            ways, including when Users visit our site or fill out a form. Users may be
            asked for name, email address, mailing address, and phone number.
          </p>
          <h2 className="font-display text-2xl text-ink">How We Use Collected Information</h2>
          <p>
            Cervantes Realty may use personal information to improve customer service,
            personalize user experience, improve our Site, and send periodic emails
            regarding updates or relevant real estate opportunities.
          </p>
          <h2 className="font-display text-2xl text-ink">Contacting Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us through
            our Contact page.
          </p>
        </div>

      </main>
      <ClosingCTA />
      <SiteFooter />
    </div>
  );
}
