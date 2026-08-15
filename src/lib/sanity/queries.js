import {client} from '@/sanity/client'

export const REVALIDATE = {next: {revalidate: 60}}

const seoProjection = `seo{
  metaTitle,
  metaDescription,
  "ogImage": ogImage.asset->url,
  noIndex
}`

const imageUrl = `"image": image.asset->url, "imageAlt": image.alt`

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName,
  siteUrl,
  tagline,
  "logo": logo.asset->url,
  "logoAlt": logo.alt,
  "defaultOgImage": defaultOgImage.asset->url,
  phone,
  whatsappNumber,
  whatsappMessage,
  email,
  address,
  city,
  workingHours,
  socialLinks[]{platform, url},
  callButtonLabel,
  whatsappButtonLabel,
  whatsappButtonSubtext,
  quoteForm{
    title,
    submitLabel,
    nameLabel,
    phoneLabel,
    emailLabel,
    serviceLabel,
    servicePlaceholder,
    messageLabel,
    serviceOptions
  },
  trustItems[]{icon, title, text},
  howItWorksEyebrow,
  howItWorksHeading,
  howItWorksSteps[]{step, icon, title, text},
  whyChooseHeading,
  whyChoosePoints,
  aboutStats[]{value, label},
  serviceAreasHeading,
  serviceAreas,
  needServiceEyebrow,
  needServiceHeading,
  labels,
  defaultSeoTitle,
  defaultSeoDescription
}`

export const SITE_HEADER_QUERY = `*[_type == "siteHeader"][0]{
  announcementText,
  showPhoneInBar,
  logoPrimary,
  logoSecondary,
  logoTagline,
  "logoImage": logoImage.asset->url,
  "logoImageAlt": logoImage.alt,
  hideLogoText,
  menuItems[]{
    label,
    href,
    openInNewTab,
    children[]{label, href, openInNewTab}
  },
  ctaButton{enabled, label, href, linkType, openInNewTab}
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

const serviceCardProjection = `_id, title, slug, excerpt, icon, highlights, ${imageUrl}, "category": category->{title, slug}`

export const HOME_PAGE_QUERY = `*[_type == "homePage"][0]{
  heroHeading,
  heroText,
  "heroImage": heroImage.asset->url,
  "heroImageAlt": heroImage.alt,
  heroButtons[]{
    _key,
    label,
    href,
    style,
    linkType,
    openInNewTab
  },
  heroTrust[]{icon, title, text},
  emergencyCard{enabled, title, subtitle, badge, icon},
  sections[]{
    _type,
    _key,
    heading,
    show,
    description,
    buttonText,
    buttonHref,
    showPhone,
    viewAllLabel,
    viewAllHref,
    "selectedServices": selectedServices[]->{${serviceCardProjection}},
    "selectedCategories": selectedCategories[]->{
      _id, title, slug, description, ${imageUrl}
    },
    "selectedPosts": selectedPosts[]->{
      _id, title, slug, excerpt, publishedAt, ${imageUrl}
    }
  },
  ${seoProjection}
}`

export const SERVICES_QUERY = `*[_type == "service" && defined(slug.current)]|order(title asc){
  ${serviceCardProjection},
  _updatedAt,
  ${seoProjection}
}`

export const SERVICE_BY_SLUG_QUERY = `*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  icon,
  highlights,
  checklist,
  faqs[]{question, answer},
  body,
  ${imageUrl},
  "category": category->{title, slug},
  _updatedAt,
  ${seoProjection}
}`

export const SERVICE_SLUGS_QUERY = `*[_type == "service" && defined(slug.current)].slug.current`

export const CATEGORIES_QUERY = `*[_type == "category" && defined(slug.current)]|order(title asc){
  _id, title, slug, description, ${imageUrl}, _updatedAt, ${seoProjection}
}`

export const CATEGORY_BY_SLUG_QUERY = `*[_type == "category" && slug.current == $slug][0]{
  _id, title, slug, description, body, ${imageUrl}, _updatedAt, ${seoProjection}
}`

export const CATEGORY_SLUGS_QUERY = `*[_type == "category" && defined(slug.current)].slug.current`

export const SERVICES_BY_CATEGORY_QUERY = `*[_type == "service" && category->slug.current == $slug]|order(title asc){
  ${serviceCardProjection}
}`

export const POSTS_QUERY = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc){
  _id, title, slug, excerpt, publishedAt, ${imageUrl}, _updatedAt, ${seoProjection}
}`

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id, title, slug, excerpt, body, publishedAt, ${imageUrl}, _updatedAt, ${seoProjection}
}`

export const POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)].slug.current`

export const PAGE_BY_SLUG_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  bannerSubtitle,
  eyebrow,
  body,
  ${imageUrl},
  missionTitle,
  missionText,
  visionTitle,
  visionText,
  quoteFormTitle,
  quoteFormSubmitLabel,
  _updatedAt,
  ${seoProjection}
}`

export const PAGE_SLUGS_QUERY = `*[_type == "page" && defined(slug.current)].slug.current`

export const GALLERY_PAGE_QUERY = `*[_type == "galleryPage"][0]{
  title,
  subtitle,
  filters[]{id, label},
  images[]{
    _key,
    alt,
    category,
    "src": image.asset->url,
    "imageAlt": image.alt
  },
  ${seoProjection}
}`

export const SITEMAP_QUERY = `{
  "services": *[_type == "service" && defined(slug.current)]{ "slug": slug.current, "_updatedAt": _updatedAt },
  "categories": *[_type == "category" && defined(slug.current)]{ "slug": slug.current, "_updatedAt": _updatedAt },
  "posts": *[_type == "post" && defined(slug.current)]{ "slug": slug.current, "_updatedAt": _updatedAt },
  "pages": *[_type == "page" && defined(slug.current)]{ "slug": slug.current, "_updatedAt": _updatedAt }
}`

function normalizeInternalHref(href) {
  if (!href) return href
  const withSlash = href.startsWith('/') ? href : `/${href}`
  return withSlash.replace(/^\/pages\//, '/')
}

function normalizeButtonHref(href, linkType) {
  if (!href) return href
  if (
    linkType === 'external' ||
    linkType === 'phone' ||
    linkType === 'whatsapp' ||
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

export async function getSiteSettings() {
  return (await client.fetch(SITE_SETTINGS_QUERY, {}, REVALIDATE)) || {}
}

export async function getSiteHeader() {
  const data = await client.fetch(SITE_HEADER_QUERY, {}, REVALIDATE)
  if (!data) return {menuItems: []}
  return {
    ...data,
    menuItems: data.menuItems?.map(normalizeNavLink) || [],
    ctaButton: data.ctaButton?.href
      ? {...data.ctaButton, href: normalizeInternalHref(data.ctaButton.href)}
      : data.ctaButton,
  }
}

export async function getSiteFooter() {
  const data = await client.fetch(SITE_FOOTER_QUERY, {}, REVALIDATE)
  if (!data) return {columns: []}
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

async function hydrateHomeSections(home) {
  if (!home?.sections?.length) return home

  let sections = await Promise.all(
    home.sections.map(async (section) => {
      if (section._type === 'homeServices' && !section.selectedServices?.length) {
        const services = await getServices()
        return {...section, selectedServices: (services || []).slice(0, 6)}
      }
      if (section._type === 'homeCategories' && !section.selectedCategories?.length) {
        const categories = await getCategories()
        return {...section, selectedCategories: (categories || []).slice(0, 6)}
      }
      if (section._type === 'homeBlog' && section.show !== false && !section.selectedPosts?.length) {
        const posts = await getPosts()
        return {...section, selectedPosts: (posts || []).slice(0, 3)}
      }
      return section
    }),
  )

  if (!sections.some((section) => section._type === 'homeTrust')) {
    const idx = sections.findIndex((section) => section._type === 'homeServices')
    const insertAt = idx >= 0 ? idx + 1 : sections.length
    sections = [...sections]
    sections.splice(insertAt, 0, {_type: 'homeTrust', _key: 'trust-auto'})
  }

  return {...home, sections}
}

export async function getHomePage() {
  const data = await client.fetch(HOME_PAGE_QUERY, {}, REVALIDATE)
  if (!data) return null
  const heroButtons = (data.heroButtons || [])
    .filter((button) => button?.label && (button?.href || button?.linkType === 'phone' || button?.linkType === 'whatsapp'))
    .map((button) => ({
      ...button,
      href: normalizeButtonHref(button.href, button.linkType),
    }))
  return hydrateHomeSections({...data, heroButtons})
}

export async function getServices() {
  return (await client.fetch(SERVICES_QUERY, {}, REVALIDATE)) || []
}

export async function getServiceBySlug(slug) {
  return client.fetch(SERVICE_BY_SLUG_QUERY, {slug}, REVALIDATE)
}

export async function getServiceSlugs() {
  return (await client.fetch(SERVICE_SLUGS_QUERY, {}, REVALIDATE)) || []
}

export async function getCategories() {
  return (await client.fetch(CATEGORIES_QUERY, {}, REVALIDATE)) || []
}

export async function getCategoryBySlug(slug) {
  return client.fetch(CATEGORY_BY_SLUG_QUERY, {slug}, REVALIDATE)
}

export async function getCategorySlugs() {
  return (await client.fetch(CATEGORY_SLUGS_QUERY, {}, REVALIDATE)) || []
}

export async function getServicesByCategory(slug) {
  return (await client.fetch(SERVICES_BY_CATEGORY_QUERY, {slug}, REVALIDATE)) || []
}

export async function getPosts() {
  return (await client.fetch(POSTS_QUERY, {}, REVALIDATE)) || []
}

export async function getPostBySlug(slug) {
  return client.fetch(POST_BY_SLUG_QUERY, {slug}, REVALIDATE)
}

export async function getPostSlugs() {
  return (await client.fetch(POST_SLUGS_QUERY, {}, REVALIDATE)) || []
}

export async function getPageBySlug(slug) {
  return client.fetch(PAGE_BY_SLUG_QUERY, {slug}, REVALIDATE)
}

export async function getPageSlugs() {
  return (await client.fetch(PAGE_SLUGS_QUERY, {}, REVALIDATE)) || []
}

export async function getGalleryPage() {
  return client.fetch(GALLERY_PAGE_QUERY, {}, REVALIDATE)
}

export async function getSitemapData() {
  return client.fetch(SITEMAP_QUERY, {}, REVALIDATE)
}
