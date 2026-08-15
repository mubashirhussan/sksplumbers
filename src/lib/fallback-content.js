import {HOME_SERVICE_CARDS} from '@/lib/site-content'

const BRAND_NAMES = {
  dab: 'DAB',
  davey: 'Davey',
  grundfos: 'Grundfos',
  milano: 'Milano',
  pedrollo: 'Pedrollo',
  wilo: 'Wilo',
  ariston: 'Ariston',
  pvc: 'PVC',
  pex: 'PEX',
}

export function slugToTitle(slug) {
  if (slug === '247-plumbing-service') return '24/7 Plumbing Service'
  return slug
    .split('-')
    .map((word) => BRAND_NAMES[word] || word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const CATEGORY_TITLES = {
  'commercial-plumbing': 'Commercial Plumbing',
  'emergency-plumbing': 'Emergency Plumbing',
  'general-plumbing-services': 'General Plumbing Services',
  'pump-services': 'Pump Services',
  'residential-plumbing': 'Residential Plumbing',
  'specialized-plumbing-services': 'Specialized Plumbing Services',
  'home-maintenance': 'Home Maintenance',
}

const SERVICE_CATEGORY_MAP = {
  '247-plumbing-service': 'emergency-plumbing',
  'affordable-plumbing-service': 'general-plumbing-services',
  'angle-valve-replacement': 'general-plumbing-services',
  'apartment-plumbing-repair': 'residential-plumbing',
  'ariston-water-heater-repair': 'specialized-plumbing-services',
  'automatic-pump-control-repair': 'pump-services',
  'bathroom-plumbing': 'residential-plumbing',
  'blocked-drain-cleaning': 'general-plumbing-services',
  'boiler-maintenance': 'specialized-plumbing-services',
  'boiler-repair': 'specialized-plumbing-services',
  'booster-and-pressure-pump-services': 'pump-services',
  'booster-pump-repair': 'pump-services',
  'broken-pipe-replacement': 'general-plumbing-services',
  'chilled-water-pump-maintenance': 'pump-services',
  'clogged-pipe-clearing': 'general-plumbing-services',
  'commercial-plumbing': 'commercial-plumbing',
  'commercial-pump-station-maintenance': 'pump-services',
  'copper-pipe-repair': 'general-plumbing-services',
  'dab-water-pump-repair': 'pump-services',
  'davey-water-pump-repair': 'pump-services',
  'dishwasher-plumbing-setup': 'residential-plumbing',
  'drain-unblocking-service': 'general-plumbing-services',
  'emergency-pipe-burst-repair': 'emergency-plumbing',
  'emergency-plumber': 'emergency-plumbing',
  'fast-plumber-dubai': 'emergency-plumbing',
  'faucet-installation': 'residential-plumbing',
  'faucet-repair': 'residential-plumbing',
  'float-switch-repair': 'pump-services',
  'garden-plumbing-services': 'residential-plumbing',
  'grundfos-water-pump-repair': 'pump-services',
  'hydro-jetting-service': 'specialized-plumbing-services',
  'industrial-plumbing-services': 'commercial-plumbing',
  'irrigation-pump-repair': 'pump-services',
  'kitchen-plumbing-services': 'residential-plumbing',
  'leaking-water-heater-fix': 'specialized-plumbing-services',
  'leaking-water-pump-repair': 'pump-services',
  'licensed-plumber-dubai': 'general-plumbing-services',
  'low-water-pressure-solutions': 'specialized-plumbing-services',
  'main-water-line-repair': 'general-plumbing-services',
  'milano-water-pump-repair': 'pump-services',
  'noisy-water-pump-fix': 'pump-services',
  'office-plumbing-services': 'commercial-plumbing',
  'pedrollo-pump-repair': 'pump-services',
  'pex-pipe-repair': 'general-plumbing-services',
  'pipe-leak-repair': 'general-plumbing-services',
  'pipe-repair-and-replacement': 'general-plumbing-services',
  'plumbing-fixture-upgrades': 'general-plumbing-services',
  'plumbing-repair': 'general-plumbing-services',
  'pressure-pump-installation': 'pump-services',
  'professional-plumbing-contractor': 'general-plumbing-services',
  'pvc-pipe-repair': 'general-plumbing-services',
  'residential-plumbing': 'residential-plumbing',
  'restaurant-plumbing-service': 'commercial-plumbing',
  'rooter-service': 'specialized-plumbing-services',
  'same-day-plumber': 'emergency-plumbing',
  'sewage-and-sump-pump-services': 'pump-services',
  'sewage-pump-maintenance': 'pump-services',
  'shower-repair': 'residential-plumbing',
  'sink-repair': 'residential-plumbing',
  'slab-leak-repair': 'specialized-plumbing-services',
  'stuart-turner-pump-repair': 'pump-services',
  'submersible-pump-repair': 'pump-services',
  'sump-pump-repair': 'pump-services',
  'swimming-pool-pump-repair': 'pump-services',
  'toilet-installation': 'residential-plumbing',
  'toilet-repair': 'residential-plumbing',
  'transfer-pump-repair': 'pump-services',
  'villa-plumbing-maintenance': 'residential-plumbing',
  'washing-machine-plumbing-installation': 'residential-plumbing',
  'water-heater-installation': 'specialized-plumbing-services',
  'water-heater-repair': 'specialized-plumbing-services',
  'water-heater-services': 'specialized-plumbing-services',
  'water-leak-detection': 'specialized-plumbing-services',
  'water-pressure-regulator-replacement': 'specialized-plumbing-services',
  'water-pump-installation': 'pump-services',
  'water-pump-maintenance': 'pump-services',
  'water-pump-motor-repair': 'pump-services',
  'water-pump-pressure-switch-replacement': 'pump-services',
  'water-pump-repair': 'pump-services',
  'water-pump-replacement': 'pump-services',
  'water-pump-services': 'pump-services',
  'water-tank-cleaning': 'specialized-plumbing-services',
  'water-tank-leak-repair': 'specialized-plumbing-services',
  'water-tank-pump-repair': 'pump-services',
  'wilo-pump-repair': 'pump-services',
}

function makeBlock(text, key) {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: `${key}-span`, text, marks: []}],
  }
}

function getHandymanFallbackService(slug) {
  const card = HOME_SERVICE_CARDS.find((item) => item.slug === slug)
  if (!card) return null
  return {
    _id: `fallback-service-${slug}`,
    title: card.title,
    slug: {current: slug},
    excerpt: card.excerpt,
    body: card.body.map((text, index) => makeBlock(text, `b${index + 1}`)),
    category: null,
    faqs: card.faqs,
    checklist: card.checklist,
    highlights: card.items,
    icon: card.icon,
    seo: {
      metaTitle: `${card.title} Dubai | Handyman Maintenance`,
      metaDescription: card.excerpt.slice(0, 160),
    },
  }
}

export function getFallbackService(slug) {
  const handyman = getHandymanFallbackService(slug)
  if (handyman) return handyman
  const catSlug = SERVICE_CATEGORY_MAP[slug]
  if (!catSlug) return null
  const title = slugToTitle(slug)
  const excerpt = `Professional ${title.toLowerCase()} in Dubai. Handyman Maintenance offers fast, licensed plumbing solutions for homes and businesses across Dubai.`
  return {
    _id: `fallback-service-${slug}`,
    title,
    slug: {current: slug},
    excerpt,
    body: [
      makeBlock(excerpt, 'b1'),
      makeBlock(
        `Our licensed plumbers in Dubai are trained to handle all types of ${title.toLowerCase()} jobs efficiently and affordably.`,
        'b2',
      ),
      makeBlock(`Contact Handyman Maintenance today for a free quote. Same-day service available.`, 'b3'),
    ],
    category: {
      title: CATEGORY_TITLES[catSlug],
      slug: {current: catSlug},
    },
    seo: {
      metaTitle: `${title} Dubai | Handyman Maintenance`,
      metaDescription: excerpt.slice(0, 160),
    },
  }
}

export function getFallbackCategory(slug) {
  const title = CATEGORY_TITLES[slug]
  if (!title) return null
  const description = `Expert ${title.toLowerCase()} in Dubai. Handyman Maintenance provides reliable, affordable plumbing solutions with 24/7 emergency support.`
  return {
    _id: `fallback-category-${slug}`,
    title,
    slug: {current: slug},
    description,
    body: [
      makeBlock(description, 'b1'),
      makeBlock(
        `Browse our full range of ${title.toLowerCase()} below. Handyman Maintenance serves all areas of Dubai.`,
        'b2',
      ),
    ],
    seo: {
      metaTitle: `${title} Dubai | Handyman Maintenance`,
      metaDescription: description.slice(0, 160),
    },
  }
}

export function getFallbackPage(slug) {
  const pages = {
    about: {
      title: 'About Us',
      bannerSubtitle: "Dubai’s trusted plumbing and maintenance experts",
      eyebrow: 'Who We Are',
      excerpt:
        'Handyman Maintenance is a trusted plumbing company in Dubai, delivering professional residential and commercial plumbing services.',
      missionTitle: 'Our Mission',
      missionText:
        'To provide fast, honest, and high-quality plumbing services that keep Dubai homes, offices, and villas running without disruption.',
      visionTitle: 'Our Vision',
      visionText:
        'To be Dubai’s most reliable plumbing partner — known for 24/7 emergency response, skilled workmanship, and transparent pricing.',
    },
    contact: {
      title: 'Contact Us',
      bannerSubtitle: 'Get in touch for fast plumbing service across Dubai',
      eyebrow: 'Get In Touch',
      excerpt: 'Need a plumber in Dubai? Call, WhatsApp, or send a message. We are available 24/7 for emergencies.',
      quoteFormTitle: 'Send Us a Message',
      quoteFormSubmitLabel: 'Send Message',
    },
    'why-choose-us': {
      title: 'Why Choose Us',
      bannerSubtitle: 'A simple process and reliable plumbing you can count on',
      eyebrow: 'Simple Process',
      excerpt: 'See why Dubai homes and businesses choose Handyman Maintenance.',
    },
    'service-areas': {
      title: 'Service Areas',
      bannerSubtitle: 'Licensed plumbers covering homes and businesses across Dubai',
      eyebrow: 'Dubai Coverage',
      excerpt: 'Handyman Maintenance serves communities across Dubai.',
    },
    services: {
      title: 'Our Services',
      bannerSubtitle: 'Professional plumbing for homes, offices, and villas across Dubai',
      excerpt: 'Browse all plumbing and maintenance services in Dubai.',
    },
    categories: {
      title: 'Service Categories',
      bannerSubtitle: 'Find the right plumbing service for your property',
      excerpt: 'Explore plumbing service categories in Dubai.',
    },
    blog: {
      title: 'Plumbing Blog',
      bannerSubtitle: 'Tips, guides, and expert advice from Handyman Maintenance Dubai',
      excerpt: 'Read plumbing tips, guides, and expert advice.',
    },
  }
  const page = pages[slug]
  if (!page) return null
  return {
    _id: `fallback-page-${slug}`,
    title: page.title,
    slug: {current: slug},
    excerpt: page.excerpt,
    bannerSubtitle: page.bannerSubtitle,
    eyebrow: page.eyebrow,
    missionTitle: page.missionTitle,
    missionText: page.missionText,
    visionTitle: page.visionTitle,
    visionText: page.visionText,
    quoteFormTitle: page.quoteFormTitle,
    quoteFormSubmitLabel: page.quoteFormSubmitLabel,
    body: page.body || [],
    seo: {
      metaTitle: `${page.title} | Handyman Maintenance Dubai`,
      metaDescription: (page.excerpt || page.bannerSubtitle || page.title).slice(0, 160),
    },
  }
}

export function getAllFallbackServices() {
  const seen = new Set()
  return [...HOME_SERVICE_CARDS.map((card) => card.slug), ...Object.keys(SERVICE_CATEGORY_MAP)]
    .map((slug) => getFallbackService(slug))
    .filter((service) => {
      const slug = service?.slug?.current
      if (!slug || seen.has(slug)) return false
      seen.add(slug)
      return true
    })
}

export function getAllFallbackCategories() {
  return Object.keys(CATEGORY_TITLES).map((slug) => getFallbackCategory(slug))
}

export function getFallbackServicesByCategory(categorySlug) {
  return getAllFallbackServices().filter((s) => s.category.slug.current === categorySlug)
}
