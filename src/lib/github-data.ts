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
  publishedApps: "5",
  appRating: "5.0",
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
  /** Full-bleed banner image used as showreel background (overrides gradient) */
  bannerUrl?: string;
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
    bannerUrl: "/banners/indian-gst-invoice.jpg",
    tagline: "GST-compliant invoices for Indian Shopify stores — HSN codes, auto tax split, branded PDFs.",
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
    bannerUrl: "/banners/uvs-app.jpg",
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
    tagline: "One-click festive snowfall for any storefront — tunable, reversible, zero performance cost.",
    appStore: true,
    bannerUrl: "/banners/snowflakes.jpg",
  },

  {
    name: "Xenon Smart AI Cart & Upsell",
    shortName: "Xenon Smart Cart",
    category: "shopify-app",
    client: "Shopify App Store",
    year: "2025",
    url: "https://apps.shopify.com/smart-cart-ai-upsell",
    stack: ["Remix", "Shopify APIs", "Polaris", "Node", "MongoDB"],
    description: "Slide-out cart drawer with upsells, bundles and a free-shipping progress bar.",
    solves:
      "Shopify's default cart page drops shoppers out of the browsing flow and offers no upsell surface — merchants lose AOV at the exact moment intent is highest.",
    highlights: ["Slide-out cart drawer", "One-click upsells & bundles", "Shipping progress bar", "Cart analytics"],
    logoUrl:
      "https://cdn.shopify.com/app-store/listing_images/78fbc68547f4cc8682944642dc9284c8/icon/CJ6YvsbfwpUDEAE=.png",
    tagline: "Slide-out cart with upsells, bundles and a shipping progress bar — built for bigger orders.",
    appStore: true,
    bannerUrl: "/banners/xenon-smart-cart.jpg",
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
    bannerUrl: "/banners/ableys.jpg",
    tagline: "Native Android store for a sensory-products brand — OTP auth and a personalised onboarding flow.",
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
    bannerUrl: "/banners/pyko.jpg",
    tagline: "Made for Momentum — for wrists that chase what's next.",
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
    tagline: "Fully headless D2C storefront on Hydrogen + Remix — SSR speed with Shopify as the source of truth.",
    bannerUrl: "/banners/thewouff.jpg",
  },

  // ── Custom Shopify theme builds ────────────────────────────────────────
  {
    name: "Soulmaed",
    category: "theme",
    client: "Sustainable Fashion",
    year: "2025",
    url: "https://www.soulmaed.com/",
    stack: ["Shopify", "Liquid", "Tailwind"],
    description: "Custom Shopify theme — sustainable fashion brand with editorial storytelling.",
    solves:
      "Off-the-shelf themes can't deliver brand-specific storytelling, editorial product pages, or the conversion-tuned collection layouts the brand needed for its sustainability narrative.",
    bannerUrl: "/banners/soulmaed.jpg",
    tagline: "Nature's Fingerprint — every weave is a story of our Earth.",
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
    tagline: "Premium sports-lifestyle theme — editorial layouts and motion beyond stock Shopify.",
    bannerUrl: "/banners/elephantracquetclub.jpg",
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
    tagline: "Supplements storefront built around clear nutrition data and high-conversion product pages.",
    bannerUrl: "/banners/supplemart.jpg",
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
    tagline: "Fast, conversion-focused apparel storefront with custom collections and editorial PDPs.",
    bannerUrl: "/banners/toramoto.jpg",
  },
  {
    name: "THRDCULT",
    category: "theme",
    client: "Streetwear",
    year: "2025",
    url: "https://thrdcult.com/",
    stack: ["Shopify", "Liquid", "Tailwind"],
    description: "Custom Shopify theme — streetwear brand with editorial drop launches.",
    solves:
      "Streetwear brand needed a culture-first storefront with drop-style launches, lookbook-heavy collections, and a distinctive identity that themes off the store can't deliver.",
    bannerUrl: "/banners/thrdcult.jpg",
    tagline: "Born from the cracks of culture — for the misfits, the in-betweeners.",
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
    bannerUrl: "/banners/supplemart-express.jpg",
    tagline: "Blinkit-style quick commerce on a Shopify catalog — radius serviceability, own admin, 60–75 min ship.",
  },
  {
    name: "GoHyperLocal",
    category: "custom-dev",
    client: "Quick-Commerce SaaS · Made in India",
    year: "2025",
    url: "https://gohyperlocal-frontend.vercel.app/",
    stack: [
      "React",
      "Node",
      "Shiprocket API",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Express",
      "MongoDB",
      "AWS",
      "Cloudflare",
      "Delhivery + Bluedart",
      "Google Maps",
      "Redis",
    ],
    description:
      "Quick-commerce SaaS for Indian D2C stores — plug it onto your storefront and ship Blinkit-style fast delivery. Multi-courier (Shiprocket / Delhivery / Bluedart), geo-zoned serviceability, multi-tenant admin. Made in India, for India.",
    solves:
      "Indian D2C brands can't natively run 10–30 min hyperlocal delivery across multiple couriers with geo-zone serviceability — needs a full backend, a zone engine, and courier orchestration, not a plugin.",
    highlights: [
      "Zone engine",
      "Multi-tenant SaaS",
      "Multi-courier routing",
      "Made in India, for India",
    ],
    tagline: "Quick-commerce SaaS for Indian D2C — geo-zone serviceability and multi-courier routing.",
    bannerUrl: "/banners/gohyperlocal.jpg",
  },
  {
    name: "SuriFresh Extract",
    category: "custom-dev",
    client: "Fresh Produce D2C",
    year: "2025",
    url: "https://surifreshextract.com/",
    stack: ["React", "Vite", "Tailwind CSS"],
    description: "Cold-pressed juice / fresh produce storefront — React + Vite + Tailwind.",
    solves:
      "Fresh-produce D2C brand needed subscription + delivery scheduling that off-the-shelf platforms don't support.",
    tagline: "Cold-pressed juice storefront with subscriptions and delivery scheduling.",
    bannerUrl: "/banners/surifreshextract.jpg",
  },
  {
    name: "Xenon Commerce",
    category: "custom-dev",
    client: "Shopify Design & Dev Studio",
    year: "2026",
    url: "https://xenoncommerce.com/",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "Lenis", "Nodemailer", "Vercel"],
    description:
      "Studio site for a Shopify design and development practice — motion-led marketing site on Next.js 16 with a server-side enquiry pipeline.",
    solves:
      "An agency selling design work is judged on its own site first. Off-the-shelf templates undercut that pitch, so this is a bespoke Next.js build — scroll-driven motion, a case-study system for shipped stores, and enquiries handled server-side rather than through a third-party form widget.",
    highlights: ["Next.js 16 + React 19", "GSAP + Lenis motion", "Case-study system", "Server-side enquiry flow"],
    bannerUrl: "/banners/xenon-commerce.jpg",
    tagline: "Design that sells, build that scales — the studio site, on Next.js 16 with scroll-driven motion.",
  },
  {
    name: "BookMyCab",
    category: "custom-dev",
    client: "Cab Booking Platform · Multi-Operator SaaS",
    year: "2025",
    url: "https://bookmycab.co",
    stack: [
      "React",
      "Node",
      "Google Maps API",
      "Vite",
      "Tailwind CSS",
      "Express",
      "AWS",
      "Cloudflare",
      "MongoDB Atlas",
      "Razorpay",
      "Twilio",
    ],
    description:
      "Cab booking platform — multi-operator SaaS that any local cab operator can launch under their own brand. Live Google Maps, real-time ride flow, dispatcher admin, fare engine. React + Vite on Cloudflare; Node on AWS; MongoDB Atlas for storage.",
    solves:
      "Local cab operators can't ship their own customer-facing booking on top of Uber/Ola — and they don't want to give up margins or driver ownership to a third-party SaaS. BookMyCab is a multi-tenant platform any operator can launch under their own brand with their own drivers, dispatchers, and fare rules.",
    highlights: [
      "Multi-operator SaaS",
      "Live Maps + dispatcher",
      "Fare + zone engine",
      "Cloudflare edge",
    ],
    tagline: "White-label cab-booking SaaS — live maps, dispatcher admin and a fare engine per operator.",
  },
];

// Featured showreel — strongest 6 real projects in display order.
export type CaseStudy = (typeof projects)[number];

export const caseStudies: CaseStudy[] = [
  projects.find((p) => p.name === "PYKO")!,
  projects.find((p) => p.name === "Soulmaed")!,
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
  {
    title: "Headless Storefront Build",
    pitch:
      "For brands ready to outgrow Shopify themes. Hydrogen + Remix SSR storefronts with Storefront GraphQL, custom checkout, and motion-led UX — Shopify stays as the source of truth.",
    bullets: ["Hydrogen SSR", "Storefront GraphQL", "Motion + checkout"],
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
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Liquid", "Framer Motion", "GSAP"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express", "Python", "REST APIs", "GraphQL", "Webhooks", "JWT / OAuth"],
  },
  {
    group: "Commerce",
    items: ["Shopify", "Hydrogen", "Remix", "Storefront API", "Admin API", "Polaris"],
  },
  {
    group: "Database",
    items: ["MongoDB", "PostgreSQL", "Supabase", "Mongoose"],
  },
  {
    group: "Cloud",
    items: ["AWS", "EC2", "S3", "Cloudflare", "Vercel", "Fly.io"],
  },
  {
    group: "DevOps",
    items: ["Docker", "Git", "GitHub Actions", "CI / CD"],
  },
  {
    group: "Integrations",
    items: ["Twilio", "SMTP", "OAuth2", "Razorpay", "PayU Breeze", "Shiprocket"],
  },
  {
    group: "System Design",
    items: ["Multi-tenant SaaS", "Event-driven", "SSR / SSG", "Webhook orchestration", "Performance"],
  },
];

export const languageStats = [
  { name: "JavaScript", value: 72 },
  { name: "TypeScript", value: 14 },
  { name: "HTML", value: 8 },
  { name: "CSS", value: 6 },
];

export type Experience = {
  /** Free-text so real month ranges can be dropped in without touching the UI. */
  period: string;
  role: string;
  company: string;
  current?: boolean;
  points: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    period: "2024 — Present",
    role: "Full-Stack Engineer",
    company: "Delhi Digital Co.",
    current: true,
    points: [
      "Published 4 apps to the Shopify App Store — GST invoicing, variant swatches, cart upsells and seasonal effects.",
      "Built PYKO and The Wouff as headless Hydrogen + Remix storefronts.",
      "Shipped 50+ custom themes and launched Express Supplemart quick-commerce.",
    ],
    stack: ["Remix", "Hydrogen", "Node", "MongoDB", "GraphQL", "Polaris"],
  },
  {
    period: "2023",
    role: "Web Developer",
    company: "Rezoni",
    points: [
      "Built custom Shopify themes for client brands.",
      "Integrated REST APIs and third-party services across storefronts.",
    ],
    stack: ["Shopify", "Liquid", "React", "REST APIs"],
  },
  {
    period: "2022",
    role: "Web Developer Intern",
    company: "Matrix Infotech",
    points: [
      "First production work — shipped responsive marketing sites.",
      "Wrote backend features against live client requirements.",
    ],
    stack: ["JavaScript", "HTML / CSS", "Node"],
  },
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


export type Education = {
  institution: string;
  short: string;
  qualification: string;
  period: string;
  grade?: string;
  focus?: string[];
};

export const education: Education[] = [
  {
    institution: "National Institute of Information Technology",
    short: "NIIT",
    qualification: "GNIIT — Information Technology",
    period: "Aug 2017 — Aug 2020",
    grade: "A+",
    focus: ["Java", "Web Development", "Android", "Spring", "Hibernate", "SQL Server"],
  },
  {
    institution: "Hemwati Nandan Bahuguna Garhwal University",
    short: "HNB Garhwal University",
    qualification: "BA — Micro Economics",
    period: "Aug 2015 — Aug 2020",
    grade: "A",
  },
];

export type Certification = {
  name: string;
  issuer: string;
  issued: string;
  credentialId: string;
  /** Verification link — fill in to turn the card into a link. */
  url?: string;
};

export const certifications: Certification[] = [
  {
    name: "JavaScript and Node JS Concepts",
    issuer: "LetsUpgrade",
    issued: "Sep 2022",
    credentialId: "LUENJSSEP122160",
  },
  {
    name: "Core Java Concepts",
    issuer: "LetsUpgrade",
    issued: "Sep 2022",
    credentialId: "LUEJAVASEP122218",
  },
];
