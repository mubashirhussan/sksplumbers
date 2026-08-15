import {createImageUrlBuilder} from '@sanity/image-url'
import {client} from '@/sanity/client'

const builder = createImageUrlBuilder(client)

export function urlFor(source) {
  if (!source) return null
  return builder.image(source)
}

export function getImageUrl(source, width = 1200, height = 630) {
  if (!source) return null
  if (typeof source === 'string') return source
  return urlFor(source).width(width).height(height).fit('crop').auto('format').url()
}
