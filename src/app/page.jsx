import {SiteLayout} from '@/components/layout/SiteLayout'
import {HomeSections} from '@/components/home/HomeSections'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildMetadata, buildSeoFromDoc} from '@/lib/seo/metadata'
import {localBusinessSchema, webSiteSchema} from '@/lib/seo/jsonld'
import {getSiteSettings, getHomePage, getServices, getCategories, getPosts} from '@/lib/sanity/queries'

export async function generateMetadata() {
  const [settings, home] = await Promise.all([getSiteSettings(), getHomePage()])
  if (home?.seo?.metaTitle || home?.seo?.metaDescription) {
    return buildSeoFromDoc(home, '/', 'SKS Plumbers Dubai')
  }
  return buildMetadata({
    title: settings?.defaultSeoTitle,
    description: settings?.defaultSeoDescription,
    path: '/',
  })
}

export default async function HomePage() {
  const [settings, home, services, categories, posts] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
    getServices(),
    getCategories(),
    getPosts(),
  ])

  return (
    <SiteLayout>
      <JsonLd data={[webSiteSchema(settings), localBusinessSchema(settings)]} />
      <HomeSections
        sections={home.sections}
        services={services}
        categories={categories}
        posts={posts}
        settings={settings}
      />
    </SiteLayout>
  )
}
