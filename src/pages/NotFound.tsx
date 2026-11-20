import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-ink">
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-5 pb-20 pt-32 text-center md:px-8">
          <p className="text-sm uppercase tracking-[0.2em] text-gold">404</p>
          <h1 className="mt-3 font-display text-4xl text-cream md:text-5xl">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-cream/70">
            The page you are looking for does not exist or has moved.
          </p>
          <Button asChild variant="gold" className="mt-8">
            <Link to="/">Back home</Link>
          </Button>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
