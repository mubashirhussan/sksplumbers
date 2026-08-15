import {CmsImage} from '@/components/ui/CmsImage'
import {SiteLayout} from '@/components/layout/SiteLayout'
import {PageBanner} from '@/components/ui/PageBanner'
import {CheckBullet} from '@/components/ui/Icons'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildMetadata, buildSeoFromDoc} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {IMAGES} from '@/lib/images'
import {SERVICE_AREAS} from '@/lib/site-content'
import {getPageBySlug, getSiteSettings} from '@/lib/sanity/queries'

export async function generateMetadata() {
  const page = await getPageBySlug('service-areas')
  if (page) return buildSeoFromDoc(page, '/service-areas', 'Plumbing Service Areas in Dubai')
  return buildMetadata({
    title: 'Plumbing Service Areas in Dubai | Handyman Maintenance',
    description:
      'Handyman Maintenance serves Dubai Marina, Jumeirah, Business Bay, Downtown Dubai, JLT, JVC, Al Barsha and more. 24/7 plumbing across Dubai.',
    path: '/service-areas',
  })
}

export default async function ServiceAreasPage() {
  const [page, settings] = await Promise.all([getPageBySlug('service-areas'), getSiteSettings()])
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Service Areas', path: '/service-areas'},
  ]
  const areas = settings?.serviceAreas?.length ? settings.serviceAreas : SERVICE_AREAS

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <PageBanner
        title={page?.title || 'Service Areas'}
        subtitle={page?.bannerSubtitle || 'Licensed plumbers covering homes and businesses across Dubai'}
      />
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <div>
            <p className="text-gold font-heading font-bold uppercase tracking-[0.2em] text-sm mb-2">
              {page?.eyebrow || 'Dubai Coverage'}
            </p>
            <h2 className="mb-6 font-heading text-2xl font-extrabold uppercase text-navy md:text-3xl">
              {settings?.serviceAreasHeading || 'Areas We Serve'}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-navy">
              {areas.map((area) => (
                <CheckBullet key={area}>{area}</CheckBullet>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[220px] overflow-hidden sm:min-h-[360px]">
            <CmsImage
              src={page?.image || IMAGES.skyline}
              alt={page?.title || 'Dubai skyline including the Burj Khalifa'}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
