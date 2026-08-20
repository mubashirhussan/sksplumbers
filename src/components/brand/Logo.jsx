import Link from 'next/link'
import {CmsImage} from '@/components/ui/CmsImage'

export function Logo({header}) {
  const primary = header?.logoPrimary || 'Handyman'
  const secondary = header?.logoSecondary || 'Maintenance'
  const tagline = header?.logoTagline || '- DUBAI -'
  const logoImage = header?.logoImage
  const hideText = header?.hideLogoText

  return (
    <Link href="/" className="flex min-w-0 max-w-full items-center gap-2 sm:gap-2.5">
      {logoImage ? (
        <span
          className={`relative shrink-0 overflow-hidden ${
            hideText
              ? 'h-10 w-[150px] sm:h-12 sm:w-[190px]'
              : 'h-9 w-[72px] sm:h-11 sm:w-[88px]'
          }`}
        >
          <CmsImage
            src={logoImage}
            alt={`${primary} ${secondary}`.trim()}
            fill
            className="object-contain object-left"
            sizes={hideText ? '190px' : '88px'}
            priority
          />
        </span>
      ) : (
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-navy text-gold sm:h-12 sm:w-12">
          <svg viewBox="0 0 48 48" className="h-7 w-7 sm:h-10 sm:w-10" aria-hidden="true">
            <path
              d="M8 22 L24 8 L40 22 V40 H30 V28 H18 V40 H8 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <path d="M18 30 L30 22" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M18 22 L30 30" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </span>
      )}
      {!hideText && (
        <span className="min-w-0 leading-none">
          <span className="block truncate font-heading text-[12px] font-extrabold uppercase tracking-wide text-navy sm:text-[15px] md:text-[17px]">
            {primary}
          </span>
          <span className="block truncate font-heading text-[12px] font-extrabold uppercase tracking-wide text-gold sm:text-[15px] md:text-[17px]">
            {secondary}
          </span>
          <span className="mt-0.5 hidden font-heading text-[10px] font-semibold tracking-[0.28em] text-navy/70 sm:block">
            {tagline}
          </span>
        </span>
      )}
    </Link>
  )
}
