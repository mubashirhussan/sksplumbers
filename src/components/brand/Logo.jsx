import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="flex min-w-0 max-w-full items-center gap-2 sm:gap-2.5">
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-navy text-gold sm:h-12 sm:w-12">
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
      <span className="min-w-0 leading-none">
        <span className="block truncate font-heading text-[12px] font-extrabold uppercase tracking-wide text-navy sm:text-[15px] md:text-[17px]">
          Handyman
        </span>
        <span className="block truncate font-heading text-[12px] font-extrabold uppercase tracking-wide text-gold sm:text-[15px] md:text-[17px]">
          Maintenance
        </span>
        <span className="mt-0.5 hidden font-heading text-[10px] font-semibold tracking-[0.28em] text-navy/70 sm:block">
          - DUBAI -
        </span>
      </span>
    </Link>
  )
}
