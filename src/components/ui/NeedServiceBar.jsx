import {Icon} from '@/components/ui/Icons'
import {telHref, whatsappHref, whatsappNumber} from '@/lib/contact'

export function NeedServiceBar({settings}) {
  const phone = settings?.phone
  const tel = telHref(phone)
  const wa = whatsappHref(whatsappNumber(settings), settings?.whatsappMessage)
  const callLabel = settings?.callButtonLabel
  const waLabel = settings?.whatsappButtonLabel

  if (!settings?.needServiceHeading && !settings?.needServiceEyebrow && !tel && !wa) return null

  return (
    <section className="bg-navy text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:py-12 lg:flex-row lg:items-center lg:justify-between">
        <div>
          {settings?.needServiceEyebrow ? (
            <p className="mb-2 font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold">
              {settings.needServiceEyebrow}
            </p>
          ) : null}
          {settings?.needServiceHeading ? (
            <h2 className="font-heading text-xl font-extrabold uppercase sm:text-2xl md:text-4xl">
              {settings.needServiceHeading}
            </h2>
          ) : null}
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
          {tel ? (
            <a
              href={tel}
              className="inline-flex w-full items-center justify-center gap-2 border border-white/20 bg-navy-700 px-6 py-3 font-heading text-sm font-bold uppercase text-white transition-colors hover:bg-navy-800 sm:w-auto"
            >
              <Icon name="phone" className="h-4 w-4" />
              <span>
                {callLabel || ''}
                {callLabel && phone ? ' ' : ''}
                {phone || ''}
              </span>
            </a>
          ) : null}
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 bg-[#25D366] px-6 py-3 font-heading text-sm font-bold uppercase text-white transition-colors hover:bg-[#1ebe5d] sm:w-auto"
            >
              <Icon name="whatsapp" className="h-5 w-5" />
              {waLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
