import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, DEFAULT_SEO } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_SEO.title,
    template: "%s | SKS Plumbers",
  },
  description: DEFAULT_SEO.description,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: "SKS Plumbers",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50">{children}</body>
    </html>
  );
}
