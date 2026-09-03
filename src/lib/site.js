export const SITE_URL = 'https://www.handymanmaintenance.ae'

export const SITE_NAME = 'Handyman Maintenance'

export const SITE_LOGO = '/images/logo-mark.png'

export const DEFAULT_SEO = {
  title: 'Handyman Maintenance Dubai | 24/7 Emergency Handyman Services',
  description:
    'Handyman Maintenance offers plumbing, electrical, AC, painting, carpentry, and tiles services in Dubai. One call for all your home, office and villa maintenance needs.',
}

export const CATEGORY_SLUGS = [
  'commercial-plumbing',
  'emergency-plumbing',
  'general-plumbing-services',
  'pump-services',
  'residential-plumbing',
  'specialized-plumbing-services',
]

export const HANDYMAN_SERVICE_SLUGS = [
  'plumbing',
  'electrical',
  'ac-services',
  'painting',
  'carpentry',
  'tiles-gypsum',
]

export const SERVICE_SLUGS = [
  'emergency-plumber',
  'water-pump-repair',
  'drain-unblocking-service',
  'water-heater-repair',
  'blocked-drain-cleaning',
  '247-plumbing-service',
  ...HANDYMAN_SERVICE_SLUGS,
]

export const PAGE_SLUGS = ['about', 'contact']

export const STATIC_PAGE_PATHS = ['why-choose-us', 'service-areas', 'gallery']

/** Individual service URLs are root-level: /plumbing/ not /services/plumbing/ */
export function servicePath(slug) {
  const clean = typeof slug === 'string' ? slug : slug?.current
  return clean ? `/${clean}/` : '/services/'
}
