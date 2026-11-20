import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ClosingCTA } from "@/components/ClosingCTA";

export default function Support() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="relative bg-ink">
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-5 pb-16 pt-28 md:px-8">
          <h1 className="font-display text-4xl text-cream md:text-5xl">Support</h1>
        </div>
      </div>
      <main className="mx-auto max-w-3xl px-5 py-12 md:px-8">
        
        <div className="space-y-5 leading-relaxed text-ink/80">
          <p>
            We are here to help you with any questions or concerns regarding our
            services, properties, or your real estate journey.
          </p>
          <h2 className="font-display text-2xl text-ink">Need immediate assistance?</h2>
          <p>
            The fastest way to get in touch is through our{" "}
            <a href="/contact" className="text-gold underline">
              contact page
            </a>
            , where you can direct your inquiry to the right place.
          </p>
          <p>
            Our support team typically responds within 24 hours during regular business
            days.
          </p>
        </div>

      </main>
      <ClosingCTA />
      <SiteFooter />
    </div>
  );
}
