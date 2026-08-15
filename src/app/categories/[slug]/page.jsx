import {notFound} from 'next/navigation'
import Image from 'next/image'
import {SiteLayout} from '@/components/layout/SiteLayout'
import {ServiceCard} from '@/components/ui/Cards'
import {PageBanner} from '@/components/ui/PageBanner'
import {PortableText} from '@/components/content/PortableText'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {
  getCategoryBySlug,
  getCategorySlugs,
  getServicesByCategory,
  getSiteSettings,
} from '@/lib/sanity/queries'
import {label} from '@/lib/contact'

export async function generateStaticParams() {
  const slugs = await getCategorySlugs()
  return slugs.map((slug) => ({slug}))
}

export async function generateMetadata({params}) {
  const {slug} = await params
  const [category, settings] = await Promise.all([getCategoryBySlug(slug), getSiteSettings()])
  return buildSeoFromDoc(category, `/categories/${slug}`, settings)
}

export default async function CategoryPage({params}) {
  const {slug} = await params
  const [category, services, settings] = await Promise.all([
    getCategoryBySlug(slug),
    getServicesByCategory(slug),
    getSiteSettings(),
  ])

  if (!category) notFound()

  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Categories', path: '/categories'},
    {name: category.title, path: `/categories/${slug}`},
  ]

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs, settings)} />
      <PageBanner title={category.title} subtitle={category.description} />
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        {category.image ? (
          <div className="relative aspect-[21/8] mb-10 overflow-hidden">
            <Image
              src={category.image}
              alt={category.imageAlt || category.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ) : null}
        {category.body ? (
          <div className="mb-10 max-w-3xl">
            <PortableText value={category.body} />
          </div>
        ) : null}
        {label(settings, 'servicesInCategory') ? (
          <h2 className="font-heading text-2xl font-extrabold uppercase text-navy mb-6">
            {label(settings, 'servicesInCategory')}
          </h2>
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} settings={settings} />
          ))}
        </div>
      </div>
    </SiteLayout>
  )
}
