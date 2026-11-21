import { useMemo, useState } from "react";
import { Calendar } from "lucide-react";
import { AGENT_EMAIL, AGENT_PHONE_DISPLAY, smsLink } from "@/lib/site";
import { buyTypeform } from "@/lib/typeform";

const DATES = ["This week", "This weekend", "Next week"] as const;
const TIMES = ["Morning", "Afternoon", "Evening"] as const;
const MODES = ["In person", "Video"] as const;

export function ScheduleTour({ address }: { address: string }) {
  const [date, setDate] = useState<(typeof DATES)[number]>("This week");
  const [time, setTime] = useState<(typeof TIMES)[number]>("Morning");
  const [mode, setMode] = useState<(typeof MODES)[number]>("In person");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const message = useMemo(() => {
    const bits = [
      `Hi Aaron — tour request for ${address}.`,
      `Window: ${date}, ${time}, ${mode}.`,
      name ? `Name: ${name}.` : "",
      email ? `Email: ${email}.` : "",
      phone ? `Phone: ${phone}.` : "",
      notes ? `Notes: ${notes}` : "",
    ].filter(Boolean);
    return bits.join(" ");
  }, [address, date, time, mode, name, email, phone, notes]);

  const mailHref = `mailto:${AGENT_EMAIL}?subject=${encodeURIComponent(
    `Tour request — ${address}`,
  )}&body=${encodeURIComponent(message)}`;

  return (
    <div className="bg-[#1a1a1a] text-white p-6 rounded-2xl shadow-xl">
      <h3 className="font-serif text-2xl font-bold text-center mb-1">
        Request a Tour
      </h3>
      <p className="text-xs text-gray-400 text-center mb-6">
        Pick a window — we’ll confirm by text or email. No fake “booked”
        screen.
      </p>

      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        {DATES.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDate(d)}
            className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
              date === d
                ? "bg-[#c9a84c] border-[#c9a84c] text-white shadow-md"
                : "border-gray-700 bg-black/40 text-gray-300 hover:border-gray-500"
            }`}
          >
            <Calendar className="w-3.5 h-3.5 mx-auto mb-1 opacity-80" />
            {d}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
          Time of day
        </label>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value as (typeof TIMES)[number])}
          className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-xs text-white focus:border-[#c9a84c] outline-none"
        >
          {TIMES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 mb-6">
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`flex-1 py-2 text-[11px] font-semibold rounded-lg border transition-colors ${
              mode === m
                ? "bg-white text-black border-white"
                : "border-gray-700 text-gray-400 hover:border-gray-500"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="space-y-3 mb-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-xs text-white placeholder:text-gray-500 focus:border-[#c9a84c] outline-none"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-xs text-white placeholder:text-gray-500 focus:border-[#c9a84c] outline-none"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-xs text-white placeholder:text-gray-500 focus:border-[#c9a84c] outline-none"
        />
        <textarea
          placeholder="Special requests or questions..."
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-xs text-white placeholder:text-gray-500 focus:border-[#c9a84c] outline-none resize-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <a
          href={smsLink(message)}
          className="w-full bg-[#c9a84c] text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg text-center"
        >
          Text {AGENT_PHONE_DISPLAY}
        </a>
        <a
          href={mailHref}
          className="w-full border border-gray-600 text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider hover:border-[#c9a84c] transition-colors text-center"
        >
          Email request
        </a>
        <a
          href={buyTypeform("listing")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-[11px] text-gray-400 hover:text-[#c9a84c] pt-1"
        >
          Or continue in the buy form →
        </a>
      </div>
    </div>
  );
}
