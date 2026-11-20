import { AnimatedNumber } from "@/components/AnimatedNumber";
import { Reveal } from "@/components/Reveal";

const reviews = [
  {
    quote:
      "He negotiated $130k OVER asking price with their strategy and I had to cover NO closing costs. Insane.",
    name: "Leo A.",
    when: "1 month ago",
  },
  {
    quote: "Responded within minutes, day or night. Truly client-first experience.",
    name: "Araceli T.",
    when: "6 mos ago",
  },
  {
    quote: "Sold our home in 6 days above asking. Aaron knows exactly what buyers want.",
    name: "Michael S.",
    when: "8 mos ago",
  },
];

export function CompetitiveEdge() {
  return (
    <section className="bg-ink px-5 py-20 text-cream md:px-8">
      <Reveal>
        <h2 className="text-center font-display text-3xl md:text-5xl">
          Here's What Puts Our Clients Ahead.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-cream/65">
          Experience, local knowledge, a clear process, and the right connections —
          every advantage working for you.
        </p>
      </Reveal>
      <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
        <Reveal>
          <div className="border border-cream/10 p-8">
            <p className="font-display text-5xl text-gold">
              <AnimatedNumber value={1} suffix="+" />
            </p>
            <p className="mt-2 text-sm uppercase tracking-widest text-cream/60">
              Families Served — Year one
            </p>
            <p className="mt-6 text-cream/80">
              Built-In Dream Team: Lender · Inspector · Trans. Coord. · Escrow ·
              Buyer's Agent · Contractor
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div className="border border-cream/10 p-8">
            <p className="text-sm uppercase tracking-widest text-gold">
              Google Reviews 5.0
            </p>
            <ul className="mt-5 space-y-5">
              {reviews.map((r) => (
                <li key={r.name}>
                  <p className="text-sm text-cream/85">"{r.quote}"</p>
                  <p className="mt-1 text-xs text-cream/50">
                    {r.name} · {r.when}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
