import Link from 'next/link'
import {Icon} from '@/components/ui/Icons'
import {servicePath} from '@/lib/site'

export function ServiceSidebar({currentSlug, services = [], settings}) {
  const otherServices = services.filter((service) => {
    const slug = service.slug?.current || service.slug
    return slug && slug !== currentSlug
  })
  const areas = settings?.serviceAreas || []
  const labels = settings?.labels || {}

  return (
    <div className="space-y-6">
      {otherServices.length > 0 ? (
        <div className="border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <h2 className="font-heading text-xl font-extrabold uppercase text-navy mb-4">
            {labels.otherServices || 'Other Services'}
          </h2>
          <ul className="space-y-1">
            {otherServices.map((service) => {
              const slug = service.slug?.current || service.slug
              return (
                <li key={service._id || slug}>
                  <Link
                    href={servicePath(slug)}
                    className="group flex items-center gap-3 border-b border-slate-100 px-1 py-3 last:border-b-0 hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-navy text-gold">
                      <Icon name={service.icon || 'plumbing'} className="h-4 w-4" />
                    </span>
                    <span className="font-heading text-sm font-bold uppercase text-navy group-hover:text-gold transition-colors">
                      {service.title}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}

      {areas.length > 0 ? (
        <div className="border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <h2 className="font-heading text-xl font-extrabold uppercase text-navy mb-4">
            {labels.ourLocations || settings?.serviceAreasHeading || 'Our Locations'}
          </h2>
          <ul className="space-y-2.5">
            {areas.map((area) => (
              <li key={area} className="flex items-start gap-2.5 text-sm text-navy">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-gold">
                  <Icon name="pin" className="h-4 w-4" />
                </span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/service-areas/"
            className="mt-5 inline-flex font-heading text-sm font-bold uppercase tracking-wide text-gold hover:text-navy transition-colors"
          >
            {labels.viewAllAreas || 'View All Areas'}
          </Link>
        </div>
      ) : null}
    </div>
  )
}
