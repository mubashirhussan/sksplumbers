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

export function getFallbackService(slug) {
  const catSlug = SERVICE_CATEGORY_MAP[slug]
  if (!catSlug) return null
  const title = slugToTitle(slug)
  const excerpt = `Professional ${title.toLowerCase()} in Dubai. SKS Plumbers offers fast, licensed plumbing solutions for homes and businesses across Dubai.`
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
      makeBlock(`Contact SKS Plumbers today for a free quote. Same-day service available.`, 'b3'),
    ],
    category: {
      title: CATEGORY_TITLES[catSlug],
      slug: {current: catSlug},
    },
    seo: {
      metaTitle: `${title} Dubai | SKS Plumbers`,
      metaDescription: excerpt.slice(0, 160),
    },
  }
}

export function getFallbackCategory(slug) {
  const title = CATEGORY_TITLES[slug]
  if (!title) return null
  const description = `Expert ${title.toLowerCase()} in Dubai. SKS Plumbers provides reliable, affordable plumbing solutions with 24/7 emergency support.`
  return {
    _id: `fallback-category-${slug}`,
    title,
    slug: {current: slug},
    description,
    body: [
      makeBlock(description, 'b1'),
      makeBlock(
        `Browse our full range of ${title.toLowerCase()} below. SKS Plumbers serves all areas of Dubai.`,
        'b2',
      ),
    ],
    seo: {
      metaTitle: `${title} Dubai | SKS Plumbers`,
      metaDescription: description.slice(0, 160),
    },
  }
}

export function getFallbackPage(slug) {
  const pages = {
    about: {
      title: 'About Us',
      excerpt:
        'SKS Plumbers is a trusted plumbing company in Dubai, delivering professional residential and commercial plumbing services.',
      body: [
        makeBlock(
          "SKS Plumbers is one of Dubai's most trusted plumbing service providers serving residential and commercial clients.",
          'b1',
        ),
        makeBlock(
          'Our team of licensed plumbers handles everything from routine maintenance to complex pump repairs and water heater installations.',
          'b2',
        ),
      ],
    },
    contact: {
      title: 'Contact Us',
      excerpt: 'Get in touch with SKS Plumbers for fast, reliable plumbing services in Dubai. Available 24/7.',
      body: [
        makeBlock(
          'Need a plumber in Dubai? Contact SKS Plumbers today for fast, professional service.',
          'b1',
        ),
        makeBlock('We serve all areas of Dubai including Dubai Marina, JLT, Downtown, and Business Bay.', 'b2'),
      ],
    },
  }
  const page = pages[slug]
  if (!page) return null
  return {
    _id: `fallback-page-${slug}`,
    title: page.title,
    slug: {current: slug},
    excerpt: page.excerpt,
    body: page.body,
    seo: {
      metaTitle: `${page.title} | SKS Plumbers Dubai`,
      metaDescription: page.excerpt.slice(0, 160),
    },
  }
}

export function getAllFallbackServices() {
  return Object.keys(SERVICE_CATEGORY_MAP).map((slug) => getFallbackService(slug))
}

export function getAllFallbackCategories() {
  return Object.keys(CATEGORY_TITLES).map((slug) => getFallbackCategory(slug))
}

export function getFallbackServicesByCategory(categorySlug) {
  return getAllFallbackServices().filter((s) => s.category.slug.current === categorySlug)
}
