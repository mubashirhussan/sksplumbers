import {SiteLayout} from '@/components/layout/SiteLayout'
import {PageBanner} from '@/components/ui/PageBanner'
import {HowItWorksSteps} from '@/components/ui/HowItWorksSteps'
import {CheckBullet} from '@/components/ui/Icons'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc, buildMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {WHY_CHOOSE_POINTS} from '@/lib/site-content'
import {getPageBySlug, getSiteSettings} from '@/lib/sanity/queries'

export async function generateMetadata() {
  const [page, settings] = await Promise.all([getPageBySlug('why-choose-us'), getSiteSettings()])
  if (page) return buildSeoFromDoc(page, '/why-choose-us', 'Why Choose Handyman Maintenance Dubai')
  return buildMetadata({
    title: 'Why Choose Handyman Maintenance Dubai | How It Works',
    description:
      'See why Dubai homes and businesses choose Handyman Maintenance. Simple 4-step process, licensed experts, and 24/7 emergency plumbing.',
    path: '/why-choose-us',
  })
}

export default async function WhyChooseUsPage() {
  const [page, settings] = await Promise.all([getPageBySlug('why-choose-us'), getSiteSettings()])
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Why Choose Us', path: '/why-choose-us'},
  ]
  const points = settings?.whyChoosePoints?.length ? settings.whyChoosePoints : WHY_CHOOSE_POINTS

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <PageBanner
        title={page?.title || 'Why Choose Us'}
        subtitle={page?.bannerSubtitle || 'A simple process and reliable plumbing you can count on'}
      />
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="text-center mb-12">
          <p className="text-gold font-heading font-bold uppercase tracking-[0.2em] text-sm mb-2">
            {page?.eyebrow || settings?.howItWorksEyebrow || 'Simple Process'}
          </p>
          <h2 className="font-heading text-2xl font-extrabold uppercase text-navy md:text-4xl">
            {settings?.howItWorksHeading || 'How It Works'}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 bg-gold" />
        </div>
        <HowItWorksSteps steps={settings?.howItWorksSteps} />
      </section>
      <section className="bg-slate-50 py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-extrabold uppercase text-navy mb-8 text-center">
            {settings?.whyChooseHeading || 'Why Handyman Maintenance'}
          </h2>
          <ul className="space-y-4 text-navy text-lg">
            {points.map((item) => (
              <CheckBullet key={item}>{item}</CheckBullet>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  )
}
