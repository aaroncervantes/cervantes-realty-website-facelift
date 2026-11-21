import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SellerNet } from "@/components/site/SellerNet";
import { ConciergeTimeline } from "@/components/site/ConciergeTimeline";
import { sellTypeform } from "@/lib/typeform";
import { REPLY_HOURS } from "@/lib/site";
import { usePageTitle } from "@/hooks/use-page-title";
import { useLang } from "@/lib/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What if I price too high?",
    a: "Overpricing is the #1 reason homes go stale. We price to the block and the current buyer pool — not hope.",
  },
  {
    q: "How long will it take?",
    a: "Depends on pocket and condition. We give a real day-range from live comps, not a generic promise.",
  },
  {
    q: "Is staging worth it?",
    a: "Often yes on vacant or dated homes. We tell you when a $2k stage beats a $20k price cut.",
  },
  {
    q: "Do I have to be at every showing?",
    a: "No — that’s Concierge. Kick your feet up; we run the process and keep you updated.",
  },
];

const Sell = () => {
  usePageTitle("Sell with Concierge");
  const { t } = useLang();
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <SiteHeader />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
            {t.sellEyebrow}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl mb-4">
            {t.sellTitle}
          </h1>
          <p className="text-gray-600 text-lg mb-4 leading-relaxed">
            {t.sellLead}
          </p>
          <p className="text-sm text-gray-500 mb-16">
            {t.reply} {REPLY_HOURS} {t.hours}.
          </p>

          <div className="mb-20">
            <ConciergeTimeline />
          </div>

          <div className="mb-16">
            <SellerNet />
          </div>

          <h2 className="font-serif text-3xl mb-6">Seller FAQ</h2>
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

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={sellTypeform("sell")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a1a1a] text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider text-center hover:bg-[#c9a84c] transition-colors"
            >
              Get a Concierge valuation
            </a>
            <Link
              to="/contact"
              className="border border-[#1a1a1a] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-center hover:border-[#c9a84c] transition-colors"
            >
              Contact the team
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default Sell;
