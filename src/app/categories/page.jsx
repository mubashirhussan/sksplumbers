import {SiteLayout} from '@/components/layout/SiteLayout'
import {CategoryCard} from '@/components/ui/Cards'
import {PageBanner} from '@/components/ui/PageBanner'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {getCategories, getPageBySlug, getSiteSettings} from '@/lib/sanity/queries'

export async function generateMetadata() {
  const [page, settings] = await Promise.all([getPageBySlug('categories'), getSiteSettings()])
  return buildSeoFromDoc(page, '/categories', settings)
}

export default async function CategoriesPage() {
  const [categories, page, settings] = await Promise.all([
    getCategories(),
    getPageBySlug('categories'),
    getSiteSettings(),
  ])
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: page?.title || 'Categories', path: '/categories'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs, settings)} />
      <PageBanner title={page?.title} subtitle={page?.bannerSubtitle || page?.excerpt} />
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} settings={settings} />
          ))}
        </div>
      </section>
    </SiteLayout>
  )
}
