import Link from 'next/link'

export function isExternalHref(href) {
  return (
    href?.startsWith('http://') ||
    href?.startsWith('https://') ||
    href?.startsWith('mailto:') ||
    href?.startsWith('tel:')
  )
}

export function NavLink({link, className, onClick}) {
  if (!link?.href) return null

  if (isExternalHref(link.href)) {
    return (
      <a
        href={link.href}
        className={className}
        target={link.openInNewTab ? '_blank' : undefined}
        rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
        onClick={onClick}
      >
        {link.label}
      </a>
    )
  }

  return (
    <Link href={link.href} className={className} onClick={onClick}>
      {link.label}
    </Link>
  )
}
