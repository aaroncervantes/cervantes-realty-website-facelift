import { ExternalLink } from "lucide-react";
import {
  snhQuestionnaire,
  type SnhSource,
} from "@/lib/site";
import { CollaborationMark } from "@/components/site/CollaborationMark";
import { useLang } from "@/lib/i18n";

/**
 * Opens Aaron’s live SoCal’s New Homes questionnaire (Railway).
 * Showcase communities stay browse-only — this is the intentional next step.
 */
export function NewHomesQuestionnaireIntegration({
  className = "",
  source = "new-homes",
}: {
  className?: string;
  source?: SnhSource;
}) {
  const { t } = useLang();
  const href = snhQuestionnaire(source);

  return (
    <aside
      className={`border border-[#c9a84c]/40 bg-white px-6 py-8 md:px-8 md:py-10 ${className}`}
      data-integration="new-homes-questionnaire"
    >
      <CollaborationMark compact className="mb-4" />
      <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
        SoCal’s New Homes
      </p>
      <h2 className="font-serif text-2xl md:text-3xl text-[#1a1a1a] mb-3">
        {t.questionnaireTitle}
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed max-w-xl mb-6">
        {t.questionnaireBody}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider hover:bg-[#c9a84c] transition-colors"
      >
        {t.questionnaireCta}
        <ExternalLink className="w-3.5 h-3.5" aria-hidden />
      </a>
      <p className="mt-4 text-[11px] text-gray-400">{t.questionnaireFoot}</p>
    </aside>
  );
}
