// Real production work — Shopify Apps, headless storefronts, custom themes, full-stack builds.

export const profile = {
  name: "Soyal Khan",
  username: "Soyalkhan",
  linkedin: "iamsoyal",
  email: "workwithsoyal@gmail.com",
  phone: "+91 7535964612",
  bio: "Full Stack Engineer — Shopify, Hydrogen, Remix, Node.js, MongoDB.",
  company: "Delhi Digital Co.",
  location: "New Delhi, India",
  avatar: "https://avatars.githubusercontent.com/u/56201254?v=4",
  url: "https://github.com/Soyalkhan",
  linkedinUrl: "https://www.linkedin.com/in/iamsoyal/",
  followers: 3,
  following: 8,
  publicRepos: 34,
  joined: "2019-10-05",
};

export const stats = {
  storesShipped: "100+",
  themesBuilt: "50+",
  hourlyRate: "$4",
  ongoing: "4+",
  team: "5+",
  yearsExperience: "5+",
  issuesSolved: "90%",
};

export type ProjectCategory = "shopify-app" | "mobile-app" | "headless" | "theme" | "custom-dev";

export type Project = {
  name: string;
  /** Optional short name used in the auto-rotating showreel headline */
  shortName?: string;
  category: ProjectCategory;
  client?: string;
  year: string;
  url: string;
  stack: string[];
  description: string;
  solves: string;
  highlights?: string[];
  /** App Store / Play Store / brand-logo URL */
  logoUrl?: string;
  /** Short one-liner from the listing (used under the logo) */
  tagline?: string;
  /** Star rating from the store listing */
  rating?: string;
  appStore?: boolean;
  playStore?: boolean;
};

export const projects: Project[] = [
  // ── Published Shopify Apps ─────────────────────────────────────────────
  {
    name: "Indian GST Invoice",
    category: "shopify-app",
    client: "Shopify App Store",
    year: "2024",
    url: "https://apps.shopify.com/indian-gst-invoice",
    stack: ["Shopify", "React", "Node", "Express", "MongoDB"],
    description: "GST-compliant invoice generator for Indian Shopify merchants.",
    solves:
      "Shopify's native invoicing isn't GST-ready — merchants in India need automatic HSN/SAC codes, tax calc, and bulk PDF export to stay compliant.",
    highlights: ["GST + HSN/SAC", "Bulk PDF export", "Webhook order sync"],
    logoUrl:
      "https://cdn.shopify.com/app-store/listing_images/f91cb213006ab6fb5448b00b9a44c33c/icon/COj2oqi2iYsDEAE=.png",
    tagline:
      "Auto CGST/SGST/IGST split. HSN codes per variant. Branded PDF invoices for Indian stores.",
    rating: "5.0",
    appStore: true,
  },
  {
    name: "Ultimate Variants & Swatches",
    shortName: "UVS App",
    category: "shopify-app",
    client: "Shopify App Store",
    year: "2025",
    url: "https://apps.shopify.com/sibling-new-app",
    stack: ["Remix", "GraphQL", "Polaris", "MongoDB"],
    description: "Custom swatches and linked products for smarter shopping.",
    solves:
      "Brands can't group separate product listings as a single variant family or show swatch-based browsing without an expensive theme rebuild.",
    highlights: ["Variant grouping", "Color swatches", "Polaris UI"],
    logoUrl:
      "https://cdn.shopify.com/app-store/listing_images/7c3a53ccdda76f3a6375e187445438e7/icon/CNPp_rKjzo8DEAE=.png",
    tagline: "Custom swatches & linked products for smarter shopping.",
    rating: "5.0",
    appStore: true,
  },
  {
    name: "Snowflakes — Winter Effects",
    shortName: "Snowflakes",
    category: "shopify-app",
    client: "Shopify App Store",
    year: "2024",
    url: "https://apps.shopify.com/snowflakes-1",
    stack: ["Remix", "Shopify APIs", "Polaris"],
    description: "One-click festive snowfall animations for Shopify storefronts.",
    solves:
      "Merchants want seasonal flair without theme edits or performance regressions — tunable density, size, speed, fully reversible.",
    highlights: ["Zero perf hit", "Tunable params", "One-click install"],
    logoUrl:
      "https://cdn.shopify.com/app-store/listing_images/e5754522fe9444ebf761aeb2691c151c/icon/CKOI_YvLsJEDEAE=.png",
    tagline:
      "Add falling snowflakes to your store in one click. Create a festive winter look that engages shoppers.",
    appStore: true,
  },

  // ── Published mobile apps ──────────────────────────────────────────────
  {
    name: "Abley's",
    shortName: "Abley's",
    category: "mobile-app",
    client: "Sensory Products D2C · India",
    year: "2026",
    url: "https://play.google.com/store/apps/details?id=com.ableys.store",
    stack: ["React Native", "Shopify Storefront API", "Node", "MongoDB"],
    description:
      "Native Android commerce app for a sensory-products brand — OTP auth, onboarding questionnaire, curated collections.",
    solves:
      "Parents and caregivers of children with sensory needs want a focused mobile experience — not a generic Shopify mobile web. Built as a native Android app with Shopify Storefront API on the backend and a tailored onboarding flow that personalizes collections.",
    highlights: ["Native Android", "Phone + Email OTP", "Onboarding flow", "Shopify Storefront API"],
    logoUrl:
      "https://play-lh.googleusercontent.com/lThc5CQ3MVRNarlq60ZDuUMQWlqwk0hrZtBrHBO21wZLPRNk2HBqvOMbPMSAP5WG6-E_L-y0a7fg1LL8Coet6A=w240-h240",
    tagline:
      "All Things Sensory — find, customize, and purchase sensory products tailored to your child's needs.",
    playStore: true,
  },

  // ── Headless storefronts (Hydrogen + Remix) ────────────────────────────
  {
    name: "PYKO",
    category: "headless",
    client: "Luxury Watch Brand",
    year: "2025",
    url: "https://pyko----27-03-2025-1a868dbd01e96bd82635.o2.myshopify.dev/",
    stack: ["Hydrogen", "Remix", "Tailwind", "GSAP", "PayU Breeze", "Omnisend"],
    description: "Headless Shopify storefront with custom checkout and motion-led product UX.",
    solves:
      "Luxury brands need a fully bespoke product experience and editorial storytelling that Shopify themes can't deliver — without losing the Shopify backend.",
    highlights: ["Hydrogen SSR", "PayU Breeze checkout", "GSAP motion"],
  },
  {
    name: "The Wouff",
    category: "headless",
    client: "D2C E-commerce",
    year: "2025",
    url: "https://www.thewouff.com/",
    stack: ["Hydrogen", "Remix", "GraphQL"],
    description: "Fully headless D2C storefront on Hydrogen + Remix with Storefront GraphQL.",
    solves:
      "D2C brand needed strong SEO, fast SSR, and a custom shopping experience — while keeping Shopify as the single source of truth.",
    highlights: ["SSR + SEO", "Storefront GraphQL", "Scalable architecture"],
  },

  // ── Custom Shopify theme builds ────────────────────────────────────────
  {
    name: "Soulmaed",
    category: "theme",
    client: "Lifestyle Brand",
    year: "2025",
    url: "https://www.soulmaed.com/",
    stack: ["Shopify", "Liquid", "Tailwind"],
    description: "Custom Shopify theme — lifestyle & wellness brand.",
    solves:
      "Off-the-shelf themes can't deliver brand-specific storytelling, on-brand PDPs, or conversion-tuned collection layouts.",
  },
  {
    name: "Elephant Racquet Club",
    category: "theme",
    client: "Sports Lifestyle",
    year: "2025",
    url: "https://elephantracquetclub.com/",
    stack: ["Shopify", "Liquid", "Tailwind"],
    description: "Custom Shopify theme — premium sports lifestyle.",
    solves:
      "Premium brand needed editorial-quality layouts, animation, and a distinctive look beyond what default themes allow.",
  },
  {
    name: "Supplemart",
    category: "theme",
    client: "Health & Supplements",
    year: "2024",
    url: "https://supplemart.in/",
    stack: ["Shopify", "Liquid", "Tailwind"],
    description: "Custom Shopify theme — health & supplements.",
    solves:
      "Supplement brand needed clear nutrition-info architecture and high-conversion PDPs that standard themes don't ship with.",
  },
  {
    name: "Toramoto",
    category: "theme",
    client: "Fashion / Apparel",
    year: "2024",
    url: "https://toramoto.in/",
    stack: ["Shopify", "Liquid", "Tailwind"],
    description: "Custom Shopify theme — fashion & apparel.",
    solves:
      "Apparel brand needed a fast, conversion-focused storefront with custom collections and editorial product pages.",
  },

  // ── Custom full-stack builds (Next.js + Node + Mongo) ──────────────────
  {
    name: "Express Supplemart",
    category: "custom-dev",
    client: "Quick-Commerce Platform",
    year: "2025",
    url: "https://express.supplemart.in/",
    stack: ["Next.js", "Node", "MongoDB", "Shiprocket Hyperlocal"],
    description:
      "Quick-commerce platform (Blinkit / Zepto-style) on top of an existing Shopify catalog — pincode + radius serviceability, separate admin, hyperlocal fulfillment.",
    solves:
      "Shopify can't natively run radius-based serviceability + 10-30 min hyperlocal fulfillment. We rebuilt the storefront as a quick-delivery custom app with its own admin dashboard, Shiprocket Hyperlocal integration, and pincode/radius filters.",
    highlights: ["Pincode + radius filter", "Quick-ship orchestration", "Dedicated admin", "Shiprocket Hyperlocal"],
  },
  {
    name: "GoHyperLocal",
    category: "custom-dev",
    client: "Hyperlocal Commerce",
    year: "2025",
    url: "https://gohyperlocal-frontend.vercel.app/",
    stack: ["Next.js", "Node", "MongoDB"],
    description: "Hyperlocal commerce platform — frontend + backend + admin.",
    solves:
      "Local commerce brands need radius-based serviceability, real-time order flow, and admin tooling — full-stack build, not a plugin.",
  },
  {
    name: "SuriFresh Extract",
    category: "custom-dev",
    client: "Fresh Produce D2C",
    year: "2025",
    url: "https://surifreshextract.com/",
    stack: ["Next.js", "Node", "MongoDB"],
    description: "Cold-pressed juice / fresh produce storefront with custom backend.",
    solves:
      "Fresh-produce D2C brand needed subscription + delivery scheduling that off-the-shelf platforms don't support.",
  },
  {
    name: "BookMyCab",
    category: "custom-dev",
    client: "Cab Booking Platform",
    year: "2025",
    url: "https://bookmycab.co",
    stack: ["Next.js", "Node", "MongoDB"],
    description: "Cab booking platform — real-time ride flow, dispatcher admin.",
    solves:
      "Operator needed transparent customer-facing booking with own driver/dispatcher management — not viable on third-party SaaS.",
  },
];

// Featured showreel — strongest 6 real projects in display order.
export type CaseStudy = (typeof projects)[number];

export const caseStudies: CaseStudy[] = [
  projects.find((p) => p.name === "PYKO")!,
  projects.find((p) => p.name === "The Wouff")!,
  projects.find((p) => p.name === "Express Supplemart")!,
  projects.find((p) => p.name === "Abley's")!,
  projects.find((p) => p.name === "Ultimate Variants & Swatches")!,
  projects.find((p) => p.name === "Indian GST Invoice")!,
];

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  "shopify-app": "Published Shopify Apps",
  "mobile-app": "Published Mobile Apps",
  headless: "Headless Storefronts",
  theme: "Custom Theme Development",
  "custom-dev": "Custom Full-Stack",
};

export type Service = {
  title: string;
  pitch: string;
  bullets: string[];
  price?: string;
};

export const services: Service[] = [
  {
    title: "Shopify Funnel & Store Setup",
    pitch:
      "End-to-end Shopify store setup, theme configuration, and a conversion funnel that actually converts.",
    bullets: ["Full theme setup", "Apps + integrations", "Conversion-focused"],
  },
  {
    title: "Website → Shopify Migration",
    pitch:
      "Have a Shopify website you want converted into a real store? I'll do the conversion end-to-end.",
    bullets: ["Catalog migration", "SEO preserved", "Theme rebuild"],
  },
  {
    title: "Web + iOS + Android",
    pitch:
      "Full-stack product (web + mobile apps) shipped end-to-end — same flat rate for every brand, no surprise pricing.",
    bullets: ["Web app", "iOS + Android", "Backend + admin"],
    price: "Under ₹75K",
  },
  {
    title: "Custom Shopify Features",
    pitch:
      "Need something in your store that no app on the App Store offers? I'll build the missing feature as a custom Shopify app or theme extension.",
    bullets: ["Custom apps", "Theme extensions", "Storefront customization"],
  },
  {
    title: "Long-term Dev Partner",
    pitch:
      "5+ developers, 5+ yrs client experience. I solve roughly 90% of typical brand engineering issues end-to-end.",
    bullets: ["Team of 5+", "5+ yrs experience", "End-to-end ownership"],
  },
];

export type Partner = { name: string; category: string };

export const partners: Partner[] = [
  { name: "Gokwik", category: "Checkout" },
  { name: "Breeze", category: "Checkout" },
  { name: "Juspay", category: "Payments" },
  { name: "Aisensy", category: "WhatsApp Marketing" },
  { name: "Shiprocket", category: "Logistics" },
  { name: "Clickpost", category: "Tracking" },
  { name: "Interakt", category: "WhatsApp Business" },
  { name: "Wati", category: "WhatsApp Business" },
];

export const skills = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"] },
  { group: "Backend", items: ["Node.js", "Express", "REST APIs", "JWT Auth", "Webhooks"] },
  { group: "Commerce", items: ["Shopify", "Hydrogen", "Remix", "Storefront API", "Polaris", "Liquid"] },
  { group: "Database", items: ["MongoDB", "PostgreSQL", "Mongoose"] },
  { group: "Infra", items: ["Vercel", "AWS", "Fly.io", "Git"] },
];

export const languageStats = [
  { name: "JavaScript", value: 72 },
  { name: "TypeScript", value: 14 },
  { name: "HTML", value: 8 },
  { name: "CSS", value: 6 },
];

export const timeline = [
  { year: "2019", title: "Started the journey", desc: "Joined GitHub and began exploring web development while studying at NIIT." },
  { year: "2022", title: "First production work", desc: "Web developer intern at Matrix Infotech — shipped responsive sites and backend features." },
  { year: "2023", title: "Rezoni — React + Shopify", desc: "Web developer at Rezoni: custom Shopify themes, REST API integrations, scalable client work." },
  { year: "2024", title: "Full-Stack at Delhi Digital Co.", desc: "Shipped Indian GST Invoice, Snowflakes, and 50+ custom themes for live merchants." },
  { year: "2025", title: "Headless + Apps", desc: "Built PYKO and The Wouff on Hydrogen + Remix. Published Ultimate Variants & Swatches. Launched Express Supplemart quick-commerce." },
  { year: "2026", title: "Pushing the craft", desc: "Refining performance, design systems, and motion-led product UX." },
];

// Legacy compat — kept so existing GitHub repos block still works if referenced.
export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  homepage: string | null;
  updated: string;
  created: string;
  topics: string[];
};

export const repos: Repo[] = [];
