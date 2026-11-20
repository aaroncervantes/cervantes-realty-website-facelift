import type { Listing } from "@/data/listings";

/** Uses existing verified listing fields only; no unsupported neighborhood or tax assertions. */
export function PropertyDecisionNotes({ listing }: { listing: Listing }) {
  const notes: { title: string; detail: string }[] = [];
  const d = listing.features.details;
  const e = listing.features.exterior;
  if (d.neighborhood?.trim()) notes.push({ title: "Neighborhood", detail: d.neighborhood });
  if (e.garageSpaces?.trim()) notes.push({ title: "Parking", detail: e.garageSpaces });
  if (e.airConditioning?.trim()) notes.push({ title: "Heating & cooling", detail: e.airConditioning });
  if (d.viewDescription?.trim()) notes.push({ title: "Views", detail: d.viewDescription });
  return (
    <section aria-labelledby="decision-notes-title" className="border-y border-gray-200 py-8">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c] mb-2">Buyer perspective</p>
      <h2 id="decision-notes-title" className="font-serif text-2xl mb-3">What to know about this home</h2>
      {notes.length > 0 && <dl className="grid sm:grid-cols-2 gap-5 mb-5">{notes.map((note) => <div key={note.title}><dt className="text-xs uppercase tracking-wide text-gray-500">{note.title}</dt><dd className="mt-1 text-sm text-gray-700">{note.detail}</dd></div>)}</dl>}
      <p className="text-sm text-gray-600">Before making an offer, confirm the property's condition, taxes, insurance, HOA or special assessments (if applicable), and any available disclosures. These items require property-specific verification.</p>
    </section>
  );
}
