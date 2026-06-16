import Link from 'next/link'
import Image from 'next/image'
import {NavLink} from '@/components/ui/NavLink'
import {HeaderMenu} from '@/components/layout/HeaderMenu'

export function Header({settings, header}) {
  const phone = settings?.phone
  const menuItems = header.menuItems
  const cta = header.ctaButton
  const logoSrc = header.logoImage || settings?.logo

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {(header?.announcementText || (header?.showPhoneInBar && phone)) && (
        <div className="bg-brand-700 text-white text-sm">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center gap-4">
            {header?.announcementText && <span>{header.announcementText}</span>}
            {header?.showPhoneInBar && phone && (
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="font-semibold hover:underline shrink-0">
                Call: {phone}
              </a>
            )}
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={settings?.siteName || 'SKS Plumbers'}
              width={140}
              height={40}
              className="h-10 w-auto"
            />
          ) : (
            <>
              <span className="text-2xl font-bold text-brand-700">{header?.logoPrimary || 'SKS'}</span>
              {header?.logoSecondary && (
                <span className="text-slate-700 font-medium hidden sm:inline">{header.logoSecondary}</span>
              )}
            </>
          )}
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
