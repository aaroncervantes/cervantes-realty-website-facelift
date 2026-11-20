import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-2xl">Cervantes Realty</p>
          <p className="mt-3 max-w-xs text-sm text-cream/70">
            Helping buyers and sellers across Southern California with expert
            guidance and exceptional service.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-medium text-gold">Explore</p>
          <ul className="space-y-2 text-cream/80">
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/team" className="hover:text-gold">Team</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/join" className="hover:text-gold">Join</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-medium text-gold">Follow</p>
          <ul className="space-y-2 text-cream/80">
            <li>
              <a href="https://instagram.com/cervantesrealty" target="_blank" rel="noreferrer" className="hover:text-gold">
                Instagram @cervantesrealty
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@cervantesrealty" target="_blank" rel="noreferrer" className="hover:text-gold">
                TikTok @cervantesrealty
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-4 text-cream/60">
            <Link to="/privacy" className="hover:text-gold">Privacy</Link>
            <Link to="/terms" className="hover:text-gold">Terms</Link>
            <Link to="/support" className="hover:text-gold">Support</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Cervantes Realty. All rights reserved.
      </div>
    </footer>
  );
}
