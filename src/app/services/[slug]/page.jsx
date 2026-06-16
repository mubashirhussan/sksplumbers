import {notFound} from 'next/navigation'
import Link from 'next/link'
import {SiteLayout} from '@/components/layout/SiteLayout'
import {Breadcrumbs} from '@/components/ui/Breadcrumbs'
import {PortableText} from '@/components/content/PortableText'
import {CTASection} from '@/components/ui/CTASection'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {serviceSchema, breadcrumbSchema, faqSchema} from '@/lib/seo/jsonld'
import {
  getServiceBySlug,
  getServiceSlugs,
  getSiteSettings,
} from '@/lib/sanity/queries'
import {SERVICE_SLUGS} from '@/lib/site'

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
      'SKS Plumbers offers 24/7 emergency plumbing services across Dubai with same-day response for urgent calls.',
  },
  {
    question: 'Are your plumbers licensed in Dubai?',
    answer:
      'Yes, all SKS Plumbers technicians are licensed and experienced professionals serving Dubai and surrounding areas.',
  },
]

export default async function ServicePage({params}) {
  const {slug} = await params
  const [service, settings] = await Promise.all([getServiceBySlug(slug), getSiteSettings()])

  if (!service) notFound()

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
          faqSchema(SERVICE_FAQS),
        ]}
      />
      <article className="max-w-7xl mx-auto px-4 py-12">
        <Breadcrumbs items={breadcrumbs} />
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{service.title}</h1>
          {service.excerpt && (
            <p className="text-lg text-slate-600 max-w-3xl">{service.excerpt}</p>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <PortableText value={service.body} />

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {SERVICE_FAQS.map((faq) => (
                  <details
                    key={faq.question}
                    className="bg-slate-50 rounded-lg p-4 border border-slate-200"
                  >
                    <summary className="font-semibold text-slate-900 cursor-pointer">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-slate-600 text-sm">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-6">
              <h2 className="font-bold text-slate-900 mb-2">Book This Service</h2>
              <p className="text-sm text-slate-600 mb-4">
                Get a free quote for {service.title.toLowerCase()} in Dubai.
              </p>
              <Link
                href="/pages/contact"
                className="block text-center bg-brand-600 text-white py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
              >
                Contact Us
              </Link>
            </div>
            {service.category && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="font-bold text-slate-900 mb-2">Category</h2>
                <Link
                  href={`/categories/${service.category.slug.current}`}
                  className="text-brand-600 hover:underline"
                >
                  {service.category.title}
                </Link>
              </div>
            )}
          </aside>
        </div>

        <CTASection settings={settings} />
      </article>
    </SiteLayout>
  )
}
