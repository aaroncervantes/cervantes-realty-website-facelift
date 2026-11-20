import { useState } from "react";
import { formatCurrency } from "@/lib/mortgage";

const COST_PERCENT = 5.5;

export function SellerNet() {
  const [price, setPrice] = useState(750000);
  const costs = price * (COST_PERCENT / 100);
  const net = Math.max(0, price - costs);

  return (
    <div className="border border-gray-200 bg-white p-8 md:p-10">
      <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
        Rough seller net
      </p>
      <h3 className="font-serif text-2xl md:text-3xl mb-6">
        What might you walk away with?
      </h3>
      <label className="block mb-6">
        <span className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
          Expected list price
        </span>
        <input
          type="range"
          min={300000}
          max={2000000}
          step={5000}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="mt-3 w-full accent-[#c9a84c]"
        />
        <p className="mt-2 text-lg font-semibold">{formatCurrency(price)}</p>
      </label>
      <dl className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-gray-400">
            Est. costs (~{COST_PERCENT}%)
          </dt>
          <dd className="font-semibold mt-0.5">{formatCurrency(costs)}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-gray-400">
            Rough net
          </dt>
          <dd className="font-serif text-2xl font-medium mt-0.5 text-[#1a1a1a]">
            {formatCurrency(net)}
          </dd>
        </div>
      </dl>
      <p className="text-[11px] text-gray-400 leading-relaxed">
        Ballpark only — commissions, concessions, repairs, and prorations vary.
        Concierge runs your real net before you list.
      </p>
    </div>
  );
}
