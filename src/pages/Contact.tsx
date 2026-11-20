import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ClosingCTA } from "@/components/ClosingCTA";

export default function Contact() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="relative bg-ink">
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-5 pb-16 pt-28 md:px-8">
          <h1 className="font-display text-4xl text-cream md:text-5xl">Contact Us</h1>
        </div>
      </div>
      <main className="mx-auto max-w-3xl px-5 py-12 md:px-8">
        
        <p className="text-ink/70">So we can best help, click which best applies to you.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <a
            href="https://form.typeform.com/to/MYDWRuKV?typeform-source=cervantesestates.com#new-menu-item"
            target="_blank"
            rel="noreferrer"
            className="block border border-ink/10 bg-white/50 p-6 transition hover:border-gold"
          >
            <h2 className="font-display text-2xl">I Want to Buy</h2>
            <p className="mt-2 text-sm text-ink/65">
              Start your journey to finding the perfect home with our expert guidance.
            </p>
          </a>
          <a
            href="https://form.typeform.com/to/AJGF8W1h?typeform-source=cervantesestates.com#about"
            target="_blank"
            rel="noreferrer"
            className="block border border-ink/10 bg-white/50 p-6 transition hover:border-gold"
          >
            <h2 className="font-display text-2xl">I Want to Sell</h2>
            <p className="mt-2 text-sm text-ink/65">
              Maximize your property's value with our proven marketing strategies.
            </p>
          </a>
        </div>

      </main>
      <ClosingCTA />
      <SiteFooter />
    </div>
  );
}
