import {getSitemapData, getSiteSettings} from '@/lib/sanity/queries'
import {SITE_URL} from '@/lib/site'

export default async function sitemap() {
  const [data, settings] = await Promise.all([
    getSitemapData().catch(() => null),
    getSiteSettings().catch(() => null),
  ])
  const base = settings?.siteUrl || SITE_URL
  const now = new Date()

  const staticPages = [
    {url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0},
    {url: `${base}/blog/`, lastModified: now, changeFrequency: 'weekly', priority: 0.7},
    {url: `${base}/categories/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8},
    {url: `${base}/services/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8},
    {url: `${base}/gallery/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7},
  ]

  const categoryPages = (data?.categories || []).map((cat) => ({
    url: `${base}/categories/${cat.slug}/`,
    lastModified: cat._updatedAt || now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const servicePages = (data?.services || []).map((svc) => ({
    url: `${base}/services/${svc.slug}/`,
    lastModified: svc._updatedAt || now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const cmsPages = (data?.pages || [])
    .filter((page) => !['services', 'categories', 'blog'].includes(page.slug))
    .map((page) => ({
      url: `${base}/${page.slug}/`,
      lastModified: page._updatedAt || now,
      changeFrequency: 'yearly',
      priority: 0.5,
    }))

  const blogPages = (data?.posts || []).map((post) => ({
    url: `${base}/blog/${post.slug}/`,
    lastModified: post._updatedAt || now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticPages, ...categoryPages, ...servicePages, ...cmsPages, ...blogPages]
}
