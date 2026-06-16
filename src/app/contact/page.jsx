import {notFound} from 'next/navigation'
import {SiteLayout} from '@/components/layout/SiteLayout'
import {Breadcrumbs} from '@/components/ui/Breadcrumbs'
import {PortableText} from '@/components/content/PortableText'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {breadcrumbSchema, localBusinessSchema} from '@/lib/seo/jsonld'
import {getPageBySlug, getSiteSettings} from '@/lib/sanity/queries'

export async function generateMetadata() {
  const page = await getPageBySlug('contact')
  return buildSeoFromDoc(page, '/contact', 'Contact SKS Plumbers Dubai')
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getPageBySlug('contact'), getSiteSettings()])

  if (!page) notFound()

  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Contact', path: '/contact'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), localBusinessSchema(settings)]} />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Breadcrumbs items={breadcrumbs} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{page.title}</h1>
            {page.excerpt && <p className="text-lg text-slate-600 mb-8">{page.excerpt}</p>}
            <PortableText value={page.body} />

            <div className="mt-8 space-y-4">
              {settings?.phone && (
                <div>
                  <h2 className="font-semibold text-slate-900">Phone</h2>
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, '')}`}
                    className="text-brand-600 hover:underline text-lg"
                  >
                    {settings.phone}
                  </a>
                </div>
              )}
              {settings?.email && (
                <div>
                  <h2 className="font-semibold text-slate-900">Email</h2>
                  <a href={`mailto:${settings.email}`} className="text-brand-600 hover:underline">
                    {settings.email}
                  </a>
                </div>
              )}
              {settings?.address && (
                <div>
                  <h2 className="font-semibold text-slate-900">Address</h2>
                  <p className="text-slate-600">{settings.address}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-8 h-fit">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Send Us a Message</h2>
            <form className="space-y-4" action="#" method="POST">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-600 text-white py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
