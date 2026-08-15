export const IMAGES = {
  logo: '/images/logo-mark.png',
  hero: '/images/hero-section.png',
  heroSkyline: '/images/hero-skyline.png',
  about: '/images/about-plumber-sink.png',
  skyline: '/images/dubai-skyline.png',
  electrical: '/images/service-electrical.png',
  ac: '/images/service-ac.png',
  painting: '/images/service-painting.png',
  carpentry: '/images/service-carpentry.png',
  tiles: '/images/service-tiles.png',
  plumbing: '/images/service-plumbing.png',
  emergency: '/images/service-emergency.png',
  plumbing247: '/images/service-247-plumbing.png',
  pump: '/images/service-pump.png',
  drain: '/images/service-drain.png',
  drainCleaning: '/images/service-drain-cleaning.png',
  drainUnblocking: '/images/service-drain-unblocking.png',
  heater: '/images/service-heater.png',
  residential: '/images/service-residential.png',
  commercial: '/images/service-commercial.png',
  specialized: '/images/service-specialized.png',
  detail: '/images/service-detail-plumber.png',
}

export const GALLERY_IMAGES = [
  {src: '/images/gallery-pipe-repair.png', alt: 'Pipe leak repair in Dubai', category: 'plumbing'},
  {src: '/images/gallery-toilet.png', alt: 'Toilet installation', category: 'residential'},
  {src: '/images/gallery-drain.png', alt: 'Kitchen drain cleaning', category: 'drains'},
  {src: '/images/gallery-shower.png', alt: 'Shower mixer replacement', category: 'residential'},
  {src: '/images/gallery-pump.png', alt: 'Water pump servicing', category: 'pumps'},
  {src: '/images/gallery-heater.png', alt: 'Water heater installation', category: 'heaters'},
  {src: '/images/gallery-pipes.png', alt: 'Copper and PVC pipe work', category: 'plumbing'},
  {src: '/images/gallery-leak.png', alt: 'Bathroom leak detection', category: 'emergency'},
  {src: IMAGES.plumbing, alt: 'Under-sink plumbing repair', category: 'plumbing'},
  {src: IMAGES.emergency, alt: 'Emergency plumber callout', category: 'emergency'},
  {src: IMAGES.pump, alt: 'Industrial water pump repair', category: 'pumps'},
  {src: IMAGES.drain, alt: 'Professional drain unblocking', category: 'drains'},
  {src: IMAGES.heater, alt: 'Electric water heater repair', category: 'heaters'},
  {src: IMAGES.residential, alt: 'Bathroom faucet installation', category: 'residential'},
  {src: IMAGES.commercial, alt: 'Commercial plumbing maintenance', category: 'commercial'},
  {src: IMAGES.specialized, alt: 'Specialized leak detection', category: 'emergency'},
]

const CATEGORY_IMAGES = {
  'commercial-plumbing': IMAGES.commercial,
  'emergency-plumbing': IMAGES.emergency,
  'general-plumbing-services': IMAGES.plumbing,
  'pump-services': IMAGES.pump,
  'residential-plumbing': IMAGES.residential,
  'specialized-plumbing-services': IMAGES.specialized,
}

const SERVICE_IMAGES = {
  '247-plumbing-service': IMAGES.plumbing247,
  'blocked-drain-cleaning': IMAGES.drainCleaning,
  'drain-unblocking-service': IMAGES.drainUnblocking,
  'emergency-plumber': IMAGES.emergency,
  'water-heater-repair': IMAGES.heater,
  'water-pump-repair': IMAGES.pump,
  plumbing: '/images/gallery-pipe-repair.png',
  electrical: IMAGES.electrical,
  'ac-services': IMAGES.ac,
  painting: IMAGES.painting,
  carpentry: IMAGES.carpentry,
  'tiles-gypsum': IMAGES.tiles,
}

function slugImage(slug = '') {
  if (SERVICE_IMAGES[slug]) return SERVICE_IMAGES[slug]
  if (slug.includes('emergency') || slug.includes('247') || slug.includes('same-day') || slug.includes('fast-plumber') || slug.includes('burst')) {
    return IMAGES.emergency
  }
  if (slug.includes('pump') || slug.includes('booster') || slug.includes('sump') || slug.includes('submersible')) {
    return IMAGES.pump
  }
  if (slug.includes('drain') || slug.includes('clog') || slug.includes('rooter') || slug.includes('hydro') || slug.includes('sewage')) {
    return IMAGES.drain
  }
  if (slug.includes('heater') || slug.includes('boiler') || slug.includes('ariston')) {
    return IMAGES.heater
  }
  if (
    slug.includes('residential') ||
    slug.includes('bathroom') ||
    slug.includes('kitchen') ||
    slug.includes('toilet') ||
    slug.includes('faucet') ||
    slug.includes('shower') ||
    slug.includes('villa') ||
    slug.includes('apartment') ||
    slug.includes('washing') ||
    slug.includes('dishwasher') ||
    slug.includes('sink')
  ) {
    return IMAGES.residential
  }
  if (slug.includes('commercial') || slug.includes('office') || slug.includes('restaurant') || slug.includes('industrial')) {
    return IMAGES.commercial
  }
  if (slug.includes('leak') || slug.includes('tank') || slug.includes('slab') || slug.includes('specialized')) {
    return IMAGES.specialized
  }
  return IMAGES.plumbing
}

export function getLocalServiceImage(slug) {
  return slugImage(slug)
}

export function getLocalCategoryImage(slug) {
  return CATEGORY_IMAGES[slug] || IMAGES.plumbing
}

export function resolveMedia(src, fallback) {
  return src || fallback
}

export function withServiceImage(service) {
  if (!service) return service
  const slug = service.slug?.current || service.slug
  return {
    ...service,
    image: getLocalServiceImage(slug),
  }
}

export function withCategoryImage(category) {
  if (!category) return category
  const slug = category.slug?.current || category.slug
  return {
    ...category,
    image: getLocalCategoryImage(slug),
  }
}
