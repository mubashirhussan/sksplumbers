import Image from 'next/image'
import {notFound} from 'next/navigation'
import {SiteLayout} from '@/components/layout/SiteLayout'
import {PageBanner} from '@/components/ui/PageBanner'
import {CheckBullet} from '@/components/ui/Icons'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {getPageBySlug, getSiteSettings} from '@/lib/sanity/queries'
import {label} from '@/lib/contact'

export async function generateMetadata() {
  const [page, settings] = await Promise.all([getPageBySlug('service-areas'), getSiteSettings()])
  return buildSeoFromDoc(page || {title: settings?.serviceAreasHeading}, '/service-areas', settings)
}

export default async function ServiceAreasPage() {
  const [page, settings] = await Promise.all([getPageBySlug('service-areas'), getSiteSettings()])
  const areas = settings?.serviceAreas || []
  if (!page && !areas.length) notFound()

  const title = page?.title || settings?.serviceAreasHeading
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: title || '', path: '/service-areas'},
  ]
  const eyebrow = page?.eyebrow || label(settings, 'dubaiCoverage')
  const heading = settings?.serviceAreasHeading

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs, settings)} />
      <PageBanner title={title} subtitle={page?.bannerSubtitle || page?.excerpt} />
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <div>
            {eyebrow ? (
              <p className="text-gold font-heading font-bold uppercase tracking-[0.2em] text-sm mb-2">{eyebrow}</p>
            ) : null}
            {heading ? (
              <h2 className="mb-6 font-heading text-2xl font-extrabold uppercase text-navy md:text-3xl">{heading}</h2>
            ) : null}
            {areas.length ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-navy">
                {areas.map((area) => (
                  <CheckBullet key={area}>{area}</CheckBullet>
                ))}
              </ul>
            ) : null}
          </div>
          {page?.image ? (
            <div className="relative min-h-[220px] overflow-hidden sm:min-h-[360px]">
              <Image
                src={page.image}
                alt={page.imageAlt || page.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ) : null}
        </div>
      </section>
    </SiteLayout>
  )
}
