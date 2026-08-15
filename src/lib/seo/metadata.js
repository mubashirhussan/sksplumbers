import {SITE_URL} from '@/lib/site'
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
  siteName,
  siteUrl,
  fallbackImage,
}) {
  const base = siteUrl || SITE_URL
  const metaTitle = title || ''
  const metaDescription = description || ''
  const url = `${base}${path}`
  const ogImage = getImageUrl(image) || fallbackImage || null

  return {
    title: {absolute: metaTitle},
    description: metaDescription,
    metadataBase: new URL(base),
    alternates: {canonical: url},
    robots: noIndex ? {index: false, follow: false} : {index: true, follow: true},
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      siteName: siteName || '',
      locale: 'en_AE',
      type,
      ...(ogImage ? {images: [{url: ogImage, width: 1200, height: 630, alt: metaTitle}]} : {}),
      ...(publishedTime && {publishedTime}),
      ...(modifiedTime && {modifiedTime}),
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      ...(ogImage ? {images: [ogImage]} : {}),
    },
  }
}

export function buildSeoFromDoc(doc, path, settings) {
  const fallbackTitle = settings?.defaultSeoTitle || settings?.siteName || ''
  if (!doc) return buildMetadata({title: fallbackTitle, path, siteName: settings?.siteName, siteUrl: settings?.siteUrl, fallbackImage: settings?.defaultOgImage})
  return buildMetadata({
    title: doc.seo?.metaTitle || doc.title || fallbackTitle,
    description: doc.seo?.metaDescription || doc.excerpt || doc.description || doc.subtitle || settings?.defaultSeoDescription,
    path,
    image: doc.seo?.ogImage || doc.image,
    noIndex: doc.seo?.noIndex,
    type: doc.publishedAt ? 'article' : 'website',
    publishedTime: doc.publishedAt,
    modifiedTime: doc._updatedAt,
    siteName: settings?.siteName,
    siteUrl: settings?.siteUrl,
    fallbackImage: settings?.defaultOgImage,
  })
}
