import {notFound} from 'next/navigation'
import {SiteLayout} from '@/components/layout/SiteLayout'
import {PageBanner} from '@/components/ui/PageBanner'
import {QuoteForm} from '@/components/ui/QuoteForm'
import {Icon} from '@/components/ui/Icons'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {breadcrumbSchema, localBusinessSchema} from '@/lib/seo/jsonld'
import {getPageBySlug, getSiteSettings, getServices} from '@/lib/sanity/queries'
import {telHref, whatsappHref, whatsappNumber, label} from '@/lib/contact'

export async function generateMetadata() {
  const [page, settings] = await Promise.all([getPageBySlug('contact'), getSiteSettings()])
  return buildSeoFromDoc(page, '/contact', settings)
}

export default async function ContactPage() {
  const [page, settings, services] = await Promise.all([
    getPageBySlug('contact'),
    getSiteSettings(),
    getServices(),
  ])
  if (!page) notFound()

  const phone = settings?.phone
  const tel = telHref(phone)
  const wa = whatsappHref(whatsappNumber(settings), settings?.whatsappMessage)
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: page.title, path: '/contact'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={[breadcrumbSchema(breadcrumbs, settings), localBusinessSchema(settings)]} />
      <PageBanner title={page.title} subtitle={page.bannerSubtitle || page.excerpt} />
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            {page.eyebrow || label(settings, 'getInTouch') ? (
              <p className="text-gold font-heading font-bold uppercase tracking-[0.2em] text-sm mb-2">
                {page.eyebrow || label(settings, 'getInTouch')}
              </p>
            ) : null}
            <h2 className="mb-4 font-heading text-2xl font-extrabold uppercase text-navy md:text-3xl">{page.title}</h2>
            {page.excerpt ? <p className="text-slate-600 mb-8 leading-relaxed">{page.excerpt}</p> : null}
            <div className="space-y-6">
              {settings?.address ? (
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-gold">
                    <Icon name="pin" className="w-5 h-5" />
                  </div>
                  <div>
                    {label(settings, 'addressLabel') ? (
                      <h3 className="font-heading font-bold uppercase text-navy">{label(settings, 'addressLabel')}</h3>
                    ) : null}
                    <p className="text-slate-600">{settings.address}</p>
                  </div>
                </div>
              ) : null}
              {phone ? (
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-gold">
                    <Icon name="phone" className="w-5 h-5" />
                  </div>
                  <div>
                    {label(settings, 'phoneLabel') ? (
                      <h3 className="font-heading font-bold uppercase text-navy">{label(settings, 'phoneLabel')}</h3>
                    ) : null}
                    {tel ? (
                      <a href={tel} className="text-slate-600 hover:text-gold">
                        {phone}
                      </a>
                    ) : (
                      <p className="text-slate-600">{phone}</p>
                    )}
                    {wa && label(settings, 'whatsappLinkLabel') ? (
                      <a href={wa} className="block text-sm text-gold mt-1" target="_blank" rel="noopener noreferrer">
                        {label(settings, 'whatsappLinkLabel')}
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
              {settings?.email ? (
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-gold">
                    <Icon name="mail" className="w-5 h-5" />
                  </div>
                  <div>
                    {label(settings, 'emailLabel') ? (
                      <h3 className="font-heading font-bold uppercase text-navy">{label(settings, 'emailLabel')}</h3>
                    ) : null}
                    <a href={`mailto:${settings.email}`} className="text-slate-600 hover:text-gold">
                      {settings.email}
                    </a>
                  </div>
                </div>
              ) : null}
              {settings?.workingHours ? (
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-gold">
                    <Icon name="clock" className="w-5 h-5" />
                  </div>
                  <div>
                    {label(settings, 'hoursLabel') ? (
                      <h3 className="font-heading font-bold uppercase text-navy">{label(settings, 'hoursLabel')}</h3>
                    ) : null}
                    <p className="text-slate-600">{settings.workingHours}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <QuoteForm
            settings={settings}
            services={services}
            title={page.quoteFormTitle}
            submitLabel={page.quoteFormSubmitLabel}
          />
        </div>
      </section>
    </SiteLayout>
  )
}
