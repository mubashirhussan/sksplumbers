import {notFound} from 'next/navigation'
import Image from 'next/image'
import {SiteLayout} from '@/components/layout/SiteLayout'
import {PageBanner} from '@/components/ui/PageBanner'
import {PortableText} from '@/components/content/PortableText'
import {QuoteForm} from '@/components/ui/QuoteForm'
import {CheckBullet} from '@/components/ui/Icons'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {serviceSchema, breadcrumbSchema, faqSchema} from '@/lib/seo/jsonld'
import {
  getServiceBySlug,
  getServiceSlugs,
  getSiteSettings,
  getServices,
} from '@/lib/sanity/queries'
import {label} from '@/lib/contact'

export async function generateStaticParams() {
  const slugs = await getServiceSlugs()
  return slugs.map((slug) => ({slug}))
}

export async function generateMetadata({params}) {
  const {slug} = await params
  const [service, settings] = await Promise.all([getServiceBySlug(slug), getSiteSettings()])
  return buildSeoFromDoc(service, `/services/${slug}`, settings)
}

export default async function ServicePage({params}) {
  const {slug} = await params
  const [service, settings, services] = await Promise.all([
    getServiceBySlug(slug),
    getSiteSettings(),
    getServices(),
  ])

  if (!service) notFound()

  const checklist = service.checklist || []
  const faqs = service.faqs || []
  const points = settings?.whyChoosePoints || []

  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Services', path: '/services'},
    ...(service.category
      ? [{name: service.category.title, path: `/categories/${service.category.slug.current}`}]
      : []),
    {name: service.title, path: `/services/${slug}`},
  ]

  return (
    <SiteLayout>
      <JsonLd
        data={[
          serviceSchema(service, settings),
          breadcrumbSchema(breadcrumbs, settings),
          faqSchema(faqs),
        ]}
      />
      <PageBanner title={service.title} subtitle={service.excerpt} />
      <article className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {service.image ? (
              <div className="relative aspect-[16/9] mb-8 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.imageAlt || service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
            ) : null}
            <PortableText value={service.body} />

            {checklist.length ? (
              <>
                {label(settings, 'whatWeCover') ? (
                  <h2 className="font-heading text-2xl font-extrabold uppercase text-navy mt-10 mb-5">
                    {label(settings, 'whatWeCover')}
                  </h2>
                ) : null}
                <ul className="space-y-3 text-navy mb-10">
                  {checklist.map((item) => (
                    <CheckBullet key={item}>{item}</CheckBullet>
                  ))}
                </ul>
              </>
            ) : null}

            {points.length ? (
              <>
                {settings?.whyChooseHeading ? (
                  <h2 className="font-heading text-2xl font-extrabold uppercase text-navy mb-5">
                    {settings.whyChooseHeading}
                  </h2>
                ) : null}
                <ul className="space-y-3 text-navy mb-12">
                  {points.map((item) => (
                    <CheckBullet key={item}>{item}</CheckBullet>
                  ))}
                </ul>
              </>
            ) : null}

            {faqs.length ? (
              <section>
                {label(settings, 'faqHeading') ? (
                  <h2 className="font-heading text-2xl font-extrabold uppercase text-navy mb-6">
                    {label(settings, 'faqHeading')}
                  </h2>
                ) : null}
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <details key={faq.question} className="bg-slate-50 p-4 border border-slate-200">
                      <summary className="font-heading font-semibold text-navy cursor-pointer">
                        {faq.question}
                      </summary>
                      <p className="mt-3 text-slate-600 text-sm">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-6">
            {service.image ? (
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.imageAlt || service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            ) : null}
            <QuoteForm settings={settings} services={services} defaultService={service.title} />
          </aside>
        </div>
      </article>
    </SiteLayout>
  )
}
