import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/sanity/queries";
import { SITE_URL } from "@/lib/site";

const heading = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const body = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const settings = await getSiteSettings()
  const siteUrl = settings?.siteUrl || SITE_URL
  const siteName = settings?.siteName || ''
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings?.defaultSeoTitle || siteName,
      template: siteName ? `%s | ${siteName}` : '%s',
    },
    description: settings?.defaultSeoDescription || '',
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: 'en_AE',
      siteName,
    },
  }
}

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
      <body className="min-h-full flex flex-col overflow-x-hidden bg-white text-navy">{children}</body>
    </html>
  );
}
