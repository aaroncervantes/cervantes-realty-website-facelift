import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const About = () => {
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a] font-sans selection:bg-black selection:text-white flex flex-col">
      <SiteHeader darkTrigger />
      <main className="flex-1 py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="font-serif text-5xl md:text-6xl mb-8 font-medium text-center">
            About Us
          </h1>
          <div className="prose prose-lg mx-auto text-gray-700 font-serif leading-relaxed">
            <p className="mb-6">
              At Cervantes Realty, we believe that finding your dream home is
              more than just a transaction—it's a life-changing experience. Our
              dedication to excellence, integrity, and personalized service
              ensures that every client feels valued and understood.
            </p>
            <p className="mb-6">
              With years of experience in the luxury real estate market across
              Southern California, our team is equipped with the knowledge and
              connections to help you navigate the complexities of buying or
              selling property. We utilize cutting-edge AI systems and a
              digital-first approach to provide a seamless, efficient, and modern
              real estate journey.
            </p>
            <p>
              Whether you are looking to invest, relocate, or find your forever
              home, Cervantes Realty is your trusted partner. Let us help you
              find your home in the world.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default About;
