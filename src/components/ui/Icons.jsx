const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function Icon({name, className = 'w-6 h-6'}) {
  const icons = {
    plumbing: (
      <svg {...svgProps} className={className}>
        <path d="M7 8h6a3 3 0 0 1 0 6h-2" />
        <path d="M11 14v4h2.5M7 8V5a2 2 0 0 1 2-2h3" />
        <path d="M14 5h3" />
      </svg>
    ),
    bolt: (
      <svg {...svgProps} className={className}>
        <path d="M13 3 6 14h6l-1 7 7-11h-6l1-7Z" />
      </svg>
    ),
    snowflake: (
      <svg {...svgProps} className={className}>
        <path d="M12 3v18M5 7.5 19 16.5M19 7.5 5 16.5M4 12h16" />
      </svg>
    ),
    paint: (
      <svg {...svgProps} className={className}>
        <path d="M6 21V10h12v3a3 3 0 0 1-3 3h-2v5" />
        <path d="M6 10 9 4h6l3 6" />
      </svg>
    ),
    saw: (
      <svg {...svgProps} className={className}>
        <path d="m5 19 14-14M8 8l3-3 10 10-3 3L8 8Z" />
        <path d="m14 10 2 2" />
      </svg>
    ),
    tiles: (
      <svg {...svgProps} className={className}>
        <rect x="4" y="4" width="7" height="7" />
        <rect x="13" y="4" width="7" height="7" />
        <rect x="4" y="13" width="7" height="7" />
        <rect x="13" y="13" width="7" height="7" />
      </svg>
    ),
    users: (
      <svg {...svgProps} className={className}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
        <circle cx="17" cy="9" r="2.2" />
        <path d="M16 19a4.5 4.5 0 0 1 5-4.4" />
      </svg>
    ),
    thumbs: (
      <svg {...svgProps} className={className}>
        <path d="M8 11v10H4V11h4Z" />
        <path d="M8 11 11 5a2 2 0 0 1 2-1h.5a1.5 1.5 0 0 1 1.5 1.8L14.5 9H20a2 2 0 0 1 2 2.3l-1.2 7A2 2 0 0 1 18.8 21H8" />
      </svg>
    ),
    emergency: (
      <svg {...svgProps} className={className}>
        <path d="M12 3v3M12 18v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M3 12h3M18 12h3M4.9 19.1L7 17M17 7l2.1-2.1" />
        <circle cx="12" cy="12" r="3.2" />
      </svg>
    ),
    home: (
      <svg {...svgProps} className={className}>
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.5Z" />
        <path d="M9 21v-7h6v7" />
      </svg>
    ),
    building: (
      <svg {...svgProps} className={className}>
        <path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" />
        <path d="M14 10h5a1 1 0 0 1 1 1v10" />
        <path d="M8 8h2M8 12h2M8 16h2M17 14h1M17 17h1" />
      </svg>
    ),
    pump: (
      <svg {...svgProps} className={className}>
        <circle cx="12" cy="13" r="5" />
        <path d="M12 8V4M9 4h6M7 13H4M20 13h-3" />
      </svg>
    ),
    drain: (
      <svg {...svgProps} className={className}>
        <path d="M4 7h16M6 7v4a6 6 0 0 0 12 0V7" />
        <path d="M12 11v8" />
      </svg>
    ),
    heater: (
      <svg {...svgProps} className={className}>
        <rect x="7" y="3" width="10" height="18" rx="2" />
        <path d="M10 8h4M10 12h4M12 16v2" />
      </svg>
    ),
    badge: (
      <svg {...svgProps} className={className}>
        <path d="M12 3 14.5 8l5.5.8-4 3.9.9 5.5L12 16.8 7.1 18.2l.9-5.5-4-3.9L9.5 8 12 3Z" />
      </svg>
    ),
    quality: (
      <svg {...svgProps} className={className}>
        <path d="M12 3 20 8v8l-8 5-8-5V8l8-5Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    clock: (
      <svg {...svgProps} className={className}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
    price: (
      <svg {...svgProps} className={className}>
        <path d="M12 3v18M16 8.5c0-1.7-1.8-3-4-3s-4 1.3-4 3 1.8 3 4 3 4 1.2 4 3-1.8 3-4 3-4-1.3-4-3" />
      </svg>
    ),
    calendar: (
      <svg {...svgProps} className={className}>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </svg>
    ),
    quote: (
      <svg {...svgProps} className={className}>
        <path d="M8 17H5a2 2 0 0 1-2-2v-3.2A4.8 4.8 0 0 1 7.8 7H9v3.5H7.2A1.7 1.7 0 0 0 5.5 12v1.5H8V17Zm11 0h-3a2 2 0 0 1-2-2v-3.2A4.8 4.8 0 0 1 18.8 7H20v3.5h-1.8a1.7 1.7 0 0 0-1.7 1.5v1.5H19V17Z" />
      </svg>
    ),
    van: (
      <svg {...svgProps} className={className}>
        <path d="M3 16V8h11l5 5v3" />
        <circle cx="7.5" cy="17.5" r="1.7" />
        <circle cx="16.5" cy="17.5" r="1.7" />
        <path d="M14 8v5h5" />
      </svg>
    ),
    check: (
      <svg {...svgProps} className={className}>
        <circle cx="12" cy="12" r="8" />
        <path d="m8.5 12 2.4 2.4 4.6-5" />
      </svg>
    ),
    phone: (
      <svg {...svgProps} className={className}>
        <path d="M7 3.5h3.2l1.3 3.2-2 1.2a12 12 0 0 0 5.6 5.6l1.2-2 3.2 1.3V17a1.5 1.5 0 0 1-1.5 1.5A14.5 14.5 0 0 1 5.5 6.5 1.5 1.5 0 0 1 7 3.5Z" />
      </svg>
    ),
    pin: (
      <svg {...svgProps} className={className}>
        <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.2" />
      </svg>
    ),
    mail: (
      <svg {...svgProps} className={className}>
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
        <path d="m4.5 7 7.5 6 7.5-6" />
      </svg>
    ),
    whatsapp: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M19.05 4.91A9.87 9.87 0 0 0 12.04 2C6.5 2 2 6.48 2 12c0 1.76.46 3.48 1.34 5L2 22l5.15-1.35A9.96 9.96 0 0 0 12.04 22c5.52 0 10.02-4.48 10.02-10 0-2.67-1.04-5.18-2.99-7.09ZM12.04 20.15a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.06.8.82-2.98-.2-.31A8.13 8.13 0 1 1 12.04 20.15Zm4.45-6.08c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.15.2-.56.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z" />
      </svg>
    ),
  }

  return icons[name] || null
}

export function CheckBullet({children}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-navy">
        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 6.2 4.8 8.5 9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  )
}
