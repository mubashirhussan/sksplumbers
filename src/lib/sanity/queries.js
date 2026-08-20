import {client} from '@/sanity/client'
import {DEFAULT_SEO, HANDYMAN_SERVICE_SLUGS, SITE_NAME, SITE_URL, SERVICE_SLUGS} from '@/lib/site'
import {getFallbackHeader, getFallbackFooter} from '@/lib/fallback-navigation'
import {
  getAllFallbackServices,
  getAllFallbackCategories,
  getFallbackService,
  getFallbackCategory,
  getFallbackPage,
  getFallbackServicesByCategory,
} from '@/lib/fallback-content'
import {IMAGES, withServiceImage, withCategoryImage} from '@/lib/images'
import {SERVICE_MENU_ITEMS, HERO_TRUST} from '@/lib/site-content'

export const REVALIDATE =
  process.env.NODE_ENV === 'production'
    ? {next: {revalidate: 60}}
    : {cache: 'no-store'}

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
  whatsappNumber,
  whatsappMessage,
  email,
  address,
  city,
  workingHours,
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
  "logo": logo.asset->url
}`

export const SITE_HEADER_QUERY = `*[_type == "siteHeader"][0]{
  announcementText,
  showPhoneInBar,
  logoPrimary,
  logoSecondary,
  logoTagline,
  hideLogoText,
  "logoImage": logoImage.asset->url,
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

export const HOME_PAGE_QUERY = `*[_type == "homePage"][0]{
  heroHeadingPrefix,
  heroHeadingHighlight,
  heroHeadingSuffix,
  heroHeading,
  heroText,
  heroTextHighlights,
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
    eyebrow,
    show,
    description,
    buttonText,
    buttonHref,
    showPhone,
    showForm,
    showDetails,
    cardButtonLabel,
    viewAllLabel,
    viewAllHref,
    imagePosition,
    theme,
    useSiteAreas,
    areas,
    useSitePoints,
    points,
    items[]{icon, title, text},
    faqs[]{question, answer},
    "image": image.asset->url,
    "imageAlt": image.alt,
    "selectedServices": selectedServices[]->{
      _id,
      title,
      slug,
      excerpt,
      icon,
      highlights,
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
  heroHeadingPrefix: "Dubai's Trusted",
  heroHeadingHighlight: 'Handyman & Maintenance',
  heroHeadingSuffix: 'Experts',
  heroHeading: "Dubai's Trusted Handyman & Maintenance Experts",
  heroText: 'One Call for All Your Home, Office & Villa Maintenance Needs.',
  heroTextHighlights: ['One Call', 'Office'],
  heroImage: IMAGES.hero,
  heroButtons: [
    {
      label: 'WhatsApp Now',
      linkType: 'whatsapp',
      href: '',
      style: 'primary',
      openInNewTab: true,
    },
    {
      label: 'Call Now',
      linkType: 'phone',
      href: '',
      style: 'secondary',
      openInNewTab: false,
    },
  ],
  heroTrust: HERO_TRUST,
  emergencyCard: {
    enabled: true,
    title: 'Emergency Service',
    subtitle: 'We deliver 7 days a week',
    badge: '24/7',
    icon: 'clock',
  },
  sections: [
    {
      _type: 'homeServices',
      _key: 'services',
      heading: 'Our Services',
      cardButtonLabel: 'Learn More',
      viewAllLabel: 'View All Services',
      viewAllHref: '/services/',
    },
    {
      _type: 'homeMission',
      _key: 'mission',
      theme: 'gold',
      heading: "Dubai's Trusted Handyman And Maintenance Company",
      description:
        'Handyman Maintenance delivers fast, affordable home and office services across Dubai. From emergency plumbing to electrical, AC, painting, carpentry, and tiles — one call covers your villa, apartment, or workplace.',
      buttonText: 'Contact Us',
      buttonHref: '/contact/',
    },
    {
      _type: 'homeFeature',
      _key: 'approach',
      eyebrow: 'Our Approach',
      heading: 'Handyman Maintenance: Reliable Approach',
      theme: 'dark',
      imagePosition: 'right',
      image: IMAGES.detail,
      items: [
        {
          icon: 'calendar',
          title: 'Simple And Fast Scheduling',
          text: 'Book by phone or WhatsApp and get a clear arrival window.',
        },
        {
          icon: 'clock',
          title: 'On-Time Arrivals',
          text: 'Our team respects your time and updates you if plans change.',
        },
        {
          icon: 'van',
          title: 'Fully Equipped Visits',
          text: 'Technicians arrive with tools and common parts ready to work.',
        },
        {
          icon: 'quality',
          title: 'Quality You Can Trust',
          text: 'We test the repair and make sure the job is done properly before we leave.',
        },
      ],
      buttonText: 'Contact Us',
      buttonHref: '/contact/',
    },
    {
      _type: 'homeWhyChoose',
      _key: 'why-choose',
      eyebrow: 'Why Choose Us',
      heading: 'Why Handyman Maintenance',
      description: 'Dubai homes and businesses choose us for fast response, clear pricing, and reliable workmanship.',
      useSitePoints: true,
      image: IMAGES.about,
      buttonText: 'Learn More',
      buttonHref: '/why-choose-us/',
    },
    {
      _type: 'homeFaq',
      _key: 'faq',
      eyebrow: 'FAQs',
      heading: 'Frequently Asked Questions',
      description: 'Quick answers about our handyman and maintenance services in Dubai.',
      faqs: [
        {
          question: 'How quickly can you respond to emergencies in Dubai?',
          answer:
            'Handyman Maintenance offers 24/7 emergency service across Dubai with same-day response for urgent plumbing, electrical, and AC calls.',
        },
        {
          question: 'Are your technicians licensed in Dubai?',
          answer:
            'Yes. Our technicians are licensed and experienced professionals serving homes, offices, and villas across Dubai.',
        },
        {
          question: 'Do you provide a free quote before starting work?',
          answer:
            'Yes. We give a clear quote before work begins so you know the cost upfront — no hidden charges.',
        },
        {
          question: 'Which areas in Dubai do you cover?',
          answer:
            'We serve Dubai Marina, Jumeirah, Business Bay, Downtown, JLT, JVC, Al Barsha, and many more areas across Dubai.',
        },
        {
          question: 'What services can I book with one call?',
          answer:
            'Plumbing, electrical, AC, painting, carpentry, and tiles & gypsum — one team for home and office maintenance.',
        },
      ],
    },
    {_type: 'homeTrust', _key: 'trust'},
    {
      _type: 'homeServiceAreas',
      _key: 'areas',
      heading: 'Areas We Serve',
      useSiteAreas: true,
      image: IMAGES.skyline,
      buttonText: 'View All Areas',
      buttonHref: '/service-areas/',
    },
    {_type: 'homeCategories', _key: 'categories', heading: 'Service Categories'},
    {_type: 'homeBlog', _key: 'blog', heading: 'Latest from Blog', show: true},
    {
      _type: 'homeContact',
      _key: 'contact',
      heading: 'Contact Us Today',
      description: 'Tell us what you need and we will get back to you quickly.',
      showForm: true,
      showDetails: true,
    },
    {
      _type: 'homeContactBanner',
      _key: 'cta',
      heading: 'Need a Handyman in Dubai?',
      description:
        'Handyman Maintenance offers fast, affordable services across Dubai. Available 24/7 for emergencies.',
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
  icon,
  highlights,
  checklist,
  faqs[]{question, answer},
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
  icon,
  highlights,
  checklist,
  faqs[]{question, answer},
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
  bannerSubtitle,
  eyebrow,
  body,
  "image": image.asset->url,
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

export async function getSiteSettings() {
  const data = await client.fetch(SITE_SETTINGS_QUERY, {}, REVALIDATE)
  const defaults = {
    siteName: SITE_NAME,
    siteUrl: SITE_URL,
    defaultSeoTitle: DEFAULT_SEO.title,
    defaultSeoDescription: DEFAULT_SEO.description,
    phone: '+971-50-000-0000',
    email: 'info@handymanmaintenance.com',
    address: 'Dubai, United Arab Emirates',
    city: 'Dubai',
    workingHours: '24/7 Emergency Service',
    whatsappMessage: 'Hello Handyman Maintenance, I need a service in Dubai.',
  }
  const looksLikeOldBrand = (value = '') => /sks|plumbers-dubai|handymanmaintenance\.com/i.test(value)
  return {
    ...defaults,
    ...data,
    siteName: looksLikeOldBrand(data?.siteName) ? defaults.siteName : data?.siteName || defaults.siteName,
    siteUrl: looksLikeOldBrand(data?.siteUrl) ? defaults.siteUrl : data?.siteUrl || defaults.siteUrl,
    phone: data?.phone || defaults.phone,
    email: looksLikeOldBrand(data?.email) ? defaults.email : data?.email || defaults.email,
    address: data?.address || defaults.address,
    defaultSeoTitle: looksLikeOldBrand(data?.defaultSeoTitle)
      ? defaults.defaultSeoTitle
      : data?.defaultSeoTitle || defaults.defaultSeoTitle,
    defaultSeoDescription: looksLikeOldBrand(data?.defaultSeoDescription)
      ? defaults.defaultSeoDescription
      : data?.defaultSeoDescription || defaults.defaultSeoDescription,
  }
}

export async function getSiteHeader() {
  const data = await client.fetch(SITE_HEADER_QUERY, {}, REVALIDATE)
  const hrefs = (data?.menuItems || []).map((item) => item.href || '').join(' ')
  if (!data?.menuItems?.length || !hrefs.includes('gallery')) return getFallbackHeader()
  return normalizeSiteHeader(data)
}

export async function getSiteFooter() {
  const data = await client.fetch(SITE_FOOTER_QUERY, {}, REVALIDATE)
  const hrefs = (data?.columns || [])
    .flatMap((column) => column.links || [])
    .map((link) => link.href || '')
    .join(' ')
  if (!data?.columns?.length || !hrefs.includes('gallery')) return getFallbackFooter()
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
  const mappedHref = SERVICE_MENU_ITEMS.find(
    (item) => item.label.toLowerCase() === (link.label || '').toLowerCase(),
  )?.href
  return {
    ...link,
    href: mappedHref || normalizeInternalHref(link.href),
    children: link.children?.map(normalizeNavLink),
  }
}

function normalizeSiteHeader(data) {
  if (!data) return data
  return {
    ...data,
    menuItems: data.menuItems?.map((item) => {
      const link = normalizeNavLink(item)
      const isServices = (item.label || '').toLowerCase() === 'services'
      if (isServices) {
        return {...link, children: SERVICE_MENU_ITEMS}
      }
      return link
    }),
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

function mergeHomeSections(cmsSections, fallbackSections) {
  if (!cmsSections?.length) return fallbackSections

  const presentKeys = new Set(cmsSections.map((section) => section._key).filter(Boolean))
  const presentTypes = new Set(cmsSections.map((section) => section._type).filter(Boolean))
  const multiTypes = new Set(['homeFeature'])

  const missing = fallbackSections.filter((section) => {
    if (section._key && presentKeys.has(section._key)) return false
    if (multiTypes.has(section._type)) {
      return section._key ? !presentKeys.has(section._key) : true
    }
    return !presentTypes.has(section._type)
  })

  if (!missing.length) return cmsSections

  // Insert missing sections before the final CTA when possible
  const ctaIndex = cmsSections.findIndex((section) => section._type === 'homeContactBanner')
  if (ctaIndex === -1) return [...cmsSections, ...missing]

  return [...cmsSections.slice(0, ctaIndex), ...missing, ...cmsSections.slice(ctaIndex)]
}

function normalizeHomePage(data) {
  if (!data) return fallbackHomePage

  const heroButtons = (data.heroButtons || [])
    .filter((button) => button?.label && (button?.href || button?.linkType === 'phone' || button?.linkType === 'whatsapp'))
    .map((button) => ({
      ...button,
      href: normalizeButtonHref(button.href, button.linkType),
    }))

  return {
    ...fallbackHomePage,
    ...data,
    heroImage: data.heroImage || fallbackHomePage.heroImage,
    heroHeadingPrefix: data.heroHeadingPrefix || fallbackHomePage.heroHeadingPrefix,
    heroHeadingHighlight: data.heroHeadingHighlight || fallbackHomePage.heroHeadingHighlight,
    heroHeadingSuffix: data.heroHeadingSuffix || fallbackHomePage.heroHeadingSuffix,
    heroHeading: data.heroHeading || fallbackHomePage.heroHeading,
    heroText: data.heroText || fallbackHomePage.heroText,
    heroTextHighlights: data.heroTextHighlights?.length
      ? data.heroTextHighlights
      : fallbackHomePage.heroTextHighlights,
    heroButtons: heroButtons.length ? heroButtons : fallbackHomePage.heroButtons,
    heroTrust: data.heroTrust?.length ? data.heroTrust : fallbackHomePage.heroTrust,
    emergencyCard: data.emergencyCard || fallbackHomePage.emergencyCard,
    sections: mergeHomeSections(data.sections, fallbackHomePage.sections),
  }
}

export async function getHomePage() {
  const data = await client.fetch(HOME_PAGE_QUERY, {}, REVALIDATE)
  return normalizeHomePage(data)
}

export async function getServices() {
  const data = await client.fetch(SERVICES_QUERY, {}, REVALIDATE)
  const list = data?.length ? data : getAllFallbackServices()
  return list.map(withServiceImage)
}

export async function getServiceBySlug(slug) {
  const data = await client.fetch(SERVICE_BY_SLUG_QUERY, {slug}, REVALIDATE)
  const service = data || getFallbackService(slug)
  return service ? withServiceImage(service) : service
}

export async function getServiceSlugs() {
  const slugs = await client.fetch(SERVICE_SLUGS_QUERY, {}, REVALIDATE)
  const base = slugs?.length ? slugs : SERVICE_SLUGS
  return [...new Set([...base, ...HANDYMAN_SERVICE_SLUGS])]
}

export async function getCategories() {
  const data = await client.fetch(CATEGORIES_QUERY, {}, REVALIDATE)
  const list = data?.length ? data : getAllFallbackCategories()
  return list.map(withCategoryImage)
}

export async function getCategoryBySlug(slug) {
  const data = await client.fetch(CATEGORY_BY_SLUG_QUERY, {slug}, REVALIDATE)
  const category = data || getFallbackCategory(slug)
  return category ? withCategoryImage(category) : category
}

export async function getCategorySlugs() {
  const slugs = await client.fetch(CATEGORY_SLUGS_QUERY, {}, REVALIDATE)
  return slugs?.length ? slugs : null
}

export async function getServicesByCategory(slug) {
  const data = await client.fetch(SERVICES_BY_CATEGORY_QUERY, {slug}, REVALIDATE)
  const list = Array.isArray(data) ? data : getFallbackServicesByCategory(slug)
  return list.map(withServiceImage)
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

export async function getGalleryPage() {
  const data = await client.fetch(GALLERY_PAGE_QUERY, {}, REVALIDATE)
  if (!data) return data
  const images = (data.images || [])
    .filter((item) => item?.src)
    .map((item) => ({
      ...item,
      alt: item.alt || item.imageAlt || 'Gallery image',
    }))
  return {
    ...data,
    images,
  }
}

export async function getSitemapData() {
  return client.fetch(SITEMAP_QUERY, {}, REVALIDATE)
}
