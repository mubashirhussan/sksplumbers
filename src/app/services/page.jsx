import {SiteLayout} from '@/components/layout/SiteLayout'
import {ServiceCard} from '@/components/ui/Cards'
import {PageBanner} from '@/components/ui/PageBanner'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {getServices, getPageBySlug, getSiteSettings} from '@/lib/sanity/queries'

export async function generateMetadata() {
  const [page, settings] = await Promise.all([getPageBySlug('services'), getSiteSettings()])
  return buildSeoFromDoc(page, '/services', settings)
}

export default async function ServicesPage() {
  const [services, page, settings] = await Promise.all([
    getServices(),
    getPageBySlug('services'),
    getSiteSettings(),
  ])
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: page?.title || 'Services', path: '/services'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs, settings)} />
      <PageBanner title={page?.title} subtitle={page?.bannerSubtitle || page?.excerpt} />
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} settings={settings} />
          ))}
        </div>
      </section>
    </SiteLayout>
  )
}
