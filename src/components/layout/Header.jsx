import {Logo} from '@/components/brand/Logo'
import {HeaderMenu} from '@/components/layout/HeaderMenu'
import {CallButton} from '@/components/ui/CallButton'

export function Header({settings, header}) {
  const phone = settings?.phone
  const menuItems = header.menuItems

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="relative mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-3">
        <div className="min-w-0 flex-1">
          <Logo />
        </div>
        <HeaderMenu menuItems={menuItems} phone={phone} />
        <div className="hidden shrink-0 lg:block">
          <CallButton phone={phone} />
        </div>
      </div>
    </header>
  )
}
