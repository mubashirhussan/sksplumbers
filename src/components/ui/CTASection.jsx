import Link from 'next/link'

export function CTASection({settings, title, description, buttonLabel, buttonHref, showPhone = true}) {
  const phone = settings?.phone

  return (
    <section className="bg-brand-700 text-white rounded-2xl p-8 md:p-12 my-12">
      <div className="max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {title || 'Need a Plumber in Dubai?'}
        </h2>
        <p className="text-brand-100 mb-6 text-lg">
          {description ||
            'SKS Plumbers offers fast, affordable plumbing services across Dubai. Available 24/7 for emergencies.'}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href={buttonHref || '/contact'}
            className="bg-white text-brand-700 px-6 py-3 rounded-lg font-semibold hover:bg-brand-50 transition-colors"
          >
            {buttonLabel || 'Get Free Quote'}
          </Link>
          {showPhone && phone && (
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-600 transition-colors"
            >
              Call {phone}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
