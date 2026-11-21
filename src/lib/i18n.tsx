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

type Step = { n: string; title: string; body: string };
type Faq = { q: string; a: string };
type CompareRow = { label: string; resale: string; neu: string };

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

  // Footer
  footerCollab: string;
  footerFollow: string;
  footerExplore: string;
  footerCompany: string;
  footerLegal: string;
  footerSnhIg: string;
  footerSnhSocial: string;
  footerNewHomes: string;
  footerMarkets: string;
  footerCompare: string;
  footerRentVsBuy: string;
  footerCalculator: string;
  footerJoin: string;
  footerCaseStudy: string;
  footerSellConcierge: string;
  footerAbout: string;
  footerTeam: string;
  footerPrivacy: string;
  footerTerms: string;
  footerSupport: string;
  footerMarketsKnown: string;
  footerCopyright: string;

  // Homes page
  homesEyebrow: string;
  homesTitle: string;
  homesLead: string;
  filterAll: string;
  filterActive: string;
  filterClosed: string;
  homesLoading: string;
  homesEmptyActiveTitle: string;
  homesEmptyActiveBody: string;
  homesStartBuy: string;
  homesEmptyClosed: string;
  homesServiceMap: string;
  homesSoCal: string;
  homesMarketPages: string;
  homesMapNote: string;
  homesMapMarketsLink: string;

  // New homes
  newHomesFromIg: string;
  newHomesFromIgBody: string;
  newHomesTitle: string;
  newHomesLead: string;
  newHomesBrowseOnly: string;
  newHomesCompareLink: string;
  newHomesOr: string;
  newHomesBuyLink: string;
  newHomesFootnote: string;
  newHomesLoading: string;

  // New home detail chrome
  showcaseLoading: string;
  showcaseNotFound: string;
  showcaseBack: string;
  showcaseBackShort: string;
  fromPrice: string;
  bedsLabel: string;
  bathsLabel: string;
  communitySnapshot: string;
  labelGeneralArea: string;
  labelPriceRange: string;
  labelBeds: string;
  labelBaths: string;
  labelSqft: string;
  labelStyle: string;
  labelHoa: string;
  labelAssessments: string;
  labelIncentives: string;
  labelVerified: string;
  showcaseAddressNote: string;
  showcaseBadge: string;
  showcasePriceNote: string;
  photosComingSoon: string;
  contactSnh: string;
  whyBuyersTitle: string;
  whyCompareTitle: string;
  notCervantesListing: string;
  notCervantesBody: string;
  newVsResale: string;
  estPaymentFrom: string;

  // Markets
  marketsFourEyebrow: string;
  marketsLead: string;
  marketNotFound: string;
  marketsAll: string;
  marketsBack: string;
  localPerspective: string;
  contentReviewed: string;
  talkMarketWithUs: string;
  samplePayment: string;

  // Compare
  compareTitle: string;
  compareLead: string;
  sampleResalePrice: string;
  sampleNewPrice: string;
  estPI: string;
  compareTopic: string;
  compareResaleCol: string;
  compareNewCol: string;
  compareFoot: string;
  compareBuyGuide: string;
  compareBrowseShowcase: string;
  compareRows: CompareRow[];

  // Calculator
  calcEyebrow: string;
  calcTitle: string;
  calcLead: string;
  calcYourEstimate: string;
  calcBrowseHomes: string;

  // Rent vs buy
  rentEyebrow: string;
  rentTitle: string;
  rentLead: string;
  monthlyRent: string;
  homePrice: string;
  rentVsBuyAboveRent: string;
  rentVsBuyAboveBuy: string;
  rentVsBuyNote: string;
  continueBuyGuide: string;

  // Team chrome
  teamTitle: string;
  teamLead: string;
  trustedPartners: string;
  partnersList: string;
  partnersNote: string;

  // Closing CTA
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;

  // Concierge timeline
  timelineEyebrow: string;
  timelineTitle: string;
  timelineLead: string;
  timelineStages: Step[];

  // Values
  valuesEyebrow: string;
  valuesBody: string;

  // Proof strip labels
  proofEyebrow: string;
  rateChip: string;
  thirtyYrEstimate: string;
  calcLink: string;
  caseStudyLink: string;
  googleReview: string;
  rateLiveLabel: string;
  rateLiveTitle: string;
  rateEstimateBadge: string;
  rateMetaLine: string;
  rateWeeklyCta: string;
  rateWeeklySub: string;

  // Status
  statusActive: string;
  statusPending: string;
  statusClosed: string;

  // Listing header / mobile bar
  breadcrumbHome: string;
  share: string;
  copied: string;
  beds: string;
  baths: string;
  estMoAdjust: string;
  textBtn: string;
  likeThis: string;
  tourBtn: string;

  // Mortgage calculator
  mortgageEstimate: string;
  estimatePayment: string;
  thirtyYrUpdated: string;
  downPayment: string;
  interestRate: string;
  loanTerm: string;
  yrSuffix: string;
  addTaxIns: string;
  estMonthlyTotal: string;
  estMonthlyPI: string;
  perMonth: string;
  loanAmount: string;
  totalInterest: string;
  mortgageDisclaimer: string;
  openFullCalc: string;
  getPreapproval: string;
  piTaxIns: string;

  // Buy steps / FAQs / CTAs
  buySteps: Step[];
  buyFaqs: Faq[];
  buyerFaq: string;
  startBuyConversation: string;
  runCalculator: string;
  preferBrowse: string;

  // Sell FAQs / CTAs
  sellFaqs: Faq[];
  sellerFaq: string;
  getConciergeValuation: string;
  contactTeam: string;

  // Questionnaire
  questionnaireTitle: string;
  questionnaireBody: string;
  questionnaireCta: string;
  questionnaireFoot: string;

  // Homepage mid-page (below dual doors)
  homeViewAll: string;
  homeShowcasePopular: string;
  homeBrowseShowcase: string;
  homeShowcaseNote: string;
  homeConciergeBody: string;
  homeConciergeQuote: string;
  homeStartSelling: string;
  homeToolsEyebrow: string;
  homeToolsTitle: string;
  homeToolCalcTitle: string;
  homeToolCalcCopy: string;
  homeToolCompareTitle: string;
  homeToolCompareCopy: string;
  homeToolSellTitle: string;
  homeToolSellCopy: string;
  listingLoading: string;
  listingNotFound: string;
  listingWalkthrough: string;

  // Collaboration mark
  exclusiveCollab: string;
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

    footerCollab:
      "Cervantes Realty collaborates with SoCal’s New Homes to help buyers understand both enclosed resale opportunities and the new-construction landscape — with clear next steps either way.",
    footerFollow: "Follow Us",
    footerExplore: "Explore",
    footerCompany: "Company",
    footerLegal: "Legal",
    footerSnhIg: "SoCal’s New Homes on Instagram →",
    footerSnhSocial: "+ SoCal’s New Homes on social",
    footerNewHomes: "New Homes Showcase",
    footerMarkets: "Markets",
    footerCompare: "New vs Resale",
    footerRentVsBuy: "Rent vs Buy",
    footerCalculator: "Mortgage Calculator",
    footerJoin: "Join Our Team",
    footerCaseStudy: "Case Study",
    footerSellConcierge: "Sell / Concierge",
    footerAbout: "About Us",
    footerTeam: "Our Team",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Use",
    footerSupport: "Support",
    footerMarketsKnown:
      "Markets we know: Long Beach · Los Angeles County · Inland Empire · High Desert",
    footerCopyright: "Copyright 2026 All Rights Reserved.",

    homesEyebrow: "Enclosed inventory",
    homesTitle: "Active & recently closed",
    homesLead:
      "Your Cervantes resale book — tour what’s live, study what we just closed. Status is on every card.",
    filterAll: "All",
    filterActive: "Active",
    filterClosed: "Closed",
    homesLoading: "Loading listings…",
    homesEmptyActiveTitle: "No active homes right now",
    homesEmptyActiveBody:
      "We’ll find the next one. Meanwhile, here’s recent proof — or start a buy conversation.",
    homesStartBuy: "Start a buy conversation",
    homesEmptyClosed: "No closed listings yet.",
    homesServiceMap: "Service map",
    homesSoCal: "Southern California",
    homesMarketPages: "Market pages →",
    homesMapNote:
      "Orientation only — not a pin-for-every-listing map. Use filters above and {markets} for local perspective.",
    homesMapMarketsLink: "markets",

    newHomesFromIg: "From Instagram",
    newHomesFromIgBody:
      "Welcome — browse SoCal’s New Homes showcase. Discovery only; no inquire on these communities.",
    newHomesTitle: "New construction showcase",
    newHomesLead:
      "Common new-build patterns we post about — kept intentionally vague. These are not Cervantes listings.",
    newHomesBrowseOnly:
      "Browse only. No inquire on these products. For community or builder details, go direct. Want help deciding resale vs new?",
    newHomesCompareLink: "Compare new vs resale",
    newHomesOr: "or",
    newHomesBuyLink: "start a buy conversation",
    newHomesFootnote:
      "~25% of the dual-brand story lives here — discovery, not inventory ownership.",
    newHomesLoading: "Loading showcase…",

    showcaseLoading: "Loading showcase…",
    showcaseNotFound: "Showcase item not found.",
    showcaseBack: "Back to showcase",
    showcaseBackShort: "← Showcase",
    fromPrice: "From",
    bedsLabel: "beds",
    bathsLabel: "baths",
    communitySnapshot: "Community snapshot",
    labelGeneralArea: "General area",
    labelPriceRange: "Price range",
    labelBeds: "Beds",
    labelBaths: "Baths",
    labelSqft: "Square footage",
    labelStyle: "Style",
    labelHoa: "HOA",
    labelAssessments: "Special assessments",
    labelIncentives: "Builder incentives",
    labelVerified: "Info verified",
    showcaseAddressNote:
      "Exact community names and street addresses are not shown. Ask SoCal’s New Homes for private details.",
    showcaseBadge: "Showcase · SoCal’s New Homes",
    showcasePriceNote:
      "Prices and availability are based on currently published information and can change without notice.",
    photosComingSoon: "Photos coming soon",
    contactSnh: "Ask SoCal’s New Homes",
    whyBuyersTitle: "Next step",
    whyCompareTitle: "Why buyers compare this to resale",
    notCervantesListing: "SoCal’s New Homes",
    notCervantesBody:
      "Featured for market awareness — not a Cervantes Realty listing. Ask SoCal’s New Homes for availability, incentives, and a private tour. Want strategy help comparing new vs resale? Use the compare tool or talk with Cervantes generally.",
    newVsResale: "New vs resale",
    estPaymentFrom: "Est. payment from",

    marketsFourEyebrow: "Four markets · on purpose",
    marketsLead:
      "Not forty-seven city pages — four clear pockets with vibe, median context, and a sample payment.",
    marketNotFound: "Market not found.",
    marketsAll: "All markets",
    marketsBack: "← Markets",
    localPerspective: "The Local Perspective",
    contentReviewed: "Content reviewed",
    talkMarketWithUs: "Talk {name} with us",
    samplePayment: "Sample {name} payment",

    compareTitle: "New construction vs. resale",
    compareLead:
      "An editorial comparison — not a quiz. Adjust sample prices to see payment shape using the same mortgage math we use sitewide ({down}% down · {rate}% · {term}-yr). HOA and Mello-Roos are separate.",
    sampleResalePrice: "Sample resale price",
    sampleNewPrice: "Sample new-construction from-price",
    estPI: "Est. P&I",
    compareTopic: "Topic",
    compareResaleCol: "Resale · Cervantes",
    compareNewCol: "New · SoCal’s New Homes lens",
    compareFoot:
      "Showcase new homes stay browse-only — this tool educates; it doesn’t take inquiries on builder communities.",
    compareBuyGuide: "Continue with the buy guide",
    compareBrowseShowcase: "browse the showcase",
    compareRows: [
      {
        label: "Purchase price",
        resale: "Often negotiable against comps and condition",
        neu: "Usually set by builder phases; incentives may shift effective price",
      },
      {
        label: "HOA",
        resale: "Varies — many detached homes have none",
        neu: "Common on tracts/townhomes — bake into monthly early",
      },
      {
        label: "Mello-Roos / CFD",
        resale: "Less common on older stock; still verify",
        neu: "Frequent on new communities — can material change payment",
      },
      {
        label: "Property taxes",
        resale: "Based on assessed value; supplemental after purchase",
        neu: "New assessment + possible special taxes — model both",
      },
      {
        label: "Maintenance",
        resale: "Age of roof, HVAC, plumbing drives near-term spend",
        neu: "Newer systems; landscaping/HOA rules still matter",
      },
      {
        label: "Warranties",
        resale: "As-is after inspection credits",
        neu: "Builder warranties often cover structure/systems early years",
      },
      {
        label: "Incentives",
        resale: "Seller credits / rate buydowns in negotiation",
        neu: "Builder rate buydowns, closing costs, upgrades — when verified",
      },
      {
        label: "Neighborhood feel",
        resale: "Established trees, street character, known neighbors",
        neu: "New streetscape; amenity package depends on community",
      },
      {
        label: "Negotiation",
        resale: "Price, repairs, timing, contingencies",
        neu: "Upgrades, lot premiums, closing credits more than list cuts",
      },
    ],

    calcEyebrow: "Tools",
    calcTitle: "What will your mortgage cost?",
    calcLead:
      "Adjust the numbers — including an optional tax & insurance estimate. Then get pre-approval help when you’re ready.",
    calcYourEstimate: "Your estimate",
    calcBrowseHomes: "Browse homes",

    rentEyebrow: "Education",
    rentTitle: "Rent vs. buy — calmly",
    rentLead:
      "A simple monthly comparison using our shared mortgage math. This is not financial advice — taxes, HOA, maintenance, and opportunity cost still matter.",
    monthlyRent: "Monthly rent",
    homePrice: "Home price",
    rentVsBuyAboveRent:
      "Buying P&I runs about {amount}/mo above this rent.",
    rentVsBuyAboveBuy:
      "This rent runs about {amount}/mo above estimated P&I.",
    rentVsBuyNote:
      "Add tax, insurance, HOA, and maintenance before you decide. We’ll help you model the full number.",
    continueBuyGuide: "Continue to buy guide",

    teamTitle: "Our Team",
    teamLead:
      "Dedicated professionals committed to finding your perfect home in the world.",
    trustedPartners: "Trusted partners",
    partnersList: "Lender · Inspector · Escrow · Title · Transaction coordination",
    partnersNote:
      "We introduce vetted professionals as needed — no logo wall, no paid placements. Ask us who fits your deal.",

    ctaEyebrow: "Ready When You Are",
    ctaTitle: "Let's Find Your Next Move",
    ctaBody:
      "Whether you're buying or selling in Southern California, Cervantes Realty is ready to put every advantage to work for you.",

    timelineEyebrow: "Cervantes Concierge",
    timelineTitle: "Selling timeline",
    timelineLead:
      "What we handle at each stage — so the transaction feels managed, not mysterious. Timelines vary by market and condition; we won’t promise speed we can’t control.",
    timelineStages: [
      {
        n: "01",
        title: "Consultation & Valuation",
        body: "We walk your goals, pull live comps, and build a pricing strategy for your block — not a Zestimate guess.",
      },
      {
        n: "02",
        title: "Property Preparation",
        body: "Staging guidance, repairs worth doing, and a prep plan so launch day looks intentional — Concierge coordinates the hassle.",
      },
      {
        n: "03",
        title: "Marketing Launch",
        body: "Photography, story-driven copy, and distribution that reaches the right buyer pools — MLS plus our channels.",
      },
      {
        n: "04",
        title: "Offers & Negotiation",
        body: "We read terms as carefully as price. Highest isn’t always best — we protect your net and your timeline.",
      },
      {
        n: "05",
        title: "Escrow & Due Diligence",
        body: "Inspections, appraisal, disclosures, and clear updates so you’re never guessing what day of escrow you’re on.",
      },
      {
        n: "06",
        title: "Closing & Transition",
        body: "Final walkthrough, signing, funding, and keys — then a clean handoff so you can move forward.",
      },
    ],

    valuesEyebrow: "How we work",
    valuesBody:
      "Bilingual guidance · Cervantes Concierge for sellers · Resale you can tour + SoCal’s New Homes to study",

    proofEyebrow: "Proof · pinned Google voices",
    rateChip: "Rate chip",
    thirtyYrEstimate: "30-yr estimate",
    calcLink: "Calculator →",
    caseStudyLink: "Case study →",
    googleReview: "Google review",
    rateLiveLabel: "Live",
    rateLiveTitle: "Today’s mortgage rate",
    rateEstimateBadge: "Site estimate",
    rateMetaLine: "30-yr fixed · As of {date} · Planning estimate",
    rateWeeklyCta: "Get Weekly Text",
    rateWeeklySub: "SMS · ~{hours}h reply",

    statusActive: "Active",
    statusPending: "Pending",
    statusClosed: "Closed",

    breadcrumbHome: "Home",
    share: "Share",
    copied: "Copied",
    beds: "Beds",
    baths: "Baths",
    estMoAdjust: "Est. {amount}/mo · Adjust",
    textBtn: "Text",
    likeThis: "Like this",
    tourBtn: "Tour",

    mortgageEstimate: "Mortgage estimate",
    estimatePayment: "Estimate your payment",
    thirtyYrUpdated: "30-yr · Updated {date}",
    downPayment: "Down payment ({pct}%)",
    interestRate: "Interest rate (%)",
    loanTerm: "Loan term",
    yrSuffix: "yr",
    addTaxIns: "Add estimated taxes (~1.1%) & insurance (~0.35%)",
    estMonthlyTotal: "Estimated monthly total",
    estMonthlyPI: "Estimated monthly P&I",
    perMonth: "/mo",
    loanAmount: "Loan amount",
    totalInterest: "Total interest",
    mortgageDisclaimer:
      "Estimate only — not a lender quote. HOA and Mello-Roos not included.",
    openFullCalc: "Open full calculator →",
    getPreapproval: "Ready? Get pre-approval help →",
    piTaxIns: "P&I {pi} · Tax {tax} · Ins {ins}",

    buySteps: [
      {
        n: "01",
        title: "Get pre-approved",
        body: "A real letter beats a guess. We connect you with lenders who close on time.",
      },
      {
        n: "02",
        title: "Know the full monthly",
        body: "Use our calculator for P&I, then layer taxes, insurance, and HOA.",
      },
      {
        n: "03",
        title: "Tour the right homes",
        body: "Enclosed resales you can write on — plus browse-only new construction context.",
      },
      {
        n: "04",
        title: "Offer with strategy",
        body: "Price, contingencies, timing — competitive without reckless overpaying.",
      },
      {
        n: "05",
        title: "Escrow to keys",
        body: "Inspection, appraisal, contingencies, walkthrough — you’re never guessing the day.",
      },
    ],
    buyFaqs: [
      {
        q: "Do I need 20% down?",
        a: "No. FHA can go to 3.5%, many conventional options start at 3–5%. Under 20% usually means PMI — we weigh that against getting into the right home.",
      },
      {
        q: "What’s the supplemental tax surprise?",
        a: "In California, buying often triggers a supplemental tax bill based on the new assessed value. We flag it before you’re shocked at the mailbox.",
      },
      {
        q: "Should I wait for rates to drop?",
        a: "Buyers who are ready often lock when the home is right and refinance later. Timing the bottom costs more people than rate noise.",
      },
      {
        q: "Pre-qualification vs pre-approval?",
        a: "Pre-qual is a napkin estimate. Pre-approval is verified. SoCal sellers ignore napkin math.",
      },
      {
        q: "Can I buy with imperfect credit?",
        a: "Often yes — product depends on score and story. We route you to lenders who actually close those files.",
      },
    ],
    buyerFaq: "Buyer FAQ",
    startBuyConversation: "Start a buy conversation",
    runCalculator: "Run the calculator",
    preferBrowse: "Prefer to browse?",

    sellFaqs: [
      {
        q: "What if I price too high?",
        a: "Overpricing is the #1 reason homes go stale. We price to the block and the current buyer pool — not hope.",
      },
      {
        q: "How long will it take?",
        a: "Depends on pocket and condition. We give a real day-range from live comps, not a generic promise.",
      },
      {
        q: "Is staging worth it?",
        a: "Often yes on vacant or dated homes. We tell you when a $2k stage beats a $20k price cut.",
      },
      {
        q: "Do I have to be at every showing?",
        a: "No — that’s Concierge. Kick your feet up; we run the process and keep you updated.",
      },
    ],
    sellerFaq: "Seller FAQ",
    getConciergeValuation: "Get a Concierge valuation",
    contactTeam: "Contact the team",

    questionnaireTitle: "Tell us what you’re looking for",
    questionnaireBody:
      "Open the live questionnaire — communities, timing, and incentives — then come back here for resale context when you want both paths clear.",
    questionnaireCta: "Start the questionnaire",
    questionnaireFoot: "Opens in a new tab · Hard-refresh if the funnel looks outdated",

    homeViewAll: "View all homes →",
    homeShowcasePopular: "Popular new builds we’re seeing",
    homeBrowseShowcase: "Browse showcase →",
    homeShowcaseNote:
      "Featured for market awareness only. Not Cervantes listings — no inquire on these products.",
    homeConciergeBody:
      "Concierge helps you sell your home faster and for more money — with no hassle for you.",
    homeConciergeQuote: "“Sold our home in 6 days above asking.” — Michael S.",
    homeStartSelling: "Start selling",
    homeToolsEyebrow: "Useful, not noisy",
    homeToolsTitle: "Tools for buyers and sellers",
    homeToolCalcTitle: "Mortgage calculator",
    homeToolCalcCopy: "Price, down, rate, tax/ins toggle — see the number.",
    homeToolCompareTitle: "New vs resale",
    homeToolCompareCopy: "Editorial comparison with shared payment math.",
    homeToolSellTitle: "Sell guide",
    homeToolSellCopy: "Six-stage Concierge timeline + seller net.",
    listingLoading: "Loading property…",
    listingNotFound: "Property not found or no longer available.",
    listingWalkthrough: "Walkthrough",

    exclusiveCollab: "An exclusive collaboration",
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

    footerCollab:
      "Cervantes Realty colabora con SoCal’s New Homes para ayudar a compradores a entender tanto oportunidades de reventa cerrada como el panorama de obra nueva — con pasos claros en ambos caminos.",
    footerFollow: "Síguenos",
    footerExplore: "Explorar",
    footerCompany: "Empresa",
    footerLegal: "Legal",
    footerSnhIg: "SoCal’s New Homes en Instagram →",
    footerSnhSocial: "+ SoCal’s New Homes en redes",
    footerNewHomes: "Escaparate de nuevas",
    footerMarkets: "Mercados",
    footerCompare: "Nueva vs reventa",
    footerRentVsBuy: "Rentar vs comprar",
    footerCalculator: "Calculadora hipotecaria",
    footerJoin: "Únete al equipo",
    footerCaseStudy: "Caso de estudio",
    footerSellConcierge: "Vender / Concierge",
    footerAbout: "Nosotros",
    footerTeam: "Nuestro equipo",
    footerPrivacy: "Privacidad",
    footerTerms: "Términos",
    footerSupport: "Soporte",
    footerMarketsKnown:
      "Mercados que conocemos: Long Beach · Condado de Los Ángeles · Inland Empire · High Desert",
    footerCopyright: "Copyright 2026. Todos los derechos reservados.",

    homesEyebrow: "Inventario cerrado",
    homesTitle: "Activas y recién cerradas",
    homesLead:
      "Tu libro de reventa Cervantes — recorre lo activo, estudia lo que acabamos de cerrar. El estado va en cada tarjeta.",
    filterAll: "Todas",
    filterActive: "Activas",
    filterClosed: "Cerradas",
    homesLoading: "Cargando listados…",
    homesEmptyActiveTitle: "No hay casas activas ahora",
    homesEmptyActiveBody:
      "Encontraremos la siguiente. Mientras tanto, aquí va prueba reciente — o inicia una conversación de compra.",
    homesStartBuy: "Iniciar conversación de compra",
    homesEmptyClosed: "Aún no hay listados cerrados.",
    homesServiceMap: "Mapa de servicio",
    homesSoCal: "Sur de California",
    homesMarketPages: "Páginas de mercado →",
    homesMapNote:
      "Solo orientación — no es un mapa con pin por cada listado. Usa los filtros arriba y {markets} para perspectiva local.",
    homesMapMarketsLink: "mercados",

    newHomesFromIg: "Desde Instagram",
    newHomesFromIgBody:
      "Bienvenido — explora el escaparate de SoCal’s New Homes. Solo descubrimiento; sin consultas en estas comunidades.",
    newHomesTitle: "Escaparate de obra nueva",
    newHomesLead:
      "Patrones comunes de obra nueva de los que hablamos — a propósito generales. No son listados de Cervantes.",
    newHomesBrowseOnly:
      "Solo exploración. Sin consultas en estos productos. Para detalles de comunidad o constructor, ve directo. ¿Ayuda para decidir reventa vs nueva?",
    newHomesCompareLink: "Compara nueva vs reventa",
    newHomesOr: "o",
    newHomesBuyLink: "inicia una conversación de compra",
    newHomesFootnote:
      "~25% de la historia de doble marca vive aquí — descubrimiento, no inventario propio.",
    newHomesLoading: "Cargando escaparate…",

    showcaseLoading: "Cargando escaparate…",
    showcaseNotFound: "No se encontró este ítem del escaparate.",
    showcaseBack: "Volver al escaparate",
    showcaseBackShort: "← Escaparate",
    fromPrice: "Desde",
    bedsLabel: "rec.",
    bathsLabel: "baños",
    communitySnapshot: "Resumen de la comunidad",
    labelGeneralArea: "Área general",
    labelPriceRange: "Rango de precio",
    labelBeds: "Recámaras",
    labelBaths: "Baños",
    labelSqft: "Pies cuadrados",
    labelStyle: "Estilo",
    labelHoa: "HOA",
    labelAssessments: "Evaluaciones especiales",
    labelIncentives: "Incentivos del constructor",
    labelVerified: "Info verificada",
    showcaseAddressNote:
      "No se muestran nombres exactos de comunidad ni direcciones. Pregunta a SoCal’s New Homes por detalles privados.",
    showcaseBadge: "Escaparate · SoCal’s New Homes",
    showcasePriceNote:
      "Precios y disponibilidad se basan en información publicada y pueden cambiar sin aviso.",
    photosComingSoon: "Fotos próximamente",
    contactSnh: "Preguntar a SoCal’s New Homes",
    whyBuyersTitle: "Siguiente paso",
    whyCompareTitle: "Por qué la comparan con reventa",
    notCervantesListing: "SoCal’s New Homes",
    notCervantesBody:
      "Destacado para conciencia de mercado — no es un listado de Cervantes Realty. Pregunta a SoCal’s New Homes por disponibilidad, incentivos y un tour privado. ¿Quieres ayuda estratégica nueva vs reventa? Usa la herramienta de comparación o habla con Cervantes en general.",
    newVsResale: "Nueva vs reventa",
    estPaymentFrom: "Pago est. desde",

    marketsFourEyebrow: "Cuatro mercados · a propósito",
    marketsLead:
      "No cuarenta y siete páginas de ciudad — cuatro bolsillos claros con vibe, contexto de mediana y un pago de ejemplo.",
    marketNotFound: "Mercado no encontrado.",
    marketsAll: "Todos los mercados",
    marketsBack: "← Mercados",
    localPerspective: "La perspectiva local",
    contentReviewed: "Contenido revisado",
    talkMarketWithUs: "Hablar de {name} con nosotros",
    samplePayment: "Pago de ejemplo en {name}",

    compareTitle: "Obra nueva vs. reventa",
    compareLead:
      "Una comparación editorial — no un quiz. Ajusta precios de ejemplo para ver la forma del pago con la misma matemática hipotecaria del sitio ({down}% de enganche · {rate}% · {term} años). HOA y Mello-Roos van aparte.",
    sampleResalePrice: "Precio de reventa de ejemplo",
    sampleNewPrice: "Precio desde de obra nueva de ejemplo",
    estPI: "P&I est.",
    compareTopic: "Tema",
    compareResaleCol: "Reventa · Cervantes",
    compareNewCol: "Nueva · lente SoCal’s New Homes",
    compareFoot:
      "Las casas nuevas del escaparate siguen solo exploración — esta herramienta educa; no toma consultas de comunidades de constructores.",
    compareBuyGuide: "Continuar con la guía de compra",
    compareBrowseShowcase: "explorar el escaparate",
    compareRows: [
      {
        label: "Precio de compra",
        resale: "A menudo negociable según comps y condición",
        neu: "Suele fijarlo el constructor por fases; incentivos pueden mover el precio efectivo",
      },
      {
        label: "HOA",
        resale: "Varía — muchas casas independientes no tienen",
        neu: "Común en tractos/townhomes — inclúyelo en el mensual desde temprano",
      },
      {
        label: "Mello-Roos / CFD",
        resale: "Menos común en inventario viejo; igual verifica",
        neu: "Frecuente en comunidades nuevas — puede cambiar materialmente el pago",
      },
      {
        label: "Impuestos prediales",
        resale: "Según valor tasado; suplementario tras la compra",
        neu: "Nueva tasación + posibles impuestos especiales — modela ambos",
      },
      {
        label: "Mantenimiento",
        resale: "Edad de techo, HVAC y plomería define gasto cercano",
        neu: "Sistemas más nuevos; paisajismo/reglas de HOA aún importan",
      },
      {
        label: "Garantías",
        resale: "Tal cual después de créditos de inspección",
        neu: "Garantías del constructor suelen cubrir estructura/sistemas los primeros años",
      },
      {
        label: "Incentivos",
        resale: "Créditos del vendedor / buydowns de tasa en negociación",
        neu: "Buydowns, costos de cierre, upgrades — cuando están verificados",
      },
      {
        label: "Sensación del barrio",
        resale: "Árboles establecidos, carácter de calle, vecinos conocidos",
        neu: "Calle nueva; el paquete de amenidades depende de la comunidad",
      },
      {
        label: "Negociación",
        resale: "Precio, reparaciones, tiempos, contingencias",
        neu: "Upgrades, primas de lote, créditos de cierre más que recortes de lista",
      },
    ],

    calcEyebrow: "Herramientas",
    calcTitle: "¿Cuánto costará tu hipoteca?",
    calcLead:
      "Ajusta los números — incluyendo un estimado opcional de impuestos y seguro. Luego pide ayuda de preaprobación cuando estés listo.",
    calcYourEstimate: "Tu estimado",
    calcBrowseHomes: "Ver casas",

    rentEyebrow: "Educación",
    rentTitle: "Rentar vs. comprar — con calma",
    rentLead:
      "Una comparación mensual simple con nuestra matemática hipotecaria compartida. No es consejo financiero — impuestos, HOA, mantenimiento y costo de oportunidad aún importan.",
    monthlyRent: "Renta mensual",
    homePrice: "Precio de la casa",
    rentVsBuyAboveRent:
      "El P&I de compra corre unos {amount}/mes por encima de esta renta.",
    rentVsBuyAboveBuy:
      "Esta renta corre unos {amount}/mes por encima del P&I estimado.",
    rentVsBuyNote:
      "Suma impuestos, seguro, HOA y mantenimiento antes de decidir. Te ayudamos a modelar el número completo.",
    continueBuyGuide: "Continuar a la guía de compra",

    teamTitle: "Nuestro equipo",
    teamLead:
      "Profesionales dedicados a encontrar tu hogar perfecto en el mundo.",
    trustedPartners: "Socios de confianza",
    partnersList:
      "Prestamista · Inspector · Escrow · Título · Coordinación de transacción",
    partnersNote:
      "Presentamos profesionales verificados según haga falta — sin muro de logos ni colocaciones pagadas. Pregúntanos quién encaja en tu trato.",

    ctaEyebrow: "Listos cuando tú lo estés",
    ctaTitle: "Encontremos tu próximo paso",
    ctaBody:
      "Ya sea que compres o vendas en el Sur de California, Cervantes Realty está listo para poner cada ventaja a tu favor.",

    timelineEyebrow: "Cervantes Concierge",
    timelineTitle: "Línea de tiempo de venta",
    timelineLead:
      "Qué manejamos en cada etapa — para que la transacción se sienta gestionada, no misteriosa. Los tiempos varían por mercado y condición; no prometemos velocidad que no controlamos.",
    timelineStages: [
      {
        n: "01",
        title: "Consulta y valuación",
        body: "Recorremos tus metas, sacamos comps en vivo y armamos estrategia de precio para tu cuadra — no un Zestimate.",
      },
      {
        n: "02",
        title: "Preparación de la propiedad",
        body: "Guía de staging, reparaciones que valen la pena y un plan para que el lanzamiento se vea intencional — Concierge coordina el lío.",
      },
      {
        n: "03",
        title: "Lanzamiento de marketing",
        body: "Fotografía, copy con historia y distribución que llega a los pools correctos — MLS más nuestros canales.",
      },
      {
        n: "04",
        title: "Ofertas y negociación",
        body: "Leemos términos con el mismo cuidado que el precio. Lo más alto no siempre es lo mejor — protegemos tu neto y tu timeline.",
      },
      {
        n: "05",
        title: "Escrow y due diligence",
        body: "Inspecciones, avalúo, disclosures y updates claros para que nunca adivines en qué día de escrow estás.",
      },
      {
        n: "06",
        title: "Cierre y transición",
        body: "Walkthrough final, firma, fondeo y llaves — luego un handoff limpio para que sigas adelante.",
      },
    ],

    valuesEyebrow: "Cómo trabajamos",
    valuesBody:
      "Guía bilingüe · Cervantes Concierge para vendedores · Reventa que puedes recorrer + SoCal’s New Homes para estudiar",

    proofEyebrow: "Prueba · voces de Google fijadas",
    rateChip: "Tasa de referencia",
    thirtyYrEstimate: "estimado a 30 años",
    calcLink: "Calculadora →",
    caseStudyLink: "Caso de estudio →",
    googleReview: "Reseña de Google",
    rateLiveLabel: "En vivo",
    rateLiveTitle: "Tasa hipotecaria de hoy",
    rateEstimateBadge: "Estimado del sitio",
    rateMetaLine: "Fija a 30 años · Al {date} · Estimado de planeación",
    rateWeeklyCta: "Recibe texto semanal",
    rateWeeklySub: "SMS · ~{hours}h respuesta",

    statusActive: "Activa",
    statusPending: "Pendiente",
    statusClosed: "Cerrada",

    breadcrumbHome: "Inicio",
    share: "Compartir",
    copied: "Copiado",
    beds: "Rec.",
    baths: "Baños",
    estMoAdjust: "Est. {amount}/mes · Ajustar",
    textBtn: "SMS",
    likeThis: "Como esta",
    tourBtn: "Tour",

    mortgageEstimate: "Estimado hipotecario",
    estimatePayment: "Estima tu pago",
    thirtyYrUpdated: "30 años · Actualizado {date}",
    downPayment: "Enganche ({pct}%)",
    interestRate: "Tasa de interés (%)",
    loanTerm: "Plazo del préstamo",
    yrSuffix: "años",
    addTaxIns: "Agregar impuestos est. (~1.1%) y seguro (~0.35%)",
    estMonthlyTotal: "Total mensual estimado",
    estMonthlyPI: "P&I mensual estimado",
    perMonth: "/mes",
    loanAmount: "Monto del préstamo",
    totalInterest: "Interés total",
    mortgageDisclaimer:
      "Solo estimado — no es cotización de prestamista. HOA y Mello-Roos no incluidos.",
    openFullCalc: "Abrir calculadora completa →",
    getPreapproval: "¿Listo? Ayuda de preaprobación →",
    piTaxIns: "P&I {pi} · Imp. {tax} · Seg. {ins}",

    buySteps: [
      {
        n: "01",
        title: "Obtén preaprobación",
        body: "Una carta real vence a una adivinanza. Te conectamos con prestamistas que cierran a tiempo.",
      },
      {
        n: "02",
        title: "Conoce el mensual completo",
        body: "Usa nuestra calculadora para P&I, luego suma impuestos, seguro y HOA.",
      },
      {
        n: "03",
        title: "Recorre las casas correctas",
        body: "Reventas cerradas en las que puedes ofertar — más contexto de obra nueva solo para explorar.",
      },
      {
        n: "04",
        title: "Oferta con estrategia",
        body: "Precio, contingencias, tiempos — competitivo sin pagar de más a ciegas.",
      },
      {
        n: "05",
        title: "De escrow a llaves",
        body: "Inspección, avalúo, contingencias, walkthrough — nunca adivinas el día.",
      },
    ],
    buyFaqs: [
      {
        q: "¿Necesito 20% de enganche?",
        a: "No. FHA puede ir a 3.5%; muchas opciones convencionales empiezan en 3–5%. Menos de 20% suele significar PMI — lo sopesamos frente a entrar a la casa correcta.",
      },
      {
        q: "¿Qué es la sorpresa del impuesto suplementario?",
        a: "En California, comprar suele disparar un impuesto suplementario según el nuevo valor tasado. Lo señalamos antes de que te llegue por correo.",
      },
      {
        q: "¿Debo esperar a que bajen las tasas?",
        a: "Quienes están listos a menudo aseguran cuando la casa es la correcta y refinancian después. Esperar el fondo le cuesta a más gente que el ruido de tasas.",
      },
      {
        q: "¿Precalificación vs preaprobación?",
        a: "Precalificación es un estimado en servilleta. Preaprobación está verificada. Los vendedores de SoCal ignoran la matemática de servilleta.",
      },
      {
        q: "¿Puedo comprar con crédito imperfecto?",
        a: "A menudo sí — el producto depende del score y la historia. Te encaminamos a prestamistas que sí cierran esos expedientes.",
      },
    ],
    buyerFaq: "Preguntas del comprador",
    startBuyConversation: "Iniciar conversación de compra",
    runCalculator: "Usar la calculadora",
    preferBrowse: "¿Prefieres explorar?",

    sellFaqs: [
      {
        q: "¿Y si pongo el precio demasiado alto?",
        a: "Sobreprecio es la razón #1 de que las casas se estanquen. Precificamos a la cuadra y al pool actual de compradores — no a la esperanza.",
      },
      {
        q: "¿Cuánto tardará?",
        a: "Depende del bolsillo y la condición. Damos un rango real de días con comps en vivo, no una promesa genérica.",
      },
      {
        q: "¿Vale la pena el staging?",
        a: "A menudo sí en casas vacías o desactualizadas. Te decimos cuándo un staging de $2k gana a un corte de $20k.",
      },
      {
        q: "¿Tengo que estar en cada showing?",
        a: "No — eso es Concierge. Relájate; corremos el proceso y te mantenemos al día.",
      },
    ],
    sellerFaq: "Preguntas del vendedor",
    getConciergeValuation: "Obtener valuación Concierge",
    contactTeam: "Contactar al equipo",

    questionnaireTitle: "Cuéntanos qué buscas",
    questionnaireBody:
      "Abre el cuestionario en vivo — comunidades, tiempos e incentivos — y vuelve aquí por contexto de reventa cuando quieras ambos caminos claros.",
    questionnaireCta: "Empezar el cuestionario",
    questionnaireFoot:
      "Se abre en una pestaña nueva · Hard-refresh si el funnel se ve desactualizado",

    homeViewAll: "Ver todas las casas →",
    homeShowcasePopular: "Obra nueva popular que estamos viendo",
    homeBrowseShowcase: "Ver escaparate →",
    homeShowcaseNote:
      "Solo para contexto de mercado. No son listados de Cervantes — sin consultas en estos productos.",
    homeConciergeBody:
      "Concierge te ayuda a vender más rápido y por más dinero — sin complicaciones para ti.",
    homeConciergeQuote:
      "“Vendimos en 6 días por encima del asking.” — Michael S.",
    homeStartSelling: "Empezar a vender",
    homeToolsEyebrow: "Útil, no ruidoso",
    homeToolsTitle: "Herramientas para compradores y vendedores",
    homeToolCalcTitle: "Calculadora hipotecaria",
    homeToolCalcCopy: "Precio, enganche, tasa, impuestos/seguro — ve el número.",
    homeToolCompareTitle: "Nueva vs reventa",
    homeToolCompareCopy: "Comparación editorial con la misma matemática de pago.",
    homeToolSellTitle: "Guía de venta",
    homeToolSellCopy: "Timeline Concierge de seis etapas + neto del vendedor.",
    listingLoading: "Cargando propiedad…",
    listingNotFound: "Propiedad no encontrada o ya no disponible.",
    listingWalkthrough: "Recorrido",

    exclusiveCollab: "Una colaboración exclusiva",
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

/** Replace `{key}` placeholders in a string template. */
export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] != null ? String(vars[key]) : `{${key}}`,
  );
}
