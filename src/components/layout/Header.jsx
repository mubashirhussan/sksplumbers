import {Logo} from '@/components/brand/Logo'
import {HeaderMenu} from '@/components/layout/HeaderMenu'
import {CallButton, WhatsAppButton} from '@/components/ui/CallButton'
import {ButtonLink} from '@/components/ui/ButtonLink'
import {telHref} from '@/lib/contact'

function HeaderCta({cta, phone, settings}) {
  if (cta?.enabled === false) return null
  if (cta?.linkType === 'whatsapp') return <WhatsAppButton settings={settings} />
  if (cta?.linkType === 'internal' || cta?.linkType === 'external') {
    return <ButtonLink button={cta} settings={settings} />
  }
  return <CallButton phone={phone} settings={settings} />
}

export function Header({settings, header}) {
  const phone = settings?.phone
  const menuItems = header?.menuItems || []
  const cta = header?.ctaButton
  const tel = telHref(phone)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {header?.announcementText ? (
        <div className="bg-navy px-3 py-1.5 text-center text-[11px] font-heading font-semibold uppercase tracking-wide text-white sm:text-xs">
          {header.announcementText}
          {header.showPhoneInBar && phone && tel ? (
            <>
              {' '}
              <a href={tel} className="text-gold hover:underline">
                {phone}
              </a>
            </>
          ) : null}
        </div>
      ) : null}
      <div className="relative mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-3">
        <div className="min-w-0 flex-1">
          <Logo header={header} settings={settings} />
        </div>
        <HeaderMenu menuItems={menuItems} phone={phone} settings={settings} />
        <div className="hidden shrink-0 lg:block">
          <HeaderCta cta={cta} phone={phone} settings={settings} />
        </div>
      </div>
    </header>
  )
}
