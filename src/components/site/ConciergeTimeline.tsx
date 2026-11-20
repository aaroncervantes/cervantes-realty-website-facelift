const STAGES = [
  {
    n: "01",
    title: "Consultation & Valuation",
    body: "We walk your goals, pull live comps, and build a pricing strategy for your block — not a Zestimate guess.",
  },
  {
    n: "02",
    title: "Property Preparation",
    body: "Staging guidance, repairs worth doing, and a prep plan so launch day looks intentional — Concierge coordinates the hassle.",
  },
  {
    n: "03",
    title: "Marketing Launch",
    body: "Photography, story-driven copy, and distribution that reaches the right buyer pools — MLS plus our channels.",
  },
  {
    n: "04",
    title: "Offers & Negotiation",
    body: "We read terms as carefully as price. Highest isn’t always best — we protect your net and your timeline.",
  },
  {
    n: "05",
    title: "Escrow & Due Diligence",
    body: "Inspections, appraisal, disclosures, and clear updates so you’re never guessing what day of escrow you’re on.",
  },
  {
    n: "06",
    title: "Closing & Transition",
    body: "Final walkthrough, signing, funding, and keys — then a clean handoff so you can move forward.",
  },
];

export function ConciergeTimeline() {
  return (
    <div className="relative">
      <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-3">
        Cervantes Concierge
      </p>
      <h2 className="font-serif text-3xl md:text-4xl mb-3">Selling timeline</h2>
      <p className="text-gray-600 mb-12 max-w-xl leading-relaxed">
        What we handle at each stage — so the transaction feels managed, not
        mysterious. Timelines vary by market and condition; we won’t promise
        speed we can’t control.
      </p>
      <ol className="relative space-y-0">
        {STAGES.map((stage, i) => (
          <li
            key={stage.n}
            className="relative flex gap-6 md:gap-10 pb-12 last:pb-0 animate-[cr-fadeup_0.7s_ease-out_both]"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            {i < STAGES.length - 1 && (
              <span
                className="absolute left-[15px] md:left-[19px] top-10 bottom-0 w-px bg-[#c9a84c]/35"
                aria-hidden
              />
            )}
            <span className="relative z-10 flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full border border-[#c9a84c] bg-[#f7f5f2] text-[10px] font-bold text-[#c9a84c]">
              {stage.n}
            </span>
            <div className="pt-1">
              <h3 className="font-serif text-xl md:text-2xl mb-2">
                {stage.title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-xl">
                {stage.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
