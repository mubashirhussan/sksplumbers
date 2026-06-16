import {notFound} from 'next/navigation'
import {SiteLayout} from '@/components/layout/SiteLayout'
import {Breadcrumbs} from '@/components/ui/Breadcrumbs'
import {PortableText} from '@/components/content/PortableText'
import {CTASection} from '@/components/ui/CTASection'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {getPageBySlug, getSiteSettings} from '@/lib/sanity/queries'

export async function generateMetadata() {
  const page = await getPageBySlug('about')
  return buildSeoFromDoc(page, '/pages/about', 'About SKS Plumbers Dubai')
}

export default async function AboutPage() {
  const [page, settings] = await Promise.all([getPageBySlug('about'), getSiteSettings()])

  if (!page) notFound()

  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'About', path: '/pages/about'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{page.title}</h1>
        {page.excerpt && <p className="text-lg text-slate-600 mb-8">{page.excerpt}</p>}
        <PortableText value={page.body} />
        <CTASection settings={settings} />
      </div>
    </SiteLayout>
  )
}
