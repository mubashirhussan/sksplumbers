import {Icon} from '@/components/ui/Icons'
import {telHref} from '@/lib/contact'

export function CallButton({phone, className = '', label}) {
  const tel = telHref(phone)
  if (!tel) return null

  return (
    <a
      href={tel}
      className={`inline-flex max-w-full items-center gap-2.5 rounded-lg bg-navy px-4 py-2.5 text-white transition-colors hover:bg-navy-800 ${className}`}
    >
      <Icon name="phone" className="w-5 h-5 shrink-0" />
      <span className="min-w-0 text-left leading-tight">
        <span className="block font-heading font-bold uppercase text-[11px] tracking-wide">
          {label || 'Call Now'}
        </span>
        <span className="block truncate font-heading text-sm font-extrabold">{phone}</span>
      </span>
    </a>
  )
}

export function WhatsAppButton({href, className = '', label, subtext}) {
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex max-w-full items-center gap-2.5 rounded-lg bg-[#25D366] px-4 py-2.5 text-white transition-colors hover:bg-[#1ebe5d] ${className}`}
    >
      <Icon name="whatsapp" className="w-6 h-6 shrink-0" />
      <span className="min-w-0 text-left leading-tight">
        <span className="block font-heading font-extrabold uppercase text-sm">
          {label || 'WhatsApp Now'}
        </span>
        <span className="block text-[11px] font-medium opacity-90">{subtext || 'Quick Response'}</span>
      </span>
    </a>
  )
}
