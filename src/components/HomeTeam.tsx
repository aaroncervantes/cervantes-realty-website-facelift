import { Link } from "react-router-dom";
import { team } from "@/data/team";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

export function HomeTeam() {
  const aaron = team[0];
  return (
    <section className="px-5 py-20 md:px-8">
      <Reveal>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:items-start">
          <img
            src={aaron.image}
            alt={aaron.name}
            className="h-72 w-full max-w-sm object-cover md:h-96"
          />
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gold">
              Meet the founder
            </p>
            <h2 className="mt-2 font-display text-4xl">{aaron.name}</h2>
            <p className="mt-1 text-ink/60">{aaron.role}</p>
            <p className="mt-5 max-w-md text-ink/75">{aaron.bio}</p>
            <p className="mt-4 text-sm text-ink/50">
              1.2k Followers — across platforms
            </p>
            <Button asChild className="mt-6" variant="outline">
              <Link to="/team">Meet the team</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
