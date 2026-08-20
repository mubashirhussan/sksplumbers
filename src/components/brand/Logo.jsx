import Link from 'next/link'
import {CmsImage} from '@/components/ui/CmsImage'

export function Logo({header, settings}) {
  const primary = (header?.logoPrimary || '').trim()
  const secondary = (header?.logoSecondary || '').trim()
  const tagline = (header?.logoTagline || '').trim()
  const logoImage = header?.logoImage
  // With a CMS logo image, hide text unless editor explicitly turns "Hide logo text" OFF
  const hideText =
    header?.hideLogoText === true ||
    (logoImage && header?.hideLogoText !== false)
  const alt =
    [primary, secondary].filter(Boolean).join(' ') ||
    settings?.siteName ||
    'Home'
  const showText = !hideText && Boolean(primary || secondary || tagline)

  if (!logoImage && !showText) return null

  return (
    <Link href="/" className="flex min-w-0 max-w-full items-center gap-2 sm:gap-2.5">
      {logoImage ? (
        <span
          className={`relative shrink-0 overflow-hidden ${
            showText ? 'h-9 w-[72px] sm:h-11 sm:w-[88px]' : 'h-10 w-[150px] sm:h-12 sm:w-[190px]'
          }`}
        >
          <CmsImage
            src={logoImage}
            alt={alt}
            fill
            className="object-contain object-left"
            sizes={showText ? '88px' : '190px'}
            priority
          />
        </span>
      ) : null}
      {showText ? (
        <span className="min-w-0 leading-none">
          {primary ? (
            <span className="block truncate font-heading text-[12px] font-extrabold uppercase tracking-wide text-navy sm:text-[15px] md:text-[17px]">
              {primary}
            </span>
          ) : null}
          {secondary ? (
            <span className="block truncate font-heading text-[12px] font-extrabold uppercase tracking-wide text-gold sm:text-[15px] md:text-[17px]">
              {secondary}
            </span>
          ) : null}
          {tagline ? (
            <span className="mt-0.5 hidden font-heading text-[10px] font-semibold tracking-[0.28em] text-navy/70 sm:block">
              {tagline}
            </span>
          ) : null}
        </span>
      ) : null}
    </Link>
  )
}
