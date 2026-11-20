import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Values } from "@/components/site/Values";
import { SiteFooter } from "@/components/site/SiteFooter";
import { REPLY_HOURS, AGENT_EMAIL, smsLink } from "@/lib/site";
import { usePageTitle } from "@/hooks/use-page-title";

const Contact = () => {
  usePageTitle("Contact");
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a] font-sans selection:bg-black selection:text-white flex flex-col">
      <SiteHeader darkTrigger />

      <main className="flex-1">
        <section className="relative py-32 md:py-48 overflow-hidden bg-[#1e1e1e] text-white">
          <div className="absolute inset-0 z-0">
            <img
              src="https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png"
              alt="Contact Background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#1e1e1e]" />
          </div>
          <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
            <h1 className="font-serif text-5xl md:text-7xl mb-6 font-medium">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-serif italic max-w-2xl mx-auto">
              Start with the path that fits — guides first, forms when you’re
              ready. We reply within {REPLY_HOURS} hours.
            </p>
          </div>
        </section>

        <section className="py-24 bg-[#f7f5f2] -mt-20 relative z-20">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <Link
                to="/buy"
                className="group block bg-white p-12 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex flex-col h-full justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-serif mb-4 group-hover:text-[#c9a84c] transition-colors">
                      I Want to Buy
                    </h3>
                    <p className="text-gray-500 mb-8">
                      Read the buy guide, then start a conversation when you’re
                      ready.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                    <span>Buy guide</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
              <Link
                to="/sell"
                className="group block bg-white p-12 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex flex-col h-full justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-serif mb-4 group-hover:text-[#c9a84c] transition-colors">
                      I Want to Sell
                    </h3>
                    <p className="text-gray-500 mb-8">
                      See Concierge + a rough net peek, then request a valuation.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                    <span>Sell guide</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <a
                href={`mailto:${AGENT_EMAIL}`}
                className="underline hover:text-[#c9a84c] text-center"
              >
                Email {AGENT_EMAIL}
              </a>
              <a
                href={smsLink("Hi Aaron, I'd like to chat about real estate.")}
                className="underline hover:text-[#c9a84c] text-center"
              >
                Text us
              </a>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#c9a84c] text-center"
              >
                15-min clarity call
              </a>
            </div>
            <p className="text-center text-[11px] text-gray-400 mt-4">
              Swap the Calendly link when your booking URL is ready.
            </p>
          </div>
        </section>
      </main>

      <Values />
      <SiteFooter />
    </div>
  );
};

export default Contact;
