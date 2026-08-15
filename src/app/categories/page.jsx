import {SiteLayout} from '@/components/layout/SiteLayout'
import {CategoryCard} from '@/components/ui/Cards'
import {PageBanner} from '@/components/ui/PageBanner'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildMetadata, buildSeoFromDoc} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {getCategories, getPageBySlug} from '@/lib/sanity/queries'
import {withCategoryImage} from '@/lib/images'

export async function generateMetadata() {
  const page = await getPageBySlug('categories')
  if (page) return buildSeoFromDoc(page, '/categories', 'Plumbing Service Categories Dubai')
  return buildMetadata({
    title: 'Plumbing Service Categories Dubai | Handyman Maintenance',
    description:
      'Explore plumbing service categories in Dubai including emergency, residential, commercial, pump services and specialized plumbing.',
    path: '/categories',
  })
}

export default async function CategoriesPage() {
  const [page, categories] = await Promise.all([getPageBySlug('categories'), getCategories()])
  const list = (categories || []).map(withCategoryImage)
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Categories', path: '/categories'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <PageBanner
        title={page?.title || 'Service Categories'}
        subtitle={page?.bannerSubtitle || 'Find the right plumbing service for your property'}
      />
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </section>
    </SiteLayout>
  )
}
