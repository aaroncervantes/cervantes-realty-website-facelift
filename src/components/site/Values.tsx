import { Cpu, Shield, Award } from "lucide-react";

export function Values() {
  return (
    <section className="bg-[#222222] text-white py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="flex items-center gap-6 justify-center md:justify-start">
            <Cpu className="w-12 h-12 stroke-[1.5] text-white shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">AI Systems</h3>
              <p className="text-white/70">Fresh, creative results.</p>
            </div>
          </div>
          <div className="flex items-center gap-6 justify-center md:justify-start">
            <Shield className="w-12 h-12 stroke-[1.5] text-white shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-white/70">Honesty and transparency.</p>
            </div>
          </div>
          <div className="flex items-center gap-6 justify-center md:justify-start">
            <Award className="w-12 h-12 stroke-[1.5] text-white shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-white/70">Top-notch services.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
