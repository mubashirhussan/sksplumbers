import { Inter, Montserrat } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { SITE_URL, DEFAULT_SEO } from "@/lib/site";

const heading = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const body = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_SEO.title,
    template: "%s | Handyman Maintenance",
  },
  description: DEFAULT_SEO.description,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: "Handyman Maintenance",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} h-full overflow-x-hidden antialiased`}
    >
      <GoogleTagManager gtmId="GTM-PRQD36QD" />
      <body className="min-h-full flex flex-col overflow-x-hidden bg-white text-navy">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PRQD36QD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
