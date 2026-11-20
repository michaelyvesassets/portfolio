import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const siteTitle = "Michael Crowther — I Design & Build Digital Products";
const siteDescription =
  "Portfolio of Michael Crowther, an AI-native full-stack product developer building digital products including Meza, UFAILD and Flora.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s — Michael Crowther",
  },
  description: siteDescription,
  authors: [{ name: "Michael Crowther" }],
  openGraph: {
    type: "website",
    siteName: "Michael Crowther",
    title: siteTitle,
    description: siteDescription,
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
