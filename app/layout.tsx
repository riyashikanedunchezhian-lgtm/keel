import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Keel — A quieter home for product work",
    template: "%s — Keel",
  },
  description:
    "Keel is a fast workspace for issues, projects, and cycles. Plan the work, track it, and close the tab.",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} h-full`}>
      <body className="min-h-full bg-ink font-sans text-paper antialiased">
        <a className="skip" href="#content">
          Skip to content
        </a>
        {children}
        <noscript>
          <style>{`.hero-reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
