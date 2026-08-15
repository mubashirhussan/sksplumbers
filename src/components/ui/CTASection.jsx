import Link from 'next/link'
import {telHref} from '@/lib/contact'

export function CTASection({settings, title, description, buttonLabel, buttonHref, showPhone = true}) {
  const phone = settings?.phone
  const tel = telHref(phone)
  if (!title && !description && !buttonLabel && !(showPhone && phone)) return null

  return (
    <section className="my-8 rounded-2xl bg-brand-700 p-6 text-white md:my-12 md:p-12">
      <div className="max-w-3xl">
        {title ? <h2 className="mb-4 text-xl font-bold md:text-3xl">{title}</h2> : null}
        {description ? <p className="mb-6 text-base text-brand-100 md:text-lg">{description}</p> : null}
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
          {buttonLabel && buttonHref ? (
            <Link
              href={buttonHref}
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              {buttonLabel}
            </Link>
          ) : null}
          {showPhone && tel ? (
            <a
              href={tel}
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-600"
            >
              {settings?.callButtonLabel ? `${settings.callButtonLabel} ${phone}` : phone}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
