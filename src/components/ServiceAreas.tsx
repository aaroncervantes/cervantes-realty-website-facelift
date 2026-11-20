import { Reveal } from "@/components/Reveal";

const areas = [
  "Long Beach",
  "Los Angeles",
  "Orange County",
  "Inland Empire",
  "High Desert",
  "Southern California",
];

export function ServiceAreas() {
  return (
    <section className="px-5 py-16 md:px-8">
      <Reveal>
        <h2 className="text-center font-display text-3xl md:text-4xl">
          Service Areas
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-ink/60">
          Local expertise across Southern California.
        </p>
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
          {areas.map((a) => (
            <li
              key={a}
              className="border border-ink/10 bg-white/40 px-4 py-2 text-sm tracking-wide"
            >
              {a}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
