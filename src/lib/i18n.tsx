import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "es";

type Strings = {
  langLabel: string;
  buyTitle: string;
  sellTitle: string;
  contactTitle: string;
  joinTitle: string;
  reply: string;
  hours: string;
};

const STRINGS: Record<Lang, Strings> = {
  en: {
    langLabel: "ES",
    buyTitle: "Buying, step by step",
    sellTitle: "Sell smarter. Walk away richer.",
    contactTitle: "Contact Us",
    joinTitle: "Join Our Team",
    reply: "We reply within",
    hours: "hours",
  },
  es: {
    langLabel: "EN",
    buyTitle: "Comprar, paso a paso",
    sellTitle: "Vende con claridad. Sal con más.",
    contactTitle: "Contáctanos",
    joinTitle: "Únete al equipo",
    reply: "Respondemos en",
    hours: "horas",
  },
};

type I18nCtx = {
  lang: Lang;
  t: Strings;
  toggle: () => void;
};

const Ctx = createContext<I18nCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const value = useMemo<I18nCtx>(
    () => ({
      lang,
      t: STRINGS[lang],
      toggle: () => setLang((l) => (l === "en" ? "es" : "en")),
    }),
    [lang],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang requires LanguageProvider");
  return ctx;
}

export function LangToggle({ className = "" }: { className?: string }) {
  const { t, toggle, lang } = useLang();
  return (
    <button
      type="button"
      onClick={toggle}
      className={`text-[10px] font-bold uppercase tracking-widest border border-gray-300 px-2.5 py-1 hover:border-[#c9a84c] transition-colors ${className}`}
      aria-label={lang === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
    >
      {t.langLabel}
    </button>
  );
}
