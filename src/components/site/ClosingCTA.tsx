import { SELL_TYPEFORM as SELL_URL, BUY_TYPEFORM as BUY_URL } from "@/lib/typeform";


export function ClosingCTA() {
  return (
    <section className="bg-[#1a1a1a] text-white py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <p className="text-[#c9a84c] font-semibold text-[10px] uppercase tracking-widest mb-3">
          Ready When You Are
        </p>
        <h2 className="font-serif text-4xl md:text-5xl mb-6 font-medium">
          Let's Find Your Next Move
        </h2>
        <p className="text-white/70 font-serif italic text-lg mb-10 max-w-xl mx-auto">
          Whether you're buying or selling in Southern California, Cervantes
          Realty is ready to put every advantage to work for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={BUY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#c9a84c] text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            I Want to Buy
          </a>
          <a
            href={SELL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-gray-100 transition-colors"
          >
            I Want to Sell
          </a>
        </div>
      </div>
    </section>
  );
}
