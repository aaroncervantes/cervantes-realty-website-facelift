import type { Listing } from "@/data/listings";
import { buildDecisionNotes } from "@/lib/decisionNotes";
import { Reveal } from "@/components/site/Reveal";

export function DecisionNotes({ listing }: { listing: Listing }) {
  const notes = buildDecisionNotes(listing);
  if (!notes.length) return null;

  return (
    <Reveal id="decision-notes" className="scroll-mt-40">
      <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3 text-[#1a1a1a]">
        What to Know About This Home
      </h2>
      <p className="text-sm text-gray-500 mb-8 max-w-2xl">
        Buyer considerations drawn from this listing’s verified fields — not a
        substitute for inspection, title, or a tour.
      </p>
      <dl className="space-y-8 max-w-2xl">
        {notes.map((note) => (
          <div key={note.label} className="border-l border-[#c9a84c]/50 pl-5">
            <dt className="text-[11px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
              {note.label}
            </dt>
            <dd className="text-gray-700 leading-relaxed">{note.body}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
