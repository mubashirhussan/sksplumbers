import Link from 'next/link'
import {isExternalHref} from '@/components/ui/NavLink'
import {resolveCtaHref} from '@/components/ui/QuoteForm'

const styles = {
  primary:
    'inline-flex items-center justify-center bg-navy text-white px-6 py-3 font-heading font-extrabold uppercase text-sm hover:bg-navy-800 transition-colors',
  secondary:
    'inline-flex items-center justify-center border-2 border-navy text-navy px-6 py-3 font-heading font-extrabold uppercase text-sm hover:bg-navy hover:text-white transition-colors',
  primaryDark:
    'inline-flex items-center justify-center bg-gold text-navy px-6 py-3 font-heading font-extrabold uppercase text-sm hover:bg-gold-600 transition-colors',
  secondaryDark:
    'inline-flex items-center justify-center border-2 border-gold text-gold px-6 py-3 font-heading font-extrabold uppercase text-sm hover:bg-gold hover:text-navy transition-colors',
}

export function ButtonLink({button, settings, variant = 'hero'}) {
  if (!button?.label) return null
  const href = resolveCtaHref(button, settings)
  if (!href) return null

  const isExternal =
    button.linkType === 'external' ||
    button.linkType === 'whatsapp' ||
    isExternalHref(href)
  const styleKey =
    variant === 'hero'
      ? button.style === 'secondary'
        ? 'secondary'
        : 'primary'
      : button.style === 'secondary'
        ? 'secondaryDark'
        : 'primaryDark'
  const className = styles[styleKey]
  const openNew = button.openInNewTab || button.linkType === 'whatsapp'

  if (isExternal || button.linkType === 'phone') {
    return (
      <a
        href={href}
        className={className}
        target={openNew ? '_blank' : undefined}
        rel={openNew ? 'noopener noreferrer' : undefined}
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
