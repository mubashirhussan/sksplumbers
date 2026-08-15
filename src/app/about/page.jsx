import Image from 'next/image'
import {SiteLayout} from '@/components/layout/SiteLayout'
import {PageBanner} from '@/components/ui/PageBanner'
import {CheckBullet} from '@/components/ui/Icons'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {getPageBySlug} from '@/lib/sanity/queries'
import {IMAGES} from '@/lib/images'
import {ABOUT_STATS, WHY_CHOOSE_POINTS} from '@/lib/site-content'

export async function generateMetadata() {
  const page = await getPageBySlug('about')
  return buildSeoFromDoc(page, '/about', 'About Handyman Maintenance Dubai')
}

export default async function AboutPage() {
  const page = await getPageBySlug('about')
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'About', path: '/about'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <PageBanner title="About Us" subtitle="Dubai’s trusted plumbing and maintenance experts" />
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={IMAGES.about}
              alt="Handyman repairing pipes under a kitchen sink"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-gold font-heading font-bold uppercase tracking-[0.2em] text-sm mb-2">Who We Are</p>
            <h2 className="mb-4 font-heading text-2xl font-extrabold uppercase text-navy md:text-3xl">
              {page?.title || 'About Handyman Maintenance'}
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              {page?.excerpt ||
                'Handyman Maintenance is a trusted plumbing company in Dubai, delivering professional residential and commercial plumbing services.'}
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Our licensed technicians handle emergency callouts, water pump repair, drain cleaning, water heaters, and complete villa plumbing across Dubai.
            </p>
            <ul className="space-y-3 text-navy">
              {WHY_CHOOSE_POINTS.slice(0, 4).map((point) => (
                <CheckBullet key={point}>{point}</CheckBullet>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white border border-slate-200 p-8">
            <h2 className="font-heading text-2xl font-extrabold uppercase text-navy mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              To provide fast, honest, and high-quality plumbing services that keep Dubai homes, offices, and villas running without disruption.
            </p>
          </div>
          <div className="bg-white border border-slate-200 p-8">
            <h2 className="font-heading text-2xl font-extrabold uppercase text-navy mb-4">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed">
              To be Dubai’s most reliable plumbing partner — known for 24/7 emergency response, skilled workmanship, and transparent pricing.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gold">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 text-center text-navy sm:gap-8 sm:py-10 lg:grid-cols-4">
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-2xl font-extrabold sm:text-3xl md:text-4xl">{stat.value}</p>
              <p className="mt-1 font-heading text-[11px] font-semibold uppercase tracking-wide sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  )
}
