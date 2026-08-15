export function localBusinessSchema(settings) {
  const siteName = settings?.siteName || ''
  const siteUrl = settings?.siteUrl || ''
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    name: siteName,
    url: siteUrl,
    telephone: settings?.phone,
    email: settings?.email,
    description: settings?.defaultSeoDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: settings?.city || '',
      addressCountry: 'AE',
      streetAddress: settings?.address,
    },
    areaServed: {
      '@type': 'City',
      name: settings?.city || '',
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
  const siteUrl = settings?.siteUrl || ''
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.excerpt || service.seo?.metaDescription,
    url: `${siteUrl}/services/${service.slug.current}`,
    provider: {
      '@type': 'Plumber',
      name: settings?.siteName,
      telephone: settings?.phone,
      url: siteUrl,
    },
    areaServed: {
      '@type': 'City',
      name: settings?.city || '',
    },
    serviceType: service.title,
  }
}

export function breadcrumbSchema(items, settings) {
  const siteUrl = settings?.siteUrl || ''
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  }
}

export function blogPostingSchema(post, settings) {
  const siteUrl = settings?.siteUrl || ''
  const siteName = settings?.siteName || ''
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.seo?.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    url: `${siteUrl}/blog/${post.slug.current}`,
    author: {
      '@type': 'Organization',
      name: siteName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
    ...(post.image && {image: post.image}),
  }
}

export function webSiteSchema(settings) {
  const siteUrl = settings?.siteUrl || ''
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings?.siteName,
    url: siteUrl,
    description: settings?.defaultSeoDescription,
  }
}

export function faqSchema(faqs) {
  if (!faqs?.length) return null
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
