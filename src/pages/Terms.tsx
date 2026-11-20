import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ClosingCTA } from "@/components/ClosingCTA";

export default function Terms() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="relative bg-ink">
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-5 pb-16 pt-28 md:px-8">
          <h1 className="font-display text-4xl text-cream md:text-5xl">Terms of Service</h1>
        </div>
      </div>
      <main className="mx-auto max-w-3xl px-5 py-12 md:px-8">
        
        <p className="text-sm text-ink/50">Last updated: June 2026</p>
        <div className="mt-6 space-y-5 leading-relaxed text-ink/80">
          <p>
            Welcome to Cervantes Realty. These Terms of Service govern your access to and
            use of the Cervantes Realty website and services. By accessing or using our
            Services, you agree to be bound by these Terms.
          </p>
          <h2 className="font-display text-2xl text-ink">1. Acceptance of Terms</h2>
          <p>
            By using our Services, you agree to these Terms. If you do not agree, do not
            use the Services.
          </p>
          <h2 className="font-display text-2xl text-ink">2. Description of Services</h2>
          <p>
            Cervantes Realty provides real estate brokerage services including property
            listings, market information, and related concierge services.
          </p>
          <h2 className="font-display text-2xl text-ink">3. User Conduct</h2>
          <p>
            You agree to use the Services only for lawful purposes and not to attempt
            unauthorized access to any systems connected to the Services.
          </p>
          <h2 className="font-display text-2xl text-ink">4. Intellectual Property</h2>
          <p>
            All content and trademarks on the Services are the property of Cervantes Realty
            or their respective owners.
          </p>
          <h2 className="font-display text-2xl text-ink">5. Disclaimer / Liability</h2>
          <p>
            Services are provided as-is. To the fullest extent permitted by law, Cervantes
            Realty shall not be liable for indirect or consequential damages arising from
            your use of the Services.
          </p>
          <h2 className="font-display text-2xl text-ink">6. Governing Law</h2>
          <p>These Terms are governed by the laws of the State of California.</p>
        </div>

      </main>
      <ClosingCTA />
      <SiteFooter />
    </div>
  );
}
