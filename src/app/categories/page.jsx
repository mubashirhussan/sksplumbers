import {SiteLayout} from '@/components/layout/SiteLayout'
import {CategoryCard} from '@/components/ui/Cards'
import {PageBanner} from '@/components/ui/PageBanner'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {getCategories} from '@/lib/sanity/queries'
import {withCategoryImage} from '@/lib/images'

export async function generateMetadata() {
  return buildMetadata({
    title: 'Plumbing Service Categories Dubai | Handyman Maintenance',
    description:
      'Explore plumbing service categories in Dubai including emergency, residential, commercial, pump services and specialized plumbing.',
    path: '/categories',
  })
}

export default async function CategoriesPage() {
  const categories = (await getCategories()).map(withCategoryImage)
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Categories', path: '/categories'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <PageBanner title="Service Categories" subtitle="Find the right plumbing service for your property" />
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </section>
    </SiteLayout>
  )
}
