import { Button } from "@/components/ui/button";

const BUY = "https://form.typeform.com/to/MYDWRuKV?typeform-source=cervantesestates.com#new-menu-item";

export function ScheduleTour() {
  return (
    <div className="border border-ink/10 bg-white/60 p-6">
      <h3 className="font-display text-2xl">Schedule a tour</h3>
      <p className="mt-2 text-sm text-ink/65">
        Tell us what you are looking for and we will coordinate showings.
      </p>
      <Button asChild className="mt-5" variant="gold">
        <a href={BUY} target="_blank" rel="noreferrer">
          Start with Buy intake
        </a>
      </Button>
    </div>
  );
}
