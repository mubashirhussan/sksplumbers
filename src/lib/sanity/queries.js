import {client} from '@/sanity/client'
import {DEFAULT_SEO, SITE_NAME} from '@/lib/site'
import {getFallbackHeader, getFallbackFooter} from '@/lib/fallback-navigation'
import {
  getAllFallbackServices,
  getAllFallbackCategories,
  getFallbackService,
  getFallbackCategory,
  getFallbackPage,
  getFallbackServicesByCategory,
} from '@/lib/fallback-content'

export const REVALIDATE = {next: {revalidate: 60}}

const seoProjection = `seo{
  metaTitle,
  metaDescription,
  "ogImage": ogImage.asset->url,
  noIndex
}`

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName,
  siteUrl,
  tagline,
  defaultSeoTitle,
  defaultSeoDescription,
  phone,
  email,
  address,
  city,
  "logo": logo.asset->url
}`

export const SITE_HEADER_QUERY = `*[_type == "siteHeader"][0]{
  announcementText,
  showPhoneInBar,
  logoPrimary,
  logoSecondary,
  "logoImage": logoImage.asset->url,
  menuItems[]{
    label,
    href,
    openInNewTab,
    children[]{label, href, openInNewTab}
  },
  ctaButton{enabled, label, href, openInNewTab}
}`

export const SITE_FOOTER_QUERY = `*[_type == "siteFooter"][0]{
  brandTitle,
  description,
  columns[]{
    title,
    links[]{label, href, openInNewTab}
  },
  copyrightText,
  bottomNote
}`

export const HOME_PAGE_QUERY = `*[_type == "homePage"][0]{
  heroHeading,
  heroText,
  "heroImage": heroImage.asset->url,
  heroButtons[]{
    _key,
    label,
    href,
    style,
    linkType,
    openInNewTab
  },
  sections[]{
    _type,
    _key,
    heading,
    show,
    description,
    buttonText,
    showPhone,
    "selectedServices": selectedServices[]->{
      _id,
      title,
      slug,
      excerpt,
      "image": image.asset->url
    },
    "selectedCategories": selectedCategories[]->{
      _id,
      title,
      slug,
      description,
      "image": image.asset->url
    },
    "selectedPosts": selectedPosts[]->{
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      "image": image.asset->url
    }
  },
  ${seoProjection}
}`

const fallbackHomePage = {
  heroHeading: 'Professional Plumbing Services in Dubai',
  heroText:
    'Licensed plumbers available 24/7. Emergency repairs, water pump services, drain cleaning & more.',
  heroButtons: [
    {
      label: 'Get Free Quote',
      linkType: 'internal',
      href: '/contact',
      style: 'primary',
      openInNewTab: false,
    },
    {
      label: 'View All Services',
      linkType: 'internal',
      href: '/services',
      style: 'secondary',
      openInNewTab: false,
    },
  ],
  sections: [
    {_type: 'homeServices', _key: 'services', heading: 'Our Services'},
    {_type: 'homeCategories', _key: 'categories', heading: 'Service Categories'},
    {_type: 'homeBlog', _key: 'blog', heading: 'Latest from Blog', show: true},
    {
      _type: 'homeContactBanner',
      _key: 'cta',
      heading: 'Need a Plumber in Dubai?',
      description:
        'SKS Plumbers offers fast, affordable plumbing services across Dubai. Available 24/7 for emergencies.',
      buttonText: 'Get Free Quote',
      showPhone: true,
    },
  ],
}

export const SERVICES_QUERY = `*[_type == "service" && defined(slug.current)]|order(title asc){
  _id,
  title,
  slug,
  excerpt,
  "image": image.asset->url,
  "category": category->{title, slug},
  _updatedAt,
  ${seoProjection}
}`

export const SERVICE_BY_SLUG_QUERY = `*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  body,
  "image": image.asset->url,
  "category": category->{title, slug},
  _updatedAt,
  ${seoProjection}
}`

export const SERVICE_SLUGS_QUERY = `*[_type == "service" && defined(slug.current)].slug.current`

export const CATEGORIES_QUERY = `*[_type == "category" && defined(slug.current)]|order(title asc){
  _id,
  title,
  slug,
  description,
  "image": image.asset->url,
  _updatedAt,
  ${seoProjection}
}`

export const CATEGORY_BY_SLUG_QUERY = `*[_type == "category" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  body,
  "image": image.asset->url,
  _updatedAt,
  ${seoProjection}
}`

export const CATEGORY_SLUGS_QUERY = `*[_type == "category" && defined(slug.current)].slug.current`

export const SERVICES_BY_CATEGORY_QUERY = `*[_type == "service" && category->slug.current == $slug]|order(title asc){
  _id,
  title,
  slug,
  excerpt,
  "image": image.asset->url
}`

export const POSTS_QUERY = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  "image": image.asset->url,
  _updatedAt,
  ${seoProjection}
}`

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  body,
  publishedAt,
  "image": image.asset->url,
  _updatedAt,
  ${seoProjection}
}`

export const POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)].slug.current`

export const PAGE_BY_SLUG_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  body,
  "image": image.asset->url,
  _updatedAt,
  ${seoProjection}
}`

export const PAGE_SLUGS_QUERY = `*[_type == "page" && defined(slug.current)].slug.current`

export const SITEMAP_QUERY = `{
  "services": *[_type == "service" && defined(slug.current)]{ "slug": slug.current, "_updatedAt": _updatedAt },
  "categories": *[_type == "category" && defined(slug.current)]{ "slug": slug.current, "_updatedAt": _updatedAt },
  "posts": *[_type == "post" && defined(slug.current)]{ "slug": slug.current, "_updatedAt": _updatedAt },
  "pages": *[_type == "page" && defined(slug.current)]{ "slug": slug.current, "_updatedAt": _updatedAt }
}`

export async function getSiteSettings() {
  const data = await client.fetch(SITE_SETTINGS_QUERY, {}, REVALIDATE)
  return (
    data || {
      siteName: SITE_NAME,
      defaultSeoTitle: DEFAULT_SEO.title,
      defaultSeoDescription: DEFAULT_SEO.description,
    }
  )
}

export async function getSiteHeader() {
  const data = await client.fetch(SITE_HEADER_QUERY, {}, REVALIDATE)
  if (!data?.menuItems?.length) return getFallbackHeader()
  return normalizeSiteHeader(data)
}

export async function getSiteFooter() {
  const data = await client.fetch(SITE_FOOTER_QUERY, {}, REVALIDATE)
  if (!data?.columns?.length) return getFallbackFooter()
  return normalizeSiteFooter(data)
}

function normalizeInternalHref(href) {
  if (!href) return href
  const withSlash = href.startsWith('/') ? href : `/${href}`
  return withSlash.replace(/^\/pages\//, '/')
}

function normalizeButtonHref(href, linkType) {
  if (!href) return href
  if (
    linkType === 'external' ||
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return href
  }
  return normalizeInternalHref(href)
}

function normalizeNavLink(link) {
  if (!link) return link
  return {
    ...link,
    href: normalizeInternalHref(link.href),
    children: link.children?.map(normalizeNavLink),
  }
}

function normalizeSiteHeader(data) {
  if (!data) return data
  return {
    ...data,
    menuItems: data.menuItems?.map(normalizeNavLink),
    ctaButton: data.ctaButton?.href
      ? {...data.ctaButton, href: normalizeInternalHref(data.ctaButton.href)}
      : data.ctaButton,
  }
}

function normalizeSiteFooter(data) {
  if (!data) return data
  return {
    ...data,
    columns: data.columns?.map((column) => ({
      ...column,
      links: column.links?.map((link) => ({
        ...link,
        href: normalizeInternalHref(link.href),
      })),
    })),
  }
}

function normalizeHomePage(data) {
  if (!data?.heroHeading) return fallbackHomePage

  const heroButtons = (data.heroButtons || [])
    .filter((button) => button?.label && button?.href)
    .map((button) => ({
      ...button,
      href: normalizeButtonHref(button.href, button.linkType),
    }))

  return {
    ...data,
    heroButtons: heroButtons.length ? heroButtons : fallbackHomePage.heroButtons,
    sections: data.sections?.length ? data.sections : fallbackHomePage.sections,
  }
}

export async function getHomePage() {
  const data = await client.fetch(HOME_PAGE_QUERY, {}, REVALIDATE)
  return normalizeHomePage(data)
}

export async function getServices() {
  const data = await client.fetch(SERVICES_QUERY, {}, REVALIDATE)
  return data?.length ? data : getAllFallbackServices()
}

export async function getServiceBySlug(slug) {
  const data = await client.fetch(SERVICE_BY_SLUG_QUERY, {slug}, REVALIDATE)
  return data || getFallbackService(slug)
}

export async function getServiceSlugs() {
  const slugs = await client.fetch(SERVICE_SLUGS_QUERY, {}, REVALIDATE)
  return slugs?.length ? slugs : null
}

export async function getCategories() {
  const data = await client.fetch(CATEGORIES_QUERY, {}, REVALIDATE)
  return data?.length ? data : getAllFallbackCategories()
}

export async function getCategoryBySlug(slug) {
  const data = await client.fetch(CATEGORY_BY_SLUG_QUERY, {slug}, REVALIDATE)
  return data || getFallbackCategory(slug)
}

export async function getCategorySlugs() {
  const slugs = await client.fetch(CATEGORY_SLUGS_QUERY, {}, REVALIDATE)
  return slugs?.length ? slugs : null
}

export async function getServicesByCategory(slug) {
  const data = await client.fetch(SERVICES_BY_CATEGORY_QUERY, {slug}, REVALIDATE)
  return data?.length ? data : getFallbackServicesByCategory(slug)
}

export async function getPosts() {
  return client.fetch(POSTS_QUERY, {}, REVALIDATE)
}

export async function getPostBySlug(slug) {
  return client.fetch(POST_BY_SLUG_QUERY, {slug}, REVALIDATE)
}

export async function getPostSlugs() {
  const slugs = await client.fetch(POST_SLUGS_QUERY, {}, REVALIDATE)
  return slugs?.length ? slugs : null
}

export async function getPageBySlug(slug) {
  const data = await client.fetch(PAGE_BY_SLUG_QUERY, {slug}, REVALIDATE)
  return data || getFallbackPage(slug)
}

export async function getPageSlugs() {
  const slugs = await client.fetch(PAGE_SLUGS_QUERY, {}, REVALIDATE)
  return slugs?.length ? slugs : null
}

export async function getSitemapData() {
  return client.fetch(SITEMAP_QUERY, {}, REVALIDATE)
}
