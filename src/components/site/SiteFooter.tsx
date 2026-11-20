import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="bg-white pt-24 pb-12 border-t border-gray-200"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="max-w-3xl mx-auto md:mx-0 mb-16 text-center md:text-left">
          <p className="font-serif italic text-lg text-[#1a1a1a] leading-relaxed">
            Cervantes Realty collaborates with SoCal’s New Homes to help buyers
            understand both enclosed resale opportunities and the
            new-construction landscape — with clear next steps either way.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif font-bold text-base mb-6 uppercase tracking-widest">
              Follow Us
            </h4>
            <div className="flex gap-6">
              <a
                href="https://www.instagram.com/cervantesrealty/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity"
                aria-label="Cervantes Realty Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@cervantesrealty"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity"
                aria-label="Cervantes Realty TikTok"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-wider text-gray-400">
              + SoCal’s New Homes on social
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif font-bold text-base mb-6 uppercase tracking-widest">
              Explore
            </h4>
            <ul className="space-y-4 text-xs font-medium">
              <li>
                <Link
                  to="/homes"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider"
                >
                  Homes
                </Link>
              </li>
              <li>
                <Link
                  to="/new-homes"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider"
                >
                  New Homes Showcase
                </Link>
              </li>
              <li>
                <Link
                  to="/calculator"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider"
                >
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/buy"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider"
                >
                  Buy Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/sell"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider"
                >
                  Sell / Concierge
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif font-bold text-base mb-6 uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-4 text-xs font-medium">
              <li>
                <Link
                  to="/about"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/join"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider"
                >
                  Join Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider text-gray-300"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif font-bold text-base mb-6 uppercase tracking-widest">
              Legal
            </h4>
            <ul className="space-y-4 text-xs font-medium">
              <li>
                <Link
                  to="/privacy"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 space-y-2">
          <p>
            Markets we know: Long Beach · Los Angeles County · Inland Empire ·
            High Desert
          </p>
          <p className="pt-4 text-black font-serif italic">
            Copyright 2026 All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
