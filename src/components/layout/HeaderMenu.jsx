'use client'

import {useEffect, useRef, useState} from 'react'
import {usePathname} from 'next/navigation'
import {NavLink} from '@/components/ui/NavLink'
import {CallButton} from '@/components/ui/CallButton'
import {telHref} from '@/lib/contact'

function Chevron({open}) {
  return (
    <svg
      className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function linkClass(href, pathname) {
  const current = pathname.replace(/\/$/, '') || '/'
  const target = (href || '/').replace(/\/$/, '') || '/'
  const active = target === '/' ? current === '/' : current.startsWith(target)
  return `whitespace-nowrap font-heading font-semibold uppercase text-[12px] xl:text-[13px] tracking-wide transition-colors ${
    active ? 'text-gold' : 'text-navy hover:text-gold'
  }`
}

function DesktopMenuItem({item, pathname}) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const hasChildren = item.children?.length > 0
  const className = linkClass(item.href, pathname)

  useEffect(() => {
    if (!open) return undefined

    function onPointerDown(event) {
      if (!wrapRef.current?.contains(event.target)) setOpen(false)
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  if (!hasChildren) {
    return <NavLink link={item} className={className} />
  }

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center gap-1">
        {item.href ? (
          <NavLink link={item} className={className} />
        ) : (
          <span className={className}>{item.label}</span>
        )}
        <button
          type="button"
          className={`${className} p-0.5`}
          aria-expanded={open}
          aria-haspopup="true"
          aria-label={`${open ? 'Close' : 'Open'} ${item.label} menu`}
          onClick={() => setOpen((value) => !value)}
        >
          <Chevron open={open} />
        </button>
      </div>
      <div
        className={`absolute left-0 top-full z-50 pt-2 transition-all ${
          open ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'
        }`}
      >
        <div className="min-w-56 border border-slate-100 bg-white py-2 shadow-lg" role="menu">
          {item.children.map((child) => (
            <NavLink
              key={`${item.label}-${child.href}-${child.label}`}
              link={child}
              className="block px-4 py-2 text-sm text-navy transition-colors hover:bg-gold-100 hover:text-navy"
              onClick={() => setOpen(false)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileMenuItem({item, onNavigate}) {
  const [open, setOpen] = useState(false)
  const hasChildren = item.children?.length > 0

  if (!hasChildren) {
    return (
      <NavLink
        link={item}
        className="block py-2 text-navy font-heading font-semibold uppercase"
        onClick={onNavigate}
      />
    )
  }

  return (
    <div className="border-b border-slate-100 last:border-0">
      <div className="flex items-center justify-between gap-2">
        {item.href ? (
          <NavLink
            link={item}
            className="flex-1 py-3 text-left text-navy font-heading font-semibold uppercase"
            onClick={onNavigate}
          />
        ) : (
          <span className="flex-1 py-3 text-navy font-heading font-semibold uppercase">{item.label}</span>
        )}
        <button
          type="button"
          className="p-2 text-navy"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={`${open ? 'Close' : 'Open'} ${item.label} menu`}
        >
          <Chevron open={open} />
        </button>
      </div>
      {open && (
        <div className="space-y-1 pb-3 pl-4">
          {item.children.map((child) => (
            <NavLink
              key={`mobile-${item.label}-${child.href}-${child.label}`}
              link={child}
              className="block py-1.5 text-sm text-slate-600 hover:text-gold"
              onClick={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function HeaderMenu({menuItems = [], phone, callLabel}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const tel = telHref(phone)
  const items = Array.isArray(menuItems) ? menuItems : []

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [mobileOpen])

  return (
    <>
      <nav className="hidden lg:flex items-center gap-3 xl:gap-5" aria-label="Main navigation">
        {items.map((item) => (
          <DesktopMenuItem key={`${item.label}-${item.href}`} item={item} pathname={pathname} />
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
        {tel && (
          <a
            href={tel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-navy text-white"
            aria-label={callLabel ? `${callLabel} ${phone}` : `Call ${phone}`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </a>
        )}
        {items.length > 0 ? (
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-navy"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        ) : null}
      </div>

      {mobileOpen && items.length > 0 ? (
        <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-slate-100 bg-white shadow-lg lg:hidden">
          <nav className="space-y-2 px-4 py-3" aria-label="Mobile navigation">
            <CallButton phone={phone} className="w-full justify-center" label={callLabel} />
            {items.map((item) => (
              <MobileMenuItem
                key={`mobile-nav-${item.label}-${item.href}`}
                item={item}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
          </nav>
        </div>
      ) : null}
    </>
  )
}
