import { Button } from "@/components/ui/button";

const BUY = "https://form.typeform.com/to/MYDWRuKV?typeform-source=cervantesestates.com#new-menu-item";
const SELL = "https://form.typeform.com/to/AJGF8W1h?typeform-source=cervantesestates.com#about";

export function ClosingCTA() {
  return (
    <section className="bg-ink-soft px-5 py-20 text-center text-cream md:px-8">
      <h2 className="font-display text-3xl md:text-5xl">Ready when you are.</h2>
      <p className="mx-auto mt-4 max-w-xl text-cream/70">
        Whether you are buying or selling, Cervantes Realty brings strategy,
        speed, and a digital-first experience.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="gold" size="lg">
          <a href={BUY} target="_blank" rel="noreferrer">
            I Want to Buy
          </a>
        </Button>
        <Button asChild variant="outline" size="lg" className="border-cream/40 text-cream hover:bg-cream/10">
          <a href={SELL} target="_blank" rel="noreferrer">
            I Want to Sell
          </a>
        </Button>
      </div>
    </section>
  );
}
