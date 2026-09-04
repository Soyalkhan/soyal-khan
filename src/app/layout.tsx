import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

/* Fraunces — variable soft-serif. SOFT/WONK/opsz are exposed so headings can
   be tuned for display sizes in globals.css via font-variation-settings. */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soyal Khan — Full-Stack & Shopify Engineer",
  description:
    "Full-stack engineer in New Delhi. 3 published Shopify apps, 100+ storefronts, headless Hydrogen builds and custom commerce platforms.",
  metadataBase: new URL("https://soyalkhan.dev"),
  openGraph: {
    title: "Soyal Khan — Full-Stack & Shopify Engineer",
    description:
      "3 published Shopify apps · 100+ storefronts · headless Hydrogen/Remix · custom commerce platforms.",
    url: "https://soyalkhan.dev",
    siteName: "Soyal Khan",
    images: ["/my/mine.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soyal Khan — Full-Stack & Shopify Engineer",
    description: "3 published Shopify apps · 100+ storefronts · headless Hydrogen/Remix.",
    images: ["/my/mine.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-background text-body antialiased">{children}</body>
    </html>
  );
}
