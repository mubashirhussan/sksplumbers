import {SiteLayout} from '@/components/layout/SiteLayout'
import {PageBanner} from '@/components/ui/PageBanner'
import {GalleryGrid} from '@/components/gallery/GalleryGrid'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'

export async function generateMetadata() {
  return buildMetadata({
    title: 'Plumbing Gallery Dubai | Handyman Maintenance',
    description:
      'See Handyman Maintenance at work across Dubai — pipe repairs, drain cleaning, water pumps, heaters, and villa plumbing projects.',
    path: '/gallery',
  })
}

export default function GalleryPage() {
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Gallery', path: '/gallery'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <PageBanner title="Gallery" subtitle="Real plumbing work completed across Dubai" />
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <GalleryGrid />
      </section>
    </SiteLayout>
  )
}
