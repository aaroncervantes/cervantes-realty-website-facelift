import { team } from "@/data/team";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Values } from "@/components/site/Values";
import { SiteFooter } from "@/components/site/SiteFooter";

const Team = () => {
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      <SiteHeader />

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h1 className="font-serif text-5xl md:text-6xl mb-6 font-medium">
              Our Team
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-serif italic">
              Dedicated professionals committed to finding your perfect home in
              the world.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {team.map((member) => (
              <div key={member.name} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-6 aspect-[3/4]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                </div>
                <h3 className="font-serif text-2xl font-medium mb-1">
                  {member.name}
                </h3>
                <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Values />
      <SiteFooter />
    </div>
  );
};

export default Team;
