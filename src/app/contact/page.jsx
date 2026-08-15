import {SiteLayout} from '@/components/layout/SiteLayout'
import {PageBanner} from '@/components/ui/PageBanner'
import {QuoteForm} from '@/components/ui/QuoteForm'
import {Icon} from '@/components/ui/Icons'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {breadcrumbSchema, localBusinessSchema} from '@/lib/seo/jsonld'
import {getPageBySlug, getSiteSettings} from '@/lib/sanity/queries'
import {telHref, whatsappHref} from '@/lib/contact'

export async function generateMetadata() {
  const page = await getPageBySlug('contact')
  return buildSeoFromDoc(page, '/contact', 'Contact Handyman Maintenance Dubai')
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getPageBySlug('contact'), getSiteSettings()])
  const phone = settings?.phone
  const tel = telHref(phone)
  const wa = whatsappHref(phone)

  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Contact', path: '/contact'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), localBusinessSchema(settings)]} />
      <PageBanner title="Contact Us" subtitle="Get in touch for fast plumbing service across Dubai" />
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="text-gold font-heading font-bold uppercase tracking-[0.2em] text-sm mb-2">Get In Touch</p>
            <h2 className="mb-4 font-heading text-2xl font-extrabold uppercase text-navy md:text-3xl">
              {page?.title || 'Contact Handyman Maintenance'}
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {page?.excerpt ||
                'Need a plumber in Dubai? Call, WhatsApp, or send a message. We are available 24/7 for emergencies.'}
            </p>
            <div className="space-y-6">
              {settings?.address && (
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-gold">
                    <Icon name="pin" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold uppercase text-navy">Address</h3>
                    <p className="text-slate-600">{settings.address}</p>
                  </div>
                </div>
              )}
              {phone && (
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-gold">
                    <Icon name="phone" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold uppercase text-navy">Phone</h3>
                    <a href={tel} className="text-slate-600 hover:text-gold">
                      {phone}
                    </a>
                    {wa && (
                      <a href={wa} className="block text-sm text-gold mt-1" target="_blank" rel="noopener noreferrer">
                        WhatsApp Now
                      </a>
                    )}
                  </div>
                </div>
              )}
              {settings?.email && (
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-gold">
                    <Icon name="mail" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold uppercase text-navy">Email</h3>
                    <a href={`mailto:${settings.email}`} className="text-slate-600 hover:text-gold">
                      {settings.email}
                    </a>
                  </div>
                </div>
              )}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-gold">
                  <Icon name="clock" className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold uppercase text-navy">Working Hours</h3>
                  <p className="text-slate-600">24/7 Emergency Service</p>
                </div>
              </div>
            </div>
          </div>
          <QuoteForm title="Send Us a Message" submitLabel="Send Message" />
        </div>
      </section>
    </SiteLayout>
  )
}
