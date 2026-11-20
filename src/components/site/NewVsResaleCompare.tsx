import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  DEFAULT_DOWN_PERCENT,
  DEFAULT_RATE,
  DEFAULT_TERM_YEARS,
  calcMortgage,
  formatCurrency,
} from "@/lib/mortgage";
import { CollaborationMark } from "@/components/site/CollaborationMark";

const ROWS: {
  label: string;
  resale: string;
  neu: string;
}[] = [
  {
    label: "Purchase price",
    resale: "Often negotiable against comps and condition",
    neu: "Usually set by builder phases; incentives may shift effective price",
  },
  {
    label: "HOA",
    resale: "Varies — many detached homes have none",
    neu: "Common on tracts/townhomes — bake into monthly early",
  },
  {
    label: "Mello-Roos / CFD",
    resale: "Less common on older stock; still verify",
    neu: "Frequent on new communities — can material change payment",
  },
  {
    label: "Property taxes",
    resale: "Based on assessed value; supplemental after purchase",
    neu: "New assessment + possible special taxes — model both",
  },
  {
    label: "Maintenance",
    resale: "Age of roof, HVAC, plumbing drives near-term spend",
    neu: "Newer systems; landscaping/HOA rules still matter",
  },
  {
    label: "Warranties",
    resale: "As-is after inspection credits",
    neu: "Builder warranties often cover structure/systems early years",
  },
  {
    label: "Incentives",
    resale: "Seller credits / rate buydowns in negotiation",
    neu: "Builder rate buydowns, closing costs, upgrades — when verified",
  },
  {
    label: "Neighborhood feel",
    resale: "Established trees, street character, known neighbors",
    neu: "New streetscape; amenity package depends on community",
  },
  {
    label: "Negotiation",
    resale: "Price, repairs, timing, contingencies",
    neu: "Upgrades, lot premiums, closing credits more than list cuts",
  },
];

export function NewVsResaleCompare() {
  const [resalePrice, setResalePrice] = useState(730000);
  const [newPrice, setNewPrice] = useState(589000);

  const resalePay = useMemo(
    () =>
      calcMortgage({
        price: resalePrice,
        downPayment: (resalePrice * DEFAULT_DOWN_PERCENT) / 100,
        ratePercent: DEFAULT_RATE,
        termYears: DEFAULT_TERM_YEARS,
      }).monthlyPI,
    [resalePrice],
  );
  const newPay = useMemo(
    () =>
      calcMortgage({
        price: newPrice,
        downPayment: (newPrice * DEFAULT_DOWN_PERCENT) / 100,
        ratePercent: DEFAULT_RATE,
        termYears: DEFAULT_TERM_YEARS,
      }).monthlyPI,
    [newPrice],
  );

  return (
    <section className="py-4">
      <CollaborationMark className="mb-6" />
      <h2 className="font-serif text-3xl md:text-4xl mb-3 text-[#1a1a1a]">
        New construction vs. resale
      </h2>
      <p className="text-gray-600 max-w-2xl mb-10 leading-relaxed">
        An editorial comparison — not a quiz. Adjust sample prices to see
        payment shape using the same mortgage math we use sitewide (
        {DEFAULT_DOWN_PERCENT}% down · {DEFAULT_RATE}% · {DEFAULT_TERM_YEARS}
        -yr). HOA and Mello-Roos are separate.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <label className="block border border-gray-200 bg-white p-6">
          <span className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold">
            Sample resale price
          </span>
          <input
            type="range"
            min={350000}
            max={1500000}
            step={5000}
            value={resalePrice}
            onChange={(e) => setResalePrice(Number(e.target.value))}
            className="mt-4 w-full accent-[#c9a84c]"
          />
          <p className="mt-2 font-serif text-2xl">{formatCurrency(resalePrice)}</p>
          <p className="text-sm text-gray-500">
            Est. P&amp;I {formatCurrency(resalePay)}/mo
          </p>
        </label>
        <label className="block border border-gray-200 bg-white p-6">
          <span className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold">
            Sample new-construction from-price
          </span>
          <input
            type="range"
            min={350000}
            max={1500000}
            step={5000}
            value={newPrice}
            onChange={(e) => setNewPrice(Number(e.target.value))}
            className="mt-4 w-full accent-[#c9a84c]"
          />
          <p className="mt-2 font-serif text-2xl">{formatCurrency(newPrice)}</p>
          <p className="text-sm text-gray-500">
            Est. P&amp;I {formatCurrency(newPay)}/mo
          </p>
        </label>
      </div>

      <div className="overflow-x-auto border-t border-gray-200">
        <table className="w-full text-left text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-4 pr-4 font-serif text-lg font-medium w-[22%]">
                Topic
              </th>
              <th className="py-4 px-4 font-serif text-lg font-medium">
                Resale · Cervantes
              </th>
              <th className="py-4 pl-4 font-serif text-lg font-medium">
                New · SoCal’s New Homes lens
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label} className="border-b border-gray-100 align-top">
                <td className="py-5 pr-4 text-[11px] uppercase tracking-wider text-[#c9a84c] font-bold">
                  {row.label}
                </td>
                <td className="py-5 px-4 text-gray-700 leading-relaxed">
                  {row.resale}
                </td>
                <td className="py-5 pl-4 text-gray-700 leading-relaxed">
                  {row.neu}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-8 text-sm text-gray-500 max-w-2xl">
        Showcase new homes stay browse-only — this tool educates; it doesn’t take
        inquiries on builder communities.{" "}
        <Link to="/buy" className="underline hover:text-[#c9a84c]">
          Continue with the buy guide
        </Link>{" "}
        or{" "}
        <Link to="/new-homes" className="underline hover:text-[#c9a84c]">
          browse the showcase
        </Link>
        .
      </p>
    </section>
  );
}
