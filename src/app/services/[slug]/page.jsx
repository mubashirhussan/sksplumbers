import {notFound} from 'next/navigation'
import {CmsImage} from '@/components/ui/CmsImage'
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
} from '@/lib/sanity/queries'
import {SERVICE_SLUGS} from '@/lib/site'
import {withServiceImage, IMAGES} from '@/lib/images'
import {SERVICE_CHECKLIST, WHY_CHOOSE_POINTS, HOME_SERVICE_CARDS} from '@/lib/site-content'

export async function generateStaticParams() {
  const slugs = await getServiceSlugs()
  return (slugs || SERVICE_SLUGS).map((slug) => ({slug}))
}

export async function generateMetadata({params}) {
  const {slug} = await params
  const service = await getServiceBySlug(slug)
  return buildSeoFromDoc(service, `/services/${slug}`, 'Plumbing Service Dubai')
}

const SERVICE_FAQS = [
  {
    question: 'How quickly can you respond to plumbing emergencies in Dubai?',
    answer:
      'Handyman Maintenance offers 24/7 emergency plumbing services across Dubai with same-day response for urgent calls.',
  },
  {
    question: 'Are your plumbers licensed in Dubai?',
    answer:
      'Yes, all Handyman Maintenance technicians are licensed and experienced professionals serving Dubai and surrounding areas.',
  },
]

export default async function ServicePage({params}) {
  const {slug} = await params
  const [rawService, settings] = await Promise.all([getServiceBySlug(slug), getSiteSettings()])

  if (!rawService) notFound()
  const service = withServiceImage(rawService)
  const categorySlug = service.category?.slug?.current
  const checklist =
    service.checklist || SERVICE_CHECKLIST[slug] || SERVICE_CHECKLIST[categorySlug] || SERVICE_CHECKLIST.default
  const cardFaqs = HOME_SERVICE_CARDS.find((card) => card.slug === slug)?.faqs
  const faqs = service.faqs?.length ? service.faqs : cardFaqs || SERVICE_FAQS

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
          breadcrumbSchema(breadcrumbs),
          faqSchema(faqs),
        ]}
      />
      <PageBanner title={service.title} subtitle={service.excerpt} />
      <article className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="relative aspect-[16/9] mb-8 overflow-hidden">
              <CmsImage
                src={service.image || IMAGES.detail}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
            <PortableText value={service.body} />

            <h2 className="font-heading text-2xl font-extrabold uppercase text-navy mt-10 mb-5">
              {settings?.labels?.whatWeCover || 'What We Cover'}
            </h2>
            <ul className="space-y-3 text-navy mb-10">
              {checklist.map((item) => (
                <CheckBullet key={item}>{item}</CheckBullet>
              ))}
            </ul>

            <h2 className="font-heading text-2xl font-extrabold uppercase text-navy mb-5">
              {settings?.whyChooseHeading || 'Why Choose Us?'}
            </h2>
            <ul className="space-y-3 text-navy mb-12">
              {(settings?.whyChoosePoints?.length ? settings.whyChoosePoints : WHY_CHOOSE_POINTS).map((item) => (
                <CheckBullet key={item}>{item}</CheckBullet>
              ))}
            </ul>

            <section>
              <h2 className="font-heading text-2xl font-extrabold uppercase text-navy mb-6">
                {settings?.labels?.faqHeading || 'Frequently Asked Questions'}
              </h2>
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
          </div>

          <aside className="space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden">
              <CmsImage
                src={IMAGES.detail}
                alt="Handyman Maintenance technician ready to help"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <QuoteForm defaultService={service.title} settings={settings} />
          </aside>
        </div>
      </article>
    </SiteLayout>
  )
}
