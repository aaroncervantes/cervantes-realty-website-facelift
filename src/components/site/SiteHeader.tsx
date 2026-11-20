import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SELL_TYPEFORM, BUY_TYPEFORM } from "@/lib/typeform";

export const SELL_URL = SELL_TYPEFORM;
export const BUY_URL = BUY_TYPEFORM;

const LOGO =
  "https://assets.cdn.filesafe.space/yvIB8uaPt79VRC8MA1HI/media/69e6c389571cca8e954ff6a8.png";

export function SiteHeader({ darkTrigger = false }: { darkTrigger?: boolean }) {
  return (
    <header className="sticky top-0 z-50 bg-[#f7f5f2]/90 backdrop-blur-md">
      <div className="container mx-auto px-6 h-28 flex items-center justify-between max-w-7xl">
        <a href="/" className="flex items-center gap-2">
          <img
            src={LOGO}
            alt="Cervantes Realty"
            className="h-20 md:h-24 w-auto object-contain"
          />
        </a>
        <nav className="hidden md:flex items-center gap-10 text-sm tracking-widest uppercase">
          <a
            href={SELL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            Sell
          </a>
          <a
            href={BUY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            Buy
          </a>
          <a href="/team" className="hover:opacity-60 transition-opacity">
            Team
          </a>
          <a href="/contact" className="hover:opacity-60 transition-opacity">
            Contact
          </a>
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 hover:bg-black/5 rounded-md transition-colors">
                <Menu
                  className={`w-6 h-6 ${darkTrigger ? "text-black" : ""}`}
                />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#f7f5f2] border-l-0 w-[300px] sm:w-[400px]"
            >
              <nav className="flex flex-col gap-8 mt-12 text-lg tracking-widest uppercase font-medium">
                <a
                  href={SELL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:opacity-60 transition-opacity ${darkTrigger ? "text-black" : ""}`}
                >
                  Sell
                </a>
                <a
                  href={BUY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:opacity-60 transition-opacity ${darkTrigger ? "text-black" : ""}`}
                >
                  Buy
                </a>
                <a
                  href="/team"
                  className={`hover:opacity-60 transition-opacity ${darkTrigger ? "text-black" : ""}`}
                >
                  Team
                </a>
                <a
                  href="/contact"
                  className={`hover:opacity-60 transition-opacity ${darkTrigger ? "text-black" : ""}`}
                >
                  Contact
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
