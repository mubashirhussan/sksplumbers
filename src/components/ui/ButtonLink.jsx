import Link from 'next/link'
import {isExternalHref} from '@/components/ui/NavLink'

const styles = {
  primary:
    'inline-flex items-center bg-navy text-white px-6 py-3 font-heading font-extrabold uppercase text-sm hover:bg-navy-800 transition-colors',
  secondary:
    'inline-flex items-center border-2 border-navy text-navy px-6 py-3 font-heading font-extrabold uppercase text-sm hover:bg-navy hover:text-white transition-colors',
  primaryDark:
    'inline-flex items-center bg-gold text-navy px-6 py-3 font-heading font-extrabold uppercase text-sm hover:bg-gold-600 transition-colors',
  secondaryDark:
    'inline-flex items-center border-2 border-gold text-gold px-6 py-3 font-heading font-extrabold uppercase text-sm hover:bg-gold hover:text-navy transition-colors',
}

function getHref(button) {
  if (button.linkType === 'external' || isExternalHref(button.href)) return button.href
  return button.href.startsWith('/') ? button.href : `/${button.href}`
}

export function ButtonLink({button, variant = 'hero'}) {
  if (!button?.label || !button?.href) return null

  const href = getHref(button)
  const isExternal = button.linkType === 'external' || isExternalHref(href)
  const styleKey =
    variant === 'hero'
      ? button.style === 'secondary'
        ? 'secondary'
        : 'primary'
      : button.style === 'secondary'
        ? 'secondaryDark'
        : 'primaryDark'
  const className = styles[styleKey]

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        target={button.openInNewTab ? '_blank' : undefined}
        rel={button.openInNewTab ? 'noopener noreferrer' : undefined}
      >
        {button.label}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {button.label}
    </Link>
  )
}
