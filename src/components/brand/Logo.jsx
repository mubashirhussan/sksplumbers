import Link from 'next/link'
import Image from 'next/image'

export function Logo({header, settings}) {
  const image = header?.logoImage || settings?.logo
  const alt = header?.logoImageAlt || settings?.logoAlt || settings?.siteName || ''
  const primary = header?.logoPrimary
  const secondary = header?.logoSecondary
  const tagline = header?.logoTagline
  const hideText = header?.hideLogoText
  const showText = !hideText && (primary || secondary)

  return (
    <Link href="/" className="flex min-w-0 max-w-full items-center gap-2 sm:gap-2.5">
      {image ? (
        <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md sm:h-12 sm:w-12">
          <Image src={image} alt={alt} fill className="object-contain" sizes="48px" />
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
