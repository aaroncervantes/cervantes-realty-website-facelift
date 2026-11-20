import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ClosingCTA } from "@/components/ClosingCTA";

export default function About() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="relative bg-ink">
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-5 pb-16 pt-28 md:px-8">
          <h1 className="font-display text-4xl text-cream md:text-5xl">About Us</h1>
        </div>
      </div>
      <main className="mx-auto max-w-3xl px-5 py-12 md:px-8">
        
        <div className="space-y-5 text-ink/80 leading-relaxed">
          <p>
            At Cervantes Realty, we believe that finding your dream home is more than
            just a transaction—it's a life-changing experience. Our dedication to
            excellence, integrity, and personalized service ensures that every client
            feels valued and understood.
          </p>
          <p>
            With years of experience in the luxury real estate market across Southern
            California, our team is equipped with the knowledge and connections to help
            you navigate the complexities of buying or selling property. We utilize
            cutting-edge AI systems and a digital-first approach to provide a seamless,
            efficient, and modern real estate journey.
          </p>
          <p>
            Whether you are looking to invest, relocate, or find your forever home,
            Cervantes Realty is your trusted partner. Let us help you find your home in
            the world.
          </p>
        </div>

      </main>
      <ClosingCTA />
      <SiteFooter />
    </div>
  );
}
