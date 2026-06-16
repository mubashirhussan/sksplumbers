import Link from 'next/link'
import Image from 'next/image'
import {NavLink} from '@/components/ui/NavLink'
import {HeaderMenu} from '@/components/layout/HeaderMenu'
import {SITE_LOGO, SITE_NAME} from '@/lib/site'

export function Header({settings, header}) {
  const phone = settings?.phone
  const menuItems = header.menuItems
  const cta = header.ctaButton

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {(header?.announcementText || (header?.showPhoneInBar && phone)) && (
        <div className="bg-brand-700 text-white text-sm">
          <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4">
            {header?.announcementText && <span className="leading-snug">{header.announcementText}</span>}
            {header?.showPhoneInBar && phone && (
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="font-semibold hover:underline shrink-0">
                Call: {phone}
              </a>
            )}
          </div>
        </div>
      )}
      <div className="relative max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-3 md:gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={SITE_LOGO}
            alt={settings?.siteName || SITE_NAME}
            width={140}
            height={40}
            className="h-8 md:h-10 w-auto"
            priority
          />
        </Link>

        <HeaderMenu menuItems={menuItems} ctaButton={cta} />

        {cta?.enabled && cta?.label && cta?.href && (
          <NavLink
            link={cta}
            className="hidden lg:inline-flex bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors shrink-0"
          />
        )}
      </div>
    </header>
  )
}
