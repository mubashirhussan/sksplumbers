import {SITE_URL} from '@/lib/site'

export function localBusinessSchema(settings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    name: settings?.siteName || 'SKS Plumbers',
    url: settings?.siteUrl || SITE_URL,
    telephone: settings?.phone,
    email: settings?.email,
    description: settings?.defaultSeoDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: settings?.city || 'Dubai',
      addressCountry: 'AE',
      streetAddress: settings?.address,
    },
    areaServed: {
      '@type': 'City',
      name: 'Dubai',
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  }
}

export function serviceSchema(service, settings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.excerpt || service.seo?.metaDescription,
    url: `${SITE_URL}/services/${service.slug.current}`,
    provider: {
      '@type': 'Plumber',
      name: settings?.siteName || 'SKS Plumbers',
      telephone: settings?.phone,
      url: settings?.siteUrl || SITE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: 'Dubai',
    },
    serviceType: service.title,
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function blogPostingSchema(post, settings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.seo?.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    url: `${SITE_URL}/blog/${post.slug.current}`,
    author: {
      '@type': 'Organization',
      name: settings?.siteName || 'SKS Plumbers',
    },
    publisher: {
      '@type': 'Organization',
      name: settings?.siteName || 'SKS Plumbers',
      url: settings?.siteUrl || SITE_URL,
    },
    ...(post.image && {image: post.image}),
  }
}

export function webSiteSchema(settings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings?.siteName || 'SKS Plumbers',
    url: settings?.siteUrl || SITE_URL,
    description: settings?.defaultSeoDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/services?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
