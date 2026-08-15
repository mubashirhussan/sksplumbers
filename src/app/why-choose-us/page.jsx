import {notFound} from 'next/navigation'
import {SiteLayout} from '@/components/layout/SiteLayout'
import {PageBanner} from '@/components/ui/PageBanner'
import {HowItWorksSteps} from '@/components/ui/HowItWorksSteps'
import {CheckBullet} from '@/components/ui/Icons'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {getPageBySlug, getSiteSettings} from '@/lib/sanity/queries'

export async function generateMetadata() {
  const [page, settings] = await Promise.all([getPageBySlug('why-choose-us'), getSiteSettings()])
  return buildSeoFromDoc(page || {title: settings?.whyChooseHeading}, '/why-choose-us', settings)
}

export default async function WhyChooseUsPage() {
  const [page, settings] = await Promise.all([getPageBySlug('why-choose-us'), getSiteSettings()])
  const steps = settings?.howItWorksSteps || []
  const points = settings?.whyChoosePoints || []
  if (!page && !steps.length && !points.length) notFound()

  const title = page?.title || settings?.whyChooseHeading
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: title || '', path: '/why-choose-us'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs, settings)} />
      <PageBanner title={title} subtitle={page?.bannerSubtitle || page?.excerpt} />
      {steps.length ? (
        <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
          <div className="text-center mb-12">
            {page?.eyebrow || settings?.howItWorksEyebrow ? (
              <p className="text-gold font-heading font-bold uppercase tracking-[0.2em] text-sm mb-2">
                {page?.eyebrow || settings.howItWorksEyebrow}
              </p>
            ) : null}
            {settings?.howItWorksHeading ? (
              <h2 className="font-heading text-2xl font-extrabold uppercase text-navy md:text-4xl">
                {settings.howItWorksHeading}
              </h2>
            ) : null}
            <div className="mx-auto mt-4 h-1 w-16 bg-gold" />
          </div>
          <HowItWorksSteps steps={steps} />
        </section>
      ) : null}
      {points.length ? (
        <section className="bg-slate-50 py-10 md:py-16">
          <div className="max-w-3xl mx-auto px-4">
            {settings?.whyChooseHeading ? (
              <h2 className="font-heading text-3xl font-extrabold uppercase text-navy mb-8 text-center">
                {settings.whyChooseHeading}
              </h2>
            ) : null}
            <ul className="space-y-4 text-navy text-lg">
              {points.map((item) => (
                <CheckBullet key={item}>{item}</CheckBullet>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </SiteLayout>
  )
}
