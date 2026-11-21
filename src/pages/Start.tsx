import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  snhQuestionnaire,
  type SnhSource,
} from "@/lib/site";

const ALLOWED: SnhSource[] = [
  "new-homes",
  "compare",
  "ig",
  "home",
  "listing",
];

/**
 * Clean public short link for Instagram bios / ads.
 * https://cervantesre.com/start → SoCal’s New Homes questionnaire
 * Default source=ig; override with ?source=
 */
export default function Start() {
  const [params] = useSearchParams();
  const raw = (params.get("source") || "ig").toLowerCase();
  const source = (ALLOWED.includes(raw as SnhSource)
    ? raw
    : "ig") as SnhSource;
  const href = snhQuestionnaire(source);

  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center px-6">
      <p className="font-serif text-lg text-[#1a1a1a]">
        Opening SoCal’s New Homes…
        <a href={href} className="block mt-4 text-sm text-[#c9a84c] underline">
          Continue
        </a>
      </p>
    </div>
  );
}
