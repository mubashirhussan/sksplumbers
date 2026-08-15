import Link from 'next/link'
import {CmsImage} from '@/components/ui/CmsImage'
import {Icon} from '@/components/ui/Icons'
import {CallButton, WhatsAppButton} from '@/components/ui/CallButton'
import {TrustBar} from '@/components/ui/TrustBar'
import {IMAGES} from '@/lib/images'
import {HERO_TRUST, HOME_SERVICE_CARDS, TRUST_ITEMS} from '@/lib/site-content'
import {whatsappHref} from '@/lib/contact'

function highlightText(text, phrases) {
  if (!text) return null
  const marks = (phrases || []).filter(Boolean).sort((a, b) => b.length - a.length)
  if (!marks.length) return text

  const pattern = new RegExp(`(${marks.map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
  const parts = text.split(pattern)
  return parts.map((part, index) =>
    marks.includes(part) ? (
      <span key={`${part}-${index}`} className="font-semibold text-gold">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

function toServiceCard(service) {
  const slug = service.slug?.current || service.slug
  const local = HOME_SERVICE_CARDS.find((card) => card.slug === slug)
  return {
    title: service.title || local?.title,
    slug,
    href: `/services/${slug}/`,
    icon: service.icon || local?.icon || 'plumbing',
    image: service.image || local?.image || IMAGES.plumbing,
    items: service.highlights?.length ? service.highlights : local?.items || [],
  }
}

function HeroSection({home, settings}) {
  const phone = settings?.phone
  const wa = whatsappHref(phone, settings?.whatsappMessage)
  const prefix = home?.heroHeadingPrefix || "Dubai's Trusted"
  const highlight = home?.heroHeadingHighlight || 'Handyman & Maintenance'
  const suffix = home?.heroHeadingSuffix || 'Experts'
  const heroText =
    home?.heroText || 'One Call for All Your Home, Office & Villa Maintenance Needs.'
  const textHighlights = home?.heroTextHighlights?.length ? home.heroTextHighlights : ['One Call', 'Office']
  const heroImage = home?.heroImage || IMAGES.hero
  const trust = home?.heroTrust?.length ? home.heroTrust : HERO_TRUST
  const card = home?.emergencyCard

  return (
    <section className="relative isolate overflow-hidden bg-white lg:min-h-[calc(100dvh-4.75rem)]">
      <div className="relative h-[240px] sm:h-[320px] md:h-[380px] lg:absolute lg:inset-0 lg:h-auto">
        <CmsImage
          src={heroImage}
          alt={home?.heroImageAlt || 'Handyman Maintenance technician in Dubai'}
          fill
          className="object-cover object-[72%_center] sm:object-[68%_center] lg:object-right"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent lg:hidden" />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-4 py-8 sm:py-10 lg:min-h-[calc(100dvh-4.75rem)] lg:py-12">
        <div className="w-full max-w-xl lg:max-w-[540px]">
          <h1 className="font-heading text-[26px] font-extrabold uppercase leading-[1.2] text-navy sm:text-4xl lg:text-[42px]">
            {prefix} <span className="text-gold">{highlight}</span> {suffix}
          </h1>
          <p className="mt-3 max-w-xl text-[15px] text-slate-600 sm:mt-4 sm:text-base md:text-lg">
            {highlightText(heroText, textHighlights)}
          </p>
          <div className="mt-5 flex w-full flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap">
            <WhatsAppButton
              href={wa}
              className="w-full justify-center sm:w-auto"
              label={settings?.whatsappButtonLabel}
              subtext={settings?.whatsappButtonSubtext}
            />
            <CallButton
              phone={phone}
              className="w-full justify-center sm:w-auto"
              label={settings?.callButtonLabel}
            />
          </div>
          <div className="mt-6 grid max-w-lg grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:mt-8 sm:gap-x-4 sm:gap-y-4">
            {trust.map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-navy sm:h-10 sm:w-10">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <span className="font-heading text-[13px] font-semibold leading-tight text-navy sm:text-sm">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
        {card?.enabled === false ? null : (
          <div className="absolute bottom-6 right-4 hidden max-w-[200px] rounded-md bg-navy px-4 py-3 text-white shadow-lg lg:block lg:right-8">
            <p className="font-heading text-xs font-extrabold uppercase leading-snug tracking-wide">
              {card?.title || 'Emergency Service'}
            </p>
            <p className="mt-1 text-[11px] text-white/80">{card?.subtitle || 'We deliver 7 days a week'}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 font-heading font-extrabold text-gold">
              <Icon name={card?.icon || 'clock'} className="h-4 w-4" />
              {card?.badge || '24/7'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function ServiceCard({card}) {
  return (
    <Link
      href={card.href}
      className="group flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white shadow-[0_6px_20px_rgba(10,29,55,0.06)] transition-shadow hover:shadow-[0_10px_28px_rgba(10,29,55,0.12)]"
    >
      <div className="relative">
        <div className="relative h-[148px] overflow-hidden rounded-t-2xl">
          <CmsImage src={card.image} alt={card.title} fill className="object-cover" sizes="(max-width: 1280px) 50vw, 16vw" />
        </div>
        <span className="absolute left-1/2 bottom-0 z-10 flex h-[56px] w-[56px] -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-navy text-white shadow-md ring-[5px] ring-white">
          <Icon name={card.icon} className="h-6 w-6" />
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center px-3 pb-6 pt-10 text-center">
        <h3 className="font-heading text-[13px] font-extrabold uppercase tracking-wide text-navy">
          {card.title}
        </h3>
        <ul className="mt-2 space-y-1 text-[12px] leading-5 text-slate-500">
          {card.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </Link>
  )
}

function OurServices({home}) {
  const section = home?.sections?.find((item) => item._type === 'homeServices')
  const cards = section?.selectedServices?.length
    ? section.selectedServices.map(toServiceCard)
    : HOME_SERVICE_CARDS
  const heading = section?.heading || 'Our Services'
  const viewAllLabel = section?.viewAllLabel || 'View All Services'
  const viewAllHref = section?.viewAllHref || '/services/'

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="mb-8 flex items-center justify-center gap-3 sm:mb-12 sm:gap-4">
          <span className="h-px w-8 bg-gold sm:w-14 md:w-20" />
          <h2 className="font-heading text-xl font-extrabold uppercase tracking-wide text-navy sm:text-2xl md:text-3xl">
            {heading}
          </h2>
          <span className="h-px w-8 bg-gold sm:w-14 md:w-20" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-6 xl:gap-5">
          {cards.map((card) => (
            <ServiceCard key={card.title} card={card} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 rounded-md bg-navy px-8 py-3 font-heading text-sm font-bold uppercase text-white hover:bg-navy-800"
          >
            {viewAllLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function HomeSections({settings, home}) {
  const trustItems = settings?.trustItems?.length ? settings.trustItems : TRUST_ITEMS
  return (
    <>
      <HeroSection settings={settings} home={home} />
      <OurServices home={home} />
      <TrustBar items={trustItems} />
    </>
  )
}
