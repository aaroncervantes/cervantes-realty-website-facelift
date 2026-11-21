import { useLang } from "@/lib/i18n";

export function Values() {
  const { t } = useLang();
  return (
    <section className="bg-[#222222] text-white py-16 md:py-20">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-4">
          {t.valuesEyebrow}
        </p>
        <p className="font-serif text-2xl md:text-3xl leading-relaxed text-white/95">
          {t.valuesBody}
        </p>
      </div>
    </section>
  );
}
