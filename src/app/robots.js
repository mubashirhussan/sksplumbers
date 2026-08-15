import {getSiteSettings} from '@/lib/sanity/queries'
import {SITE_URL} from '@/lib/site'

export default async function robots() {
  const settings = await getSiteSettings().catch(() => null)
  const base = settings?.siteUrl || SITE_URL
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base}/sitemap.xml`,
  }
}
