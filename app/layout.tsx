import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mhmmditto.vercel.app"),
  title: "Muhammad Ditto | Full-Stack Creative Developer",
  description:
    "Portfolio of Muhammad Ditto (Ido) — Full-stack developer building interactive digital experiences with React, Three.js, and Node.js. Based in Tangerang, Indonesia.",
  authors: [{ name: "Muhammad Ditto" }],
  keywords: [
    "Muhammad Ditto",
    "Ido",
    "creative developer",
    "full-stack",
    "React Native",
    "Next.js",
    "Portfolio",
    "Tangerang",
    "Indonesia",
    "web developer",
    "software engineer",
  ],
  robots: "index, follow",
  alternates: {
    canonical: "https://mhmmditto.vercel.app/",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/icons/icon-192.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ditto",
  },
  openGraph: {
    type: "website",
    url: "https://mhmmditto.vercel.app/",
    title: "Muhammad Ditto | Full-Stack Creative Developer",
    description:
      "Explore the interactive portfolio of Muhammad Ditto — a creative full-stack developer crafting immersive digital experiences with React, Three.js, and modern web technologies.",
    siteName: "Muhammad Ditto Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Ditto Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ditto | Creative Developer",
    description:
      "Full-stack developer building interactive digital experiences. Check out my macOS-themed portfolio.",
    creator: "@mhmmdittoo",
    images: ["/og-image.png"],
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Ditto",
  alternateName: "Ido",
  url: "https://mhmmditto.vercel.app",
  image: "https://mhmmditto.vercel.app/github-avatar.jpg",
  jobTitle: "Full-Stack Creative Developer",
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Three.js",
    "React Native",
    "Flutter",
  ],
  sameAs: [
    "https://github.com/Idoo0oo",
    "https://linkedin.com/in/muhammad-ditto",
    "https://instagram.com/mhmmdittoo._",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tangerang",
    addressCountry: "ID",
  },
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Muhammad Ditto Portfolio",
  url: "https://mhmmditto.vercel.app",
  description:
    "Interactive portfolio of Muhammad Ditto, a creative full-stack developer based in Tangerang, Indonesia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/wallpapers/macos_landscape_day.webp" type="image/webp" />
        <link rel="preload" as="image" href="/wallpapers/macos_landscape_night.webp" type="image/webp" />
      </head>
      <body className="h-full w-full bg-[#0a0a0a] text-white overflow-hidden select-none" suppressHydrationWarning>
        <script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        {children}
      </body>
    </html>
  );
}
