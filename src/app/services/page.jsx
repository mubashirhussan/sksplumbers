import {SiteLayout} from '@/components/layout/SiteLayout'
import {ServiceCard} from '@/components/ui/Cards'
import {PageBanner} from '@/components/ui/PageBanner'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {getServices} from '@/lib/sanity/queries'
import {withServiceImage} from '@/lib/images'

export async function generateMetadata() {
  return buildMetadata({
    title: 'Plumbing Services Dubai | Handyman Maintenance',
    description:
      'Browse all plumbing services in Dubai. Emergency plumber, water pump repair, drain cleaning, water heater services and more from Handyman Maintenance.',
    path: '/services',
  })
}

export default async function ServicesPage() {
  const services = (await getServices()).map(withServiceImage)
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Services', path: '/services'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <PageBanner
        title="Our Services"
        subtitle="Professional plumbing for homes, offices, and villas across Dubai"
      />
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </section>
    </SiteLayout>
  )
}
