import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ClosingCTA } from "@/components/ClosingCTA";

export default function Join() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="relative bg-ink">
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-5 pb-16 pt-28 md:px-8">
          <h1 className="font-display text-4xl text-cream md:text-5xl">Join Our Team</h1>
        </div>
      </div>
      <main className="mx-auto max-w-3xl px-5 py-12 md:px-8">
        
        <div className="space-y-5 leading-relaxed text-ink/80">
          <p>
            We're always looking for driven, passionate individuals to join Cervantes
            Realty. If you're dedicated to excellence and want to grow your career in
            luxury real estate, we'd love to hear from you.
          </p>
          <p>
            Reach out through our{" "}
            <a href="/contact" className="text-gold underline">
              contact page
            </a>{" "}
            to explore current opportunities.
          </p>
        </div>

      </main>
      <ClosingCTA />
      <SiteFooter />
    </div>
  );
}
