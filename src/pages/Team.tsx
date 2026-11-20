import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Values } from "@/components/Values";
import { ClosingCTA } from "@/components/ClosingCTA";
import { team } from "@/data/team";

export default function Team() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-ink">
        <SiteHeader />
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-28 md:px-8">
          <h1 className="font-display text-4xl text-cream md:text-5xl">Our Team</h1>
          <p className="mt-3 max-w-xl text-cream/70">
            Dedicated professionals committed to finding your perfect home in the world.
          </p>
        </div>
      </div>
      <main className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-3 md:px-8">
        {team.map((m) => (
          <article key={m.name} className="bg-white/40">
            <img src={m.image} alt={m.name} className="aspect-[4/5] w-full object-cover" />
            <div className="p-5">
              <h2 className="font-display text-2xl">{m.name}</h2>
              <p className="text-sm text-gold">{m.role}</p>
              <p className="mt-3 text-sm text-ink/70">{m.bio}</p>
            </div>
          </article>
        ))}
      </main>
      <Values />
      <ClosingCTA />
      <SiteFooter />
    </div>
  );
}
