import {SiteLayout} from '@/components/layout/SiteLayout'
import {ServiceCard} from '@/components/ui/Cards'
import {Breadcrumbs} from '@/components/ui/Breadcrumbs'
import {CTASection} from '@/components/ui/CTASection'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {getServices, getSiteSettings} from '@/lib/sanity/queries'

export async function generateMetadata() {
  return buildMetadata({
    title: 'Plumbing Services Dubai | SKS Plumbers',
    description:
      'Browse all plumbing services in Dubai. Emergency plumber, water pump repair, drain cleaning, water heater services and more from SKS Plumbers.',
    path: '/services',
  })
}

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSiteSettings()])
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Services', path: '/services'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Plumbing Services in Dubai
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-3xl">
          SKS Plumbers offers a complete range of professional plumbing services across Dubai.
          From emergency repairs to water pump maintenance, our licensed plumbers are ready to help.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(services || []).map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
        <CTASection settings={settings} />
      </div>
    </SiteLayout>
  )
}
