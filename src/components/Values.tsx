import { Reveal } from "@/components/Reveal";

const values = [
  { title: "AI Systems", body: "Fresh, creative results." },
  { title: "Integrity", body: "Honesty and transparency." },
  { title: "Excellence", body: "Top-notch services." },
];

export function Values() {
  return (
    <section className="bg-white/50 px-5 py-16 md:px-8">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        {values.map((v) => (
          <Reveal key={v.title}>
            <div className="text-center">
              <h3 className="font-display text-2xl text-gold">{v.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{v.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
