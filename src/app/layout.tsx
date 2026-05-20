import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soyal Khan — Full-Stack Engineer",
  description:
    "Soyal Khan — Full-Stack Engineer based in New Delhi, India. Shipping headless Shopify storefronts, custom dashboards, apps, and end-to-end web products.",
  metadataBase: new URL("https://soyalkhan.dev"),
  openGraph: {
    title: "Soyal Khan — Full-Stack Engineer",
    description:
      "Headless Shopify, Hydrogen/Remix, Node, MongoDB. Full-stack engineer crafting products that ship.",
    url: "https://soyalkhan.dev",
    siteName: "Soyal Khan",
    images: ["/portrait.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soyal Khan — Full-Stack Engineer",
    description: "Headless Shopify, Hydrogen/Remix, Node, MongoDB.",
    images: ["/portrait.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrument.variable} ${inter.variable} ${geistMono.variable}`}
    >
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
