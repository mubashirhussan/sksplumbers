import {SITE_URL, DEFAULT_SEO} from '@/lib/site'
import {getImageUrl} from '@/lib/sanity/image'

export function buildMetadata({
  title,
  description,
  path = '/',
  image,
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
}) {
  const metaTitle = title || DEFAULT_SEO.title
  const metaDescription = description || DEFAULT_SEO.description
  const url = `${SITE_URL}${path}`
  const ogImage = getImageUrl(image) || `${SITE_URL}/og-default.jpg`

  return {
    title: {absolute: metaTitle},
    description: metaDescription,
    metadataBase: new URL(SITE_URL),
    alternates: {canonical: url},
    robots: noIndex ? {index: false, follow: false} : {index: true, follow: true},
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      siteName: 'SKS Plumbers',
      locale: 'en_AE',
      type,
      images: [{url: ogImage, width: 1200, height: 630, alt: metaTitle}],
      ...(publishedTime && {publishedTime}),
      ...(modifiedTime && {modifiedTime}),
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
  }
}

export function buildSeoFromDoc(doc, path, fallbackTitle) {
  if (!doc) return buildMetadata({title: fallbackTitle, path})
  return buildMetadata({
    title: doc.seo?.metaTitle || doc.title,
    description: doc.seo?.metaDescription || doc.excerpt || doc.description,
    path,
    image: doc.seo?.ogImage || doc.image,
    noIndex: doc.seo?.noIndex,
    type: doc.publishedAt ? 'article' : 'website',
    publishedTime: doc.publishedAt,
    modifiedTime: doc._updatedAt,
  })
}
