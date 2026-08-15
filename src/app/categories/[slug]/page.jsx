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
} from '@/lib/sanity/queries'
import {CATEGORY_SLUGS} from '@/lib/site'
import {withCategoryImage, withServiceImage, IMAGES} from '@/lib/images'

export async function generateStaticParams() {
  const slugs = await getCategorySlugs()
  return (slugs || CATEGORY_SLUGS).map((slug) => ({slug}))
}

export async function generateMetadata({params}) {
  const {slug} = await params
  const category = await getCategoryBySlug(slug)
  return buildSeoFromDoc(category, `/categories/${slug}`, 'Plumbing Category Dubai')
}

export default async function CategoryPage({params}) {
  const {slug} = await params
  const [rawCategory, rawServices] = await Promise.all([
    getCategoryBySlug(slug),
    getServicesByCategory(slug),
  ])

  if (!rawCategory) notFound()
  const category = withCategoryImage(rawCategory)
  const services = (rawServices || []).map(withServiceImage)

  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Categories', path: '/categories'},
    {name: category.title, path: `/categories/${slug}`},
  ]

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <PageBanner title={category.title} subtitle={category.description} />
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        {category.image && (
          <div className="relative aspect-[21/8] mb-10 overflow-hidden">
            <Image
              src={category.image || IMAGES.plumbing}
              alt={category.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}
        {category.body && (
          <div className="mb-10 max-w-3xl">
            <PortableText value={category.body} />
          </div>
        )}
        <h2 className="font-heading text-2xl font-extrabold uppercase text-navy mb-6">
          Services in this Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </div>
    </SiteLayout>
  )
}
