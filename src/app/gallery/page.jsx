import {SiteLayout} from '@/components/layout/SiteLayout'
import {PageBanner} from '@/components/ui/PageBanner'
import {GalleryGrid} from '@/components/gallery/GalleryGrid'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {getGalleryPage, getSiteSettings} from '@/lib/sanity/queries'

export async function generateMetadata() {
  const [page, settings] = await Promise.all([getGalleryPage(), getSiteSettings()])
  return buildSeoFromDoc(page, '/gallery', settings)
}

export default async function GalleryPage() {
  const [page, settings] = await Promise.all([getGalleryPage(), getSiteSettings()])
  const title = page?.title
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: title || '', path: '/gallery'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs, settings)} />
      <PageBanner title={title} subtitle={page?.subtitle} />
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <GalleryGrid filters={page?.filters || []} images={page?.images || []} />
      </section>
    </SiteLayout>
  )
}
