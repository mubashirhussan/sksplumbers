import {SiteLayout} from '@/components/layout/SiteLayout'
import {HomeSections} from '@/components/home/HomeSections'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildMetadata, buildSeoFromDoc} from '@/lib/seo/metadata'
import {localBusinessSchema, webSiteSchema} from '@/lib/seo/jsonld'
import {getSiteSettings, getHomePage} from '@/lib/sanity/queries'

export async function generateMetadata() {
  const [settings, home] = await Promise.all([getSiteSettings(), getHomePage()])
  if (home?.seo?.metaTitle || home?.seo?.metaDescription) {
    return buildSeoFromDoc(home, '/', 'Handyman Maintenance Dubai')
  }
  return buildMetadata({
    title: settings?.defaultSeoTitle,
    description: settings?.defaultSeoDescription,
    path: '/',
  })
}

export default async function HomePage() {
  const settings = await getSiteSettings()

  return (
    <SiteLayout showNeedService={false}>
      <JsonLd data={[webSiteSchema(settings), localBusinessSchema(settings)]} />
      <HomeSections settings={settings} />
    </SiteLayout>
  )
}
