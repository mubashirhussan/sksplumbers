import {SiteLayout} from '@/components/layout/SiteLayout'
import {ServiceCard} from '@/components/ui/Cards'
import {PageBanner} from '@/components/ui/PageBanner'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildMetadata, buildSeoFromDoc} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {getPageBySlug, getServices} from '@/lib/sanity/queries'
import {withServiceImage} from '@/lib/images'

export async function generateMetadata() {
  const page = await getPageBySlug('services')
  if (page) return buildSeoFromDoc(page, '/services', 'Plumbing Services Dubai')
  return buildMetadata({
    title: 'Plumbing Services Dubai | Handyman Maintenance',
    description:
      'Browse all plumbing services in Dubai. Emergency plumber, water pump repair, drain cleaning, water heater services and more from Handyman Maintenance.',
    path: '/services',
  })
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([getPageBySlug('services'), getServices()])
  const list = (services || []).map(withServiceImage)
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Services', path: '/services'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <PageBanner
        title={page?.title || 'Our Services'}
        subtitle={page?.bannerSubtitle || 'Professional plumbing for homes, offices, and villas across Dubai'}
      />
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </section>
    </SiteLayout>
  )
}
