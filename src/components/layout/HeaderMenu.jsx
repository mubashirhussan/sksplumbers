'use client'

import {useState} from 'react'
import {NavLink} from '@/components/ui/NavLink'

function Chevron({open}) {
  return (
    <svg
      className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function DesktopMenuItem({item}) {
  const hasChildren = item.children?.length > 0

  if (!hasChildren) {
    return (
      <NavLink
        link={item}
        className="text-slate-600 hover:text-brand-600 font-medium transition-colors text-sm"
      />
    )
  }

  return (
    <div className="relative group">
      <div className="flex items-center gap-1">
        {item.href ? (
          <NavLink
            link={item}
            className="text-slate-600 hover:text-brand-600 font-medium transition-colors text-sm"
          />
        ) : (
          <span className="text-slate-600 font-medium text-sm cursor-default">{item.label}</span>
        )}
        <Chevron open={false} />
      </div>
      <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <div className="min-w-52 bg-white border border-slate-200 rounded-lg shadow-lg py-2">
          {item.children.map((child) => (
            <NavLink
              key={`${item.label}-${child.href}-${child.label}`}
              link={child}
              className="block px-4 py-2 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition-colors"
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
        className="block py-2 text-slate-700 font-medium"
        onClick={onNavigate}
      />
    )
  }

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        type="button"
        className="flex w-full items-center justify-between py-3 text-left text-slate-700 font-medium"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{item.label}</span>
        <Chevron open={open} />
      </button>
      {open && (
        <div className="pb-3 pl-4 space-y-2">
          {item.href && (
            <NavLink
              link={item}
              className="block text-sm text-brand-600 font-medium"
              onClick={onNavigate}
            />
          )}
          {item.children.map((child) => (
            <NavLink
              key={`mobile-${item.label}-${child.href}-${child.label}`}
              link={child}
              className="block text-sm text-slate-600"
              onClick={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function HeaderMenu({menuItems, ctaButton}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
        {menuItems.map((item) => (
          <DesktopMenuItem key={`${item.label}-${item.href}`} item={item} />
        ))}
      </nav>

      <div className="flex items-center gap-3 lg:hidden">
        {ctaButton?.enabled && ctaButton?.label && ctaButton?.href && (
          <NavLink
            link={ctaButton}
            className="bg-brand-600 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-brand-700 transition-colors"
          />
        )}
        <button
          type="button"
          className="p-2 rounded-lg border border-slate-200 text-slate-700"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white">
          <nav className="px-4 py-2" aria-label="Mobile navigation">
            {menuItems.map((item) => (
              <MobileMenuItem
                key={`mobile-nav-${item.label}-${item.href}`}
                item={item}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
