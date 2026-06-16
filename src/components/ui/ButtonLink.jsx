import Link from 'next/link'
import {isExternalHref} from '@/components/ui/NavLink'

const styles = {
  primary:
    'bg-white text-brand-700 px-5 sm:px-8 py-3 rounded-lg font-semibold hover:bg-brand-50 transition-colors text-sm sm:text-base',
  secondary:
    'border-2 border-white text-white px-5 sm:px-8 py-3 rounded-lg font-semibold hover:bg-brand-600 transition-colors text-sm sm:text-base',
  primaryDark:
    'bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors',
  secondaryDark:
    'border-2 border-brand-600 text-brand-600 px-6 py-3 rounded-lg font-semibold hover:bg-brand-50 transition-colors',
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
