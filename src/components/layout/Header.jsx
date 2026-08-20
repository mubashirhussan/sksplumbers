import Link from 'next/link'
import {Logo} from '@/components/brand/Logo'
import {HeaderMenu} from '@/components/layout/HeaderMenu'
import {CallButton, WhatsAppButton} from '@/components/ui/CallButton'
import {whatsappHref} from '@/lib/contact'

function HeaderCta({settings, header}) {
  const cta = header?.ctaButton
  if (cta?.enabled === false) return null

  const label = cta?.label || settings?.callButtonLabel
  const linkType = cta?.linkType || 'phone'
  const phone = settings?.phone

  if (linkType === 'whatsapp') {
    const href = whatsappHref(settings?.whatsappNumber || phone, settings?.whatsappMessage)
    return (
      <WhatsAppButton
        href={href}
        label={label || settings?.whatsappButtonLabel}
        subtext={settings?.whatsappButtonSubtext}
      />
    )
  }

  if (linkType === 'phone') {
    return <CallButton phone={phone} label={label} />
  }

  const href = cta?.href
  if (!href || !label) return null

  const external = href.startsWith('http://') || href.startsWith('https://')
  const className =
    'inline-flex max-w-full items-center justify-center rounded-lg bg-navy px-4 py-2.5 font-heading text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-navy-800'

  if (external || cta?.openInNewTab) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  )
}

export function Header({settings, header}) {
  const phone = settings?.phone
  const menuItems = header?.menuItems || []
  const callLabel = header?.ctaButton?.label || settings?.callButtonLabel

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="relative mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-3">
        <div className="min-w-0 flex-1">
          <Logo header={header} settings={settings} />
        </div>
        <HeaderMenu menuItems={menuItems} phone={phone} callLabel={callLabel} />
        <div className="hidden shrink-0 lg:block">
          <HeaderCta settings={settings} header={header} />
        </div>
      </div>
    </header>
  )
}
