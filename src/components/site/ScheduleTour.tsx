import { useState } from "react";
import { Calendar, CheckCircle } from "lucide-react";

export function ScheduleTour({ address }: { address: string }) {
  const [date, setDate] = useState("Aug 27");
  const [time, setTime] = useState("10:00 AM");
  const [mode, setMode] = useState("In Person");
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#1a1a1a] text-white p-6 rounded-2xl shadow-xl">
      <h3 className="font-serif text-2xl font-bold text-center mb-1">
        Request a Tour
      </h3>
      <p className="text-xs text-gray-400 text-center mb-6">
        Select your preferred date & time to tour {address}.
      </p>

      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        {["Aug 27", "Aug 28", "Aug 29"].map((d) => (
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
          Select Time
        </label>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-xs text-white focus:border-[#c9a84c] outline-none"
        >
          {["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"].map(
            (t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ),
          )}
        </select>
      </div>

      <div className="flex gap-2 mb-6">
        {["In Person", "Via Video Chat"].map((m) => (
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

      {submitted ? (
        <div className="bg-green-900/40 border border-green-500/50 p-4 rounded-xl text-center">
          <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <h4 className="font-bold text-sm text-white mb-1">Tour Scheduled!</h4>
          <p className="text-xs text-green-200">
            Aaron Cervantes will reach out to confirm your tour for {date} at{" "}
            {time}.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-xs text-white placeholder:text-gray-500 focus:border-[#c9a84c] outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-xs text-white placeholder:text-gray-500 focus:border-[#c9a84c] outline-none"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
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
          <button
            type="submit"
            className="w-full bg-[#c9a84c] text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg"
          >
            Schedule Tour
          </button>
        </form>
      )}
    </div>
  );
}
