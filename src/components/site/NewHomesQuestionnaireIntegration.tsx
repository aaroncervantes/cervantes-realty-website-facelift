/**
 * Noninteractive placeholder for Aaron’s existing SoCal’s New Homes questionnaire.
 * Wire the real Typeform/custom form URL later — do not build a replacement form here.
 */
export function NewHomesQuestionnaireIntegration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <aside
      className={`border border-dashed border-gray-300 bg-[#f7f5f2] px-6 py-8 ${className}`}
      data-integration="new-homes-questionnaire"
      aria-hidden="true"
    >
      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">
        Integration slot
      </p>
      <p className="font-serif text-lg text-gray-500 mb-2">
        SoCal’s New Homes questionnaire
      </p>
      <p className="text-sm text-gray-400 leading-relaxed max-w-xl">
        Reserved for Aaron’s existing custom questionnaire. Not interactive.
        Showcase pages stay browse-only until this is connected.
      </p>
    </aside>
  );
}
