import { ArrowRight } from "lucide-react";
import { SiteHeader, BUY_URL, SELL_URL } from "@/components/site/SiteHeader";
import { Values } from "@/components/site/Values";
import { SiteFooter } from "@/components/site/SiteFooter";

const Contact = () => {
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
              So we can best help, click which best applies to you.
            </p>
          </div>
        </section>

        <section className="py-24 bg-[#f7f5f2] -mt-20 relative z-20">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8">
              <a
                href={BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white p-12 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
              >
                <div className="flex flex-col h-full justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-serif mb-4 group-hover:text-[#c9a84c] transition-colors">
                      I Want to Buy
                    </h3>
                    <p className="text-gray-500 mb-8">
                      Start your journey to finding the perfect home with our
                      expert guidance.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </a>
              <a
                href={SELL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white p-12 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
              >
                <div className="flex flex-col h-full justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-serif mb-4 group-hover:text-[#c9a84c] transition-colors">
                      I Want to Sell
                    </h3>
                    <p className="text-gray-500 mb-8">
                      Maximize your property's value with our proven marketing
                      strategies.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Values />
      <SiteFooter />
    </div>
  );
};

export default Contact;
