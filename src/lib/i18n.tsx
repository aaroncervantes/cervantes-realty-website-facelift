import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "es";

const STORAGE_KEY = "cr-lang";

type Strings = {
  langLabel: string;
  navHomes: string;
  navNewHomes: string;
  navBuy: string;
  navSell: string;
  navContact: string;
  heroTitle: string;
  heroSub: string;
  heroBrowse: string;
  heroSell: string;
  doorsEyebrow: string;
  doorsTitle: string;
  enclosedTitle: string;
  enclosedBody: string;
  showcaseTitle: string;
  showcaseBody: string;
  buyTitle: string;
  buyEyebrow: string;
  buyLead: string;
  sellTitle: string;
  sellEyebrow: string;
  sellLead: string;
  contactTitle: string;
  contactLead: string;
  joinTitle: string;
  joinLead: string;
  reply: string;
  hours: string;
  marketsEyebrow: string;
  marketsTitle: string;
  marketsBody: string;
  marketsCta: string;
  wantBuy: string;
  wantSell: string;
  buyGuide: string;
  sellGuide: string;
};

const STRINGS: Record<Lang, Strings> = {
  en: {
    langLabel: "ES",
    navHomes: "Homes",
    navNewHomes: "New Homes",
    navBuy: "Buy",
    navSell: "Sell",
    navContact: "Contact",
    heroTitle: "Find Your Home in the World",
    heroSub: "Cervantes Realty × SoCal’s New Homes",
    heroBrowse: "Browse homes",
    heroSell: "Sell with Concierge",
    doorsEyebrow: "Two ways to look",
    doorsTitle: "Resale you can tour. New builds to study.",
    enclosedTitle: "Enclosed inventory",
    enclosedBody:
      "Active & recently closed — full address, tour, real next steps.",
    showcaseTitle: "New construction showcase",
    showcaseBody: "Browse-only inspiration — vague on purpose, no inquire.",
    buyTitle: "Buying, step by step",
    buyEyebrow: "Buy with Cervantes",
    buyLead:
      "Luxury guidance with useful clarity — resale you can tour, new-build context when it helps.",
    sellTitle: "Sell smarter. Walk away richer.",
    sellEyebrow: "Cervantes Concierge",
    sellLead:
      "Kick your feet up. We run a system designed to sell faster and for more — with less stress on you.",
    contactTitle: "Contact Us",
    contactLead:
      "Start with the path that fits — guides first, forms when you’re ready.",
    joinTitle: "Join Our Team",
    joinLead:
      "Two clear paths. No hybrids. Excellence, shared infrastructure, and an exclusive collaboration with SoCal’s New Homes.",
    reply: "We reply within",
    hours: "hours",
    marketsEyebrow: "Where We Work",
    marketsTitle: "Markets we know",
    marketsBody:
      "Long Beach · LA County · Inland Empire · High Desert — four clear market pages with vibe and sample payments.",
    marketsCta: "Explore markets →",
    wantBuy: "I Want to Buy",
    wantSell: "I Want to Sell",
    buyGuide: "Buy guide",
    sellGuide: "Sell guide",
  },
  es: {
    langLabel: "EN",
    navHomes: "Casas",
    navNewHomes: "Nuevas",
    navBuy: "Comprar",
    navSell: "Vender",
    navContact: "Contacto",
    heroTitle: "Encuentra tu hogar en el mundo",
    heroSub: "Cervantes Realty × SoCal’s New Homes",
    heroBrowse: "Ver casas",
    heroSell: "Vende con Concierge",
    doorsEyebrow: "Dos formas de mirar",
    doorsTitle: "Reventa para recorrer. Obra nueva para estudiar.",
    enclosedTitle: "Inventario cerrado",
    enclosedBody:
      "Activas y recién cerradas — dirección completa, tour y siguientes pasos.",
    showcaseTitle: "Escaparate de obra nueva",
    showcaseBody:
      "Solo exploración — a propósito general, sin consultas aquí.",
    buyTitle: "Comprar, paso a paso",
    buyEyebrow: "Compra con Cervantes",
    buyLead:
      "Guía de lujo con claridad útil — reventa que puedes recorrer y contexto de obra nueva cuando ayuda.",
    sellTitle: "Vende con claridad. Sal con más.",
    sellEyebrow: "Cervantes Concierge",
    sellLead:
      "Relájate. Corremos un proceso pensado para vender con menos estrés para ti.",
    contactTitle: "Contáctanos",
    contactLead:
      "Empieza por el camino que te conviene — guías primero, formularios cuando estés listo.",
    joinTitle: "Únete al equipo",
    joinLead:
      "Dos caminos claros. Sin híbridos. Excelencia, infraestructura compartida y una colaboración exclusiva con SoCal’s New Homes.",
    reply: "Respondemos en",
    hours: "horas",
    marketsEyebrow: "Dónde trabajamos",
    marketsTitle: "Mercados que conocemos",
    marketsBody:
      "Long Beach · Condado de LA · Inland Empire · High Desert — cuatro páginas de mercado con vibe y pagos de ejemplo.",
    marketsCta: "Explorar mercados →",
    wantBuy: "Quiero comprar",
    wantSell: "Quiero vender",
    buyGuide: "Guía de compra",
    sellGuide: "Guía de venta",
  },
};

type I18nCtx = {
  lang: Lang;
  t: Strings;
  toggle: () => void;
  setLang: (l: Lang) => void;
};

const Ctx = createContext<I18nCtx | null>(null);

function readStoredLang(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "es" || v === "en") return v;
  } catch {
    /* ignore */
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() =>
    typeof window === "undefined" ? "en" : readStoredLang(),
  );

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<I18nCtx>(
    () => ({
      lang,
      t: STRINGS[lang],
      setLang,
      toggle: () => setLang(lang === "en" ? "es" : "en"),
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
