import { team } from "@/data/team";

/** Home-page team highlight (Aaron + associates). Used on marketing surfaces. */
export function HomeTeam() {
  return (
    <section className="py-16 md:py-24 bg-[#f7f5f2]">
      <div className="container mx-auto px-6 max-w-6xl">
        <p className="text-[#c9a84c] font-semibold text-[10px] uppercase tracking-widest mb-2 text-center">
          Our Team
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-center text-[#1a1a1a] mb-12">
          The People Behind Cervantes
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-5">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1a1a1a]">
                {member.name}
              </h3>
              <p className="text-[10px] text-[#c9a84c] uppercase tracking-widest font-semibold mt-1 mb-3">
                {member.role}
              </p>
              <p className="text-sm text-gray-600 font-serif italic">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
