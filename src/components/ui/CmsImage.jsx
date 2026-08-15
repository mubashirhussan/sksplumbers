import Image from 'next/image'

export function CmsImage({src, alt = '', ...props}) {
  if (!src) return null
  const remote = typeof src === 'string' && /^https?:\/\//.test(src)
  return <Image src={src} alt={alt} unoptimized={remote} {...props} />
}
