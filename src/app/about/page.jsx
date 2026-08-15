import Image from 'next/image'
import {notFound} from 'next/navigation'
import {SiteLayout} from '@/components/layout/SiteLayout'
import {PageBanner} from '@/components/ui/PageBanner'
import {PortableText} from '@/components/content/PortableText'
import {CheckBullet} from '@/components/ui/Icons'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {getPageBySlug, getSiteSettings} from '@/lib/sanity/queries'
import {label} from '@/lib/contact'

export async function generateMetadata() {
  const [page, settings] = await Promise.all([getPageBySlug('about'), getSiteSettings()])
  return buildSeoFromDoc(page, '/about', settings)
}

export default async function AboutPage() {
  const [page, settings] = await Promise.all([getPageBySlug('about'), getSiteSettings()])
  if (!page) notFound()

  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: page.title, path: '/about'},
  ]
  const points = settings?.whyChoosePoints || []
  const stats = settings?.aboutStats || []
  const whoWeAre = page.eyebrow || label(settings, 'whoWeAre')
  const missionTitle = page.missionTitle || label(settings, 'missionTitle')
  const visionTitle = page.visionTitle || label(settings, 'visionTitle')

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs, settings)} />
      <PageBanner title={page.title} subtitle={page.bannerSubtitle || page.excerpt} />
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {page.image ? (
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={page.image}
                alt={page.imageAlt || page.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ) : null}
          <div>
            {whoWeAre ? (
              <p className="text-gold font-heading font-bold uppercase tracking-[0.2em] text-sm mb-2">{whoWeAre}</p>
            ) : null}
            <h2 className="mb-4 font-heading text-2xl font-extrabold uppercase text-navy md:text-3xl">{page.title}</h2>
            {page.excerpt ? <p className="text-slate-600 mb-4 leading-relaxed">{page.excerpt}</p> : null}
            <PortableText value={page.body} />
            {points.length ? (
              <ul className="space-y-3 text-navy mt-6">
                {points.slice(0, 4).map((point) => (
                  <CheckBullet key={point}>{point}</CheckBullet>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </section>

      {page.missionText || page.visionText ? (
        <section className="bg-slate-50 py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
            {page.missionText ? (
              <div className="bg-white border border-slate-200 p-8">
                {missionTitle ? (
                  <h2 className="font-heading text-2xl font-extrabold uppercase text-navy mb-4">{missionTitle}</h2>
                ) : null}
                <p className="text-slate-600 leading-relaxed">{page.missionText}</p>
              </div>
            ) : null}
            {page.visionText ? (
              <div className="bg-white border border-slate-200 p-8">
                {visionTitle ? (
                  <h2 className="font-heading text-2xl font-extrabold uppercase text-navy mb-4">{visionTitle}</h2>
                ) : null}
                <p className="text-slate-600 leading-relaxed">{page.visionText}</p>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {stats.length ? (
        <section className="bg-gold">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 text-center text-navy sm:gap-8 sm:py-10 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-2xl font-extrabold sm:text-3xl md:text-4xl">{stat.value}</p>
                <p className="mt-1 font-heading text-[11px] font-semibold uppercase tracking-wide sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </SiteLayout>
  )
}
