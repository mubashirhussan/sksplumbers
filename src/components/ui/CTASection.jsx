import Link from 'next/link'

export function CTASection({settings, title, description, buttonLabel, buttonHref, showPhone = true}) {
  const phone = settings?.phone

  return (
    <section className="my-8 rounded-2xl bg-brand-700 p-6 text-white md:my-12 md:p-12">
      <div className="max-w-3xl">
        <h2 className="mb-4 text-xl font-bold md:text-3xl">
          {title || 'Need a Plumber in Dubai?'}
        </h2>
        <p className="mb-6 text-base text-brand-100 md:text-lg">
          {description ||
            'Handyman Maintenance offers fast, affordable plumbing services across Dubai. Available 24/7 for emergencies.'}
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
          <Link
            href={buttonHref || '/contact'}
            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            {buttonLabel || 'Get Free Quote'}
          </Link>
          {showPhone && phone && (
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-600"
            >
              Call {phone}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
