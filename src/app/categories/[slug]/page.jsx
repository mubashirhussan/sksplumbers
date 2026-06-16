import {notFound} from 'next/navigation'
import {SiteLayout} from '@/components/layout/SiteLayout'
import {ServiceCard} from '@/components/ui/Cards'
import {Breadcrumbs} from '@/components/ui/Breadcrumbs'
import {PortableText} from '@/components/content/PortableText'
import {CTASection} from '@/components/ui/CTASection'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {
  getCategoryBySlug,
  getCategorySlugs,
  getServicesByCategory,
  getSiteSettings,
} from '@/lib/sanity/queries'
import {CATEGORY_SLUGS} from '@/lib/site'

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
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Breadcrumbs items={breadcrumbs} />
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{category.title}</h1>
          {category.description && (
            <p className="text-lg text-slate-600 max-w-3xl">{category.description}</p>
          )}
        </header>

        {category.body && (
          <div className="mb-10 max-w-3xl">
            <PortableText value={category.body} />
          </div>
        )}

        <h2 className="text-2xl font-bold text-slate-900 mb-6">Services in this Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {(services || []).map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>

        <CTASection settings={settings} />
      </div>
    </SiteLayout>
  )
}
