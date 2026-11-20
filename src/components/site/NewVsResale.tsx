import { Link } from "react-router-dom";

/** Editorial comparison only. No property-specific inquiry or invented figures. */
export function NewVsResale() {
  const rows = [
    ["Monthly cost", "Account for HOA dues, special assessments and insurance.", "Account for property taxes, insurance, repairs and any HOA."],
    ["Condition", "Newer systems and potential builder warranties, subject to terms.", "Inspect the home's condition, systems and maintenance history."],
    ["Negotiation", "Ask about verified incentives, upgrades and lender restrictions.", "Compare pricing, contingencies and repair negotiations."],
    ["Location", "Evaluate the developing neighborhood and future phases.", "Evaluate the existing neighborhood and lot characteristics."],
  ];
  return (
    <section aria-labelledby="compare-title" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-3">The Cervantes perspective</p>
        <h2 id="compare-title" className="font-serif text-3xl md:text-4xl mb-3">New construction or resale?</h2>
        <p className="text-sm text-gray-600 max-w-2xl mb-9">Two ways to buy, with different trade-offs. Compare the complete monthly picture, not just the advertised price.</p>
        <div className="overflow-x-auto border-y border-gray-200">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead><tr className="border-b border-gray-200"><th className="py-4 pr-4 font-semibold">Consideration</th><th className="py-4 px-4 font-semibold">New construction</th><th className="py-4 pl-4 font-semibold">Resale</th></tr></thead>
            <tbody>{rows.map(([label, newBuild, resale]) => <tr key={label} className="border-b border-gray-100 last:border-b-0"><th scope="row" className="py-4 pr-4 align-top font-medium">{label}</th><td className="py-4 px-4 align-top text-gray-600">{newBuild}</td><td className="py-4 pl-4 align-top text-gray-600">{resale}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-5">This is general educational guidance. Rates, taxes, HOA dues, insurance, and builder incentives must be verified for each property.</p>
        <div className="flex flex-wrap gap-5 mt-7 text-xs font-bold uppercase tracking-wider"><Link to="/calculator" className="underline underline-offset-4 hover:text-[#c9a84c]">Explore payment estimates</Link><Link to="/homes" className="underline underline-offset-4 hover:text-[#c9a84c]">Browse resale inventory</Link></div>
      </div>
    </section>
  );
}
