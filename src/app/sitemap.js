import {SITE_URL, SERVICE_SLUGS, CATEGORY_SLUGS, PAGE_SLUGS} from '@/lib/site'
import {getSitemapData} from '@/lib/sanity/queries'

export default async function sitemap() {
  const data = await getSitemapData().catch(() => null)

  const services = data?.services?.length
    ? data.services
    : SERVICE_SLUGS.map((slug) => ({slug, _updatedAt: new Date().toISOString()}))

  const categories = data?.categories?.length
    ? data.categories
    : CATEGORY_SLUGS.map((slug) => ({slug, _updatedAt: new Date().toISOString()}))

  const pages = data?.pages?.length
    ? data.pages
    : PAGE_SLUGS.map((slug) => ({slug, _updatedAt: new Date().toISOString()}))

  const posts = data?.posts || []

  const staticPages = [
    {url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0},
    {url: `${SITE_URL}/blog/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7},
    {url: `${SITE_URL}/categories/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8},
    {url: `${SITE_URL}/services/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8},
  ]

  const categoryPages = categories.map((cat) => ({
    url: `${SITE_URL}/categories/${cat.slug}/`,
    lastModified: cat._updatedAt || new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const servicePages = services.map((svc) => ({
    url: `${SITE_URL}/services/${svc.slug}/`,
    lastModified: svc._updatedAt || new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const cmsPages = pages.map((page) => ({
    url: `${SITE_URL}/${page.slug}/`,
    lastModified: page._updatedAt || new Date(),
    changeFrequency: 'yearly',
    priority: 0.5,
  }))

  const blogPages = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: post._updatedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticPages, ...categoryPages, ...servicePages, ...cmsPages, ...blogPages]
}
