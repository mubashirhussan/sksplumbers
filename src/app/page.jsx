import {SiteLayout} from '@/components/layout/SiteLayout'
import {HomeSections} from '@/components/home/HomeSections'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {localBusinessSchema, webSiteSchema} from '@/lib/seo/jsonld'
import {getSiteSettings, getHomePage} from '@/lib/sanity/queries'

export async function generateMetadata() {
  const [settings, home] = await Promise.all([getSiteSettings(), getHomePage()])
  return buildSeoFromDoc(home, '/', settings)
}

export default async function HomePage() {
  const [settings, home] = await Promise.all([getSiteSettings(), getHomePage()])

  return (
    <SiteLayout showNeedService={false}>
      <JsonLd data={[webSiteSchema(settings), localBusinessSchema(settings)].filter(Boolean)} />
      <HomeSections settings={settings} home={home} />
    </SiteLayout>
  )
}
