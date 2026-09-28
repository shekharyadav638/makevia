import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Makevia — Find Manufacturers & Suppliers in India for Your Product";
const description =
  "Have a product idea? Makevia helps Indian founders find verified manufacturers, private label and contract manufacturing partners, packaging, testing and logistics services.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://makevia.in/#organization",
      name: "Makevia",
      url: "https://makevia.in",
      logo: "https://makevia.in/icon.svg",
      description,
      areaServed: "IN",
    },
    {
      "@type": "WebSite",
      "@id": "https://makevia.in/#website",
      name: "Makevia",
      url: "https://makevia.in",
      inLanguage: "en-IN",
      publisher: { "@id": "https://makevia.in/#organization" },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://makevia.in"),
  title,
  description,
  applicationName: "Makevia",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Makevia",
    title,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
