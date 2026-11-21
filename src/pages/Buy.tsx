import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { buyTypeform } from "@/lib/typeform";
import { REPLY_HOURS } from "@/lib/site";
import { usePageTitle } from "@/hooks/use-page-title";
import { useLang } from "@/lib/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const STEPS = [
  {
    n: "01",
    title: "Get pre-approved",
    body: "A real letter beats a guess. We connect you with lenders who close on time.",
  },
  {
    n: "02",
    title: "Know the full monthly",
    body: "Use our calculator for P&I, then layer taxes, insurance, and HOA.",
  },
  {
    n: "03",
    title: "Tour the right homes",
    body: "Enclosed resales you can write on — plus browse-only new construction context.",
  },
  {
    n: "04",
    title: "Offer with strategy",
    body: "Price, contingencies, timing — competitive without reckless overpaying.",
  },
  {
    n: "05",
    title: "Escrow to keys",
    body: "Inspection, appraisal, contingencies, walkthrough — you’re never guessing the day.",
  },
];

const FAQS = [
  {
    q: "Do I need 20% down?",
    a: "No. FHA can go to 3.5%, many conventional options start at 3–5%. Under 20% usually means PMI — we weigh that against getting into the right home.",
  },
  {
    q: "What’s the supplemental tax surprise?",
    a: "In California, buying often triggers a supplemental tax bill based on the new assessed value. We flag it before you’re shocked at the mailbox.",
  },
  {
    q: "Should I wait for rates to drop?",
    a: "Buyers who are ready often lock when the home is right and refinance later. Timing the bottom costs more people than rate noise.",
  },
  {
    q: "Pre-qualification vs pre-approval?",
    a: "Pre-qual is a napkin estimate. Pre-approval is verified. SoCal sellers ignore napkin math.",
  },
  {
    q: "Can I buy with imperfect credit?",
    a: "Often yes — product depends on score and story. We route you to lenders who actually close those files.",
  },
];

const Buy = () => {
  usePageTitle("Buy guide");
  const { t } = useLang();
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <SiteHeader />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
            {t.buyEyebrow}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl mb-4">
            {t.buyTitle}
          </h1>
          <p className="text-gray-600 text-lg mb-4 leading-relaxed">
            {t.buyLead}
          </p>
          <p className="text-sm text-gray-500 mb-12">
            {t.reply} {REPLY_HOURS} {t.hours}.
          </p>
          <ol className="space-y-10 mb-16">
            {STEPS.map((step) => (
              <li key={step.n} className="flex gap-6">
                <span className="text-[#c9a84c] font-bold text-sm tracking-widest shrink-0">
                  {step.n}
                </span>
                <div>
                  <h2 className="font-serif text-2xl mb-2">{step.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="font-serif text-3xl mb-6">Buyer FAQ</h2>
          <Accordion type="single" collapsible className="mb-16 border-t border-gray-200">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`q-${i}`}>
                <AccordionTrigger className="text-left font-serif text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href={buyTypeform("buy")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a1a1a] text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider text-center hover:bg-[#c9a84c] transition-colors"
            >
              Start a buy conversation
            </a>
            <Link
              to="/calculator"
              className="border border-[#1a1a1a] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-center hover:border-[#c9a84c] transition-colors"
            >
              Run the calculator
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Prefer to browse?{" "}
            <Link to="/homes" className="underline hover:text-[#c9a84c]">
              Homes
            </Link>{" "}
            ·{" "}
            <Link to="/new-homes" className="underline hover:text-[#c9a84c]">
              New homes
            </Link>{" "}
            ·{" "}
            <Link to="/compare" className="underline hover:text-[#c9a84c]">
              New vs resale
            </Link>{" "}
            ·{" "}
            <Link to="/rent-vs-buy" className="underline hover:text-[#c9a84c]">
              Rent vs buy
            </Link>{" "}
            ·{" "}
            <Link to="/markets" className="underline hover:text-[#c9a84c]">
              Markets
            </Link>
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default Buy;
