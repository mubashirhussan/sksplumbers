import {notFound} from 'next/navigation'
import {CmsImage} from '@/components/ui/CmsImage'
import {SiteLayout} from '@/components/layout/SiteLayout'
import {PageBanner} from '@/components/ui/PageBanner'
import {PortableText} from '@/components/content/PortableText'
import {QuoteForm} from '@/components/ui/QuoteForm'
import {ServiceSidebar} from '@/components/ui/ServiceSidebar'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {serviceSchema, breadcrumbSchema} from '@/lib/seo/jsonld'
import {
  getServiceBySlug,
  getServices,
  getServiceSlugs,
  getSiteSettings,
} from '@/lib/sanity/queries'
import {SERVICE_SLUGS} from '@/lib/site'
import {withServiceImage, IMAGES} from '@/lib/images'

export async function generateStaticParams() {
  const slugs = await getServiceSlugs()
  return (slugs || SERVICE_SLUGS).map((slug) => ({slug}))
}

export async function generateMetadata({params}) {
  const {slug} = await params
  const service = await getServiceBySlug(slug)
  return buildSeoFromDoc(service, `/${slug}`, 'Plumbing Service Dubai')
}

export default async function ServicePage({params}) {
  const {slug} = await params
  const [rawService, services, settings] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getSiteSettings(),
  ])

  if (!rawService) notFound()
  const service = withServiceImage(rawService)

  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Services', path: '/services'},
    ...(service.category
      ? [{name: service.category.title, path: `/categories/${service.category.slug.current}`}]
      : []),
    {name: service.title, path: `/${slug}`},
  ]

  return (
    <SiteLayout>
      <JsonLd
        data={[
          serviceSchema(service, settings),
          breadcrumbSchema(breadcrumbs),
        ]}
      />
      <PageBanner title={service.title} subtitle={service.excerpt} />
      <article className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="relative aspect-[16/9] mb-8 overflow-hidden">
              <CmsImage
                src={service.image || IMAGES.detail}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
            <PortableText value={service.body} />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <ServiceSidebar currentSlug={slug} services={services} settings={settings} />
            <QuoteForm defaultService={service.title} settings={settings} />
          </aside>
        </div>
      </article>
    </SiteLayout>
  )
}
