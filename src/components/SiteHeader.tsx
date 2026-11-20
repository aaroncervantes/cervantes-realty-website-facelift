import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";

const BUY = "https://form.typeform.com/to/MYDWRuKV?typeform-source=cervantesestates.com#new-menu-item";
const SELL = "https://form.typeform.com/to/AJGF8W1h?typeform-source=cervantesestates.com#about";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <Link to="/" className="font-display text-xl tracking-wide text-cream md:text-2xl">
          Cervantes Realty
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-cream/90 md:flex">
          <NavLink to="/" className="hover:text-gold" activeClassName="text-gold">
            Home
          </NavLink>
          <NavLink to="/team" className="hover:text-gold" activeClassName="text-gold">
            Team
          </NavLink>
          <NavLink to="/about" className="hover:text-gold" activeClassName="text-gold">
            About
          </NavLink>
          <NavLink to="/contact" className="hover:text-gold" activeClassName="text-gold">
            Contact
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline" className="border-cream/40 text-cream hover:bg-cream/10">
            <a href={BUY} target="_blank" rel="noreferrer">
              Buy
            </a>
          </Button>
          <Button asChild size="sm" variant="gold">
            <a href={SELL} target="_blank" rel="noreferrer">
              Sell
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
