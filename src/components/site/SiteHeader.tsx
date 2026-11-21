import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SELL_TYPEFORM, BUY_TYPEFORM } from "@/lib/typeform";
import { LangToggle, useLang } from "@/lib/i18n";

/** Kept for listing pages that still deep-link Typeforms as CTAs */
export const SELL_URL = SELL_TYPEFORM;
export const BUY_URL = BUY_TYPEFORM;

const LOGO =
  "https://assets.cdn.filesafe.space/yvIB8uaPt79VRC8MA1HI/media/69e6c389571cca8e954ff6a8.png";

export function SiteHeader({ darkTrigger = false }: { darkTrigger?: boolean }) {
  const { t } = useLang();
  const NAV = [
    { label: t.navHomes, to: "/homes" },
    { label: t.navNewHomes, to: "/new-homes" },
    { label: t.navBuy, to: "/buy" },
    { label: t.navSell, to: "/sell" },
    { label: t.navContact, to: "/contact" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-[#f7f5f2]/90 backdrop-blur-md">
      <div className="container mx-auto px-6 h-28 flex items-center justify-between max-w-7xl gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src={LOGO}
            alt="Cervantes Realty"
            className="h-20 md:h-24 w-auto object-contain"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm tracking-widest uppercase">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="hover:opacity-60 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
          <LangToggle />
        </nav>
        <div className="md:hidden flex items-center gap-3">
          <LangToggle />
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
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`hover:opacity-60 transition-opacity ${darkTrigger ? "text-black" : ""}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
