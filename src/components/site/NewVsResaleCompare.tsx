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
import { useLang, fill } from "@/lib/i18n";

export function NewVsResaleCompare() {
  const { t } = useLang();
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
        {t.compareTitle}
      </h2>
      <p className="text-gray-600 max-w-2xl mb-10 leading-relaxed">
        {fill(t.compareLead, {
          down: DEFAULT_DOWN_PERCENT,
          rate: DEFAULT_RATE,
          term: DEFAULT_TERM_YEARS,
        })}
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <label className="block border border-gray-200 bg-white p-6">
          <span className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold">
            {t.sampleResalePrice}
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
            {t.estPI} {formatCurrency(resalePay)}
            {t.perMonth}
          </p>
        </label>
        <label className="block border border-gray-200 bg-white p-6">
          <span className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold">
            {t.sampleNewPrice}
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
            {t.estPI} {formatCurrency(newPay)}
            {t.perMonth}
          </p>
        </label>
      </div>

      <div className="overflow-x-auto border-t border-gray-200">
        <table className="w-full text-left text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-4 pr-4 font-serif text-lg font-medium w-[22%]">
                {t.compareTopic}
              </th>
              <th className="py-4 px-4 font-serif text-lg font-medium">
                {t.compareResaleCol}
              </th>
              <th className="py-4 pl-4 font-serif text-lg font-medium">
                {t.compareNewCol}
              </th>
            </tr>
          </thead>
          <tbody>
            {t.compareRows.map((row) => (
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
        {t.compareFoot}{" "}
        <Link to="/buy" className="underline hover:text-[#c9a84c]">
          {t.compareBuyGuide}
        </Link>{" "}
        or{" "}
        <Link to="/new-homes" className="underline hover:text-[#c9a84c]">
          {t.compareBrowseShowcase}
        </Link>
        .
      </p>
    </section>
  );
}
