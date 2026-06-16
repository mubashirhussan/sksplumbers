import {SiteLayout} from '@/components/layout/SiteLayout'
import {CategoryCard} from '@/components/ui/Cards'
import {Breadcrumbs} from '@/components/ui/Breadcrumbs'
import {CTASection} from '@/components/ui/CTASection'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {getCategories, getSiteSettings} from '@/lib/sanity/queries'

export async function generateMetadata() {
  return buildMetadata({
    title: 'Plumbing Service Categories Dubai | SKS Plumbers',
    description:
      'Explore plumbing service categories in Dubai including emergency, residential, commercial, pump services and specialized plumbing.',
    path: '/categories',
  })
}

export default async function CategoriesPage() {
  const [categories, settings] = await Promise.all([getCategories(), getSiteSettings()])
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Categories', path: '/categories'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Plumbing Service Categories
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-3xl">
          Browse our plumbing services by category. SKS Plumbers covers all aspects of residential,
          commercial, and emergency plumbing in Dubai.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(categories || []).map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
        <CTASection settings={settings} />
      </div>
    </SiteLayout>
  )
}
