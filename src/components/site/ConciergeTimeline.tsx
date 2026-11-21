import { useLang } from "@/lib/i18n";

export function ConciergeTimeline() {
  const { t } = useLang();
  const stages = t.timelineStages;
  return (
    <div className="relative">
      <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-3">
        {t.timelineEyebrow}
      </p>
      <h2 className="font-serif text-3xl md:text-4xl mb-3">{t.timelineTitle}</h2>
      <p className="text-gray-600 mb-12 max-w-xl leading-relaxed">
        {t.timelineLead}
      </p>
      <ol className="relative space-y-0">
        {stages.map((stage, i) => (
          <li
            key={stage.n}
            className="relative flex gap-6 md:gap-10 pb-12 last:pb-0 animate-[cr-fadeup_0.7s_ease-out_both]"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            {i < stages.length - 1 && (
              <span
                className="absolute left-[15px] md:left-[19px] top-10 bottom-0 w-px bg-[#c9a84c]/35"
                aria-hidden
              />
            )}
            <span className="relative z-10 flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full border border-[#c9a84c] bg-[#f7f5f2] text-[10px] font-bold text-[#c9a84c]">
              {stage.n}
            </span>
            <div className="pt-1">
              <h3 className="font-serif text-xl md:text-2xl mb-2">
                {stage.title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-xl">
                {stage.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
