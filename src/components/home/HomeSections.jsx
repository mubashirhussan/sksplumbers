import Link from 'next/link'
import {CmsImage} from '@/components/ui/CmsImage'
import {Icon, CheckBullet} from '@/components/ui/Icons'
import {CallButton, WhatsAppButton} from '@/components/ui/CallButton'
import {TrustBar} from '@/components/ui/TrustBar'
import {CTASection} from '@/components/ui/CTASection'
import {QuoteForm} from '@/components/ui/QuoteForm'
import {IMAGES} from '@/lib/images'
import {
  HERO_TRUST,
  HOME_FAQS,
  HOME_SERVICE_CARDS,
  SERVICE_AREAS,
  TRUST_ITEMS,
  WHY_CHOOSE_POINTS,
} from '@/lib/site-content'
import {telHref, whatsappHref} from '@/lib/contact'

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

function SectionHeading({children}) {
  return (
    <div className="mb-8 flex items-center justify-center gap-3 sm:mb-12 sm:gap-4">
      <span className="h-px w-8 bg-gold sm:w-14 md:w-20" />
      <h2 className="font-heading text-xl font-extrabold uppercase tracking-wide text-navy sm:text-2xl md:text-3xl">
        {children}
      </h2>
      <span className="h-px w-8 bg-gold sm:w-14 md:w-20" />
    </div>
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
    excerpt: service.excerpt || local?.excerpt || '',
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

function ServiceCard({card, buttonLabel}) {
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_6px_20px_rgba(10,29,55,0.06)] transition-shadow hover:shadow-[0_10px_28px_rgba(10,29,55,0.12)]">
      <div className="relative h-[180px] overflow-hidden sm:h-[200px]">
        <CmsImage
          src={card.image}
          alt={card.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col items-center px-5 pb-6 pt-5 text-center sm:px-6">
        <h3 className="font-heading text-base font-extrabold uppercase tracking-wide text-navy sm:text-lg">
          {card.title}
        </h3>
        {card.excerpt ? (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-4">{card.excerpt}</p>
        ) : null}
        <Link
          href={card.href}
          className="mt-5 inline-flex items-center justify-center rounded-md bg-navy px-6 py-2.5 font-heading text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-navy-800"
        >
          {buttonLabel}
        </Link>
      </div>
    </article>
  )
}

function OurServices({section}) {
  const cards = section?.selectedServices?.length
    ? section.selectedServices.map(toServiceCard)
    : HOME_SERVICE_CARDS.map(toServiceCard)
  const heading = section?.heading || 'Our Services'
  const buttonLabel = section?.cardButtonLabel || 'Learn More'
  const viewAllLabel = section?.viewAllLabel || 'View All Services'
  const viewAllHref = section?.viewAllHref || '/services/'

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading>{heading}</SectionHeading>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => (
            <ServiceCard key={card.slug || card.title} card={card} buttonLabel={buttonLabel} />
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

function FeatureSection({section}) {
  const theme = section?.theme || 'light'
  const imageRight = (section?.imagePosition || 'right') !== 'left'
  const items = section?.items || []
  const image = section?.image || IMAGES.about

  const shell =
    theme === 'dark'
      ? 'bg-navy text-white'
      : theme === 'gold'
        ? 'bg-gold text-navy'
        : 'bg-white text-navy'

  const muted =
    theme === 'dark' ? 'text-white/75' : theme === 'gold' ? 'text-navy/80' : 'text-slate-600'

  const iconWrap =
    theme === 'dark'
      ? 'bg-gold text-navy'
      : theme === 'gold'
        ? 'bg-navy text-gold'
        : 'bg-navy text-gold'

  const titleClass =
    theme === 'dark'
      ? 'text-white'
      : 'text-navy'

  const buttonClass =
    theme === 'dark'
      ? 'bg-gold text-navy hover:bg-gold-600'
      : theme === 'gold'
        ? 'bg-navy text-white hover:bg-navy-800'
        : 'bg-navy text-white hover:bg-navy-800'

  const textBlock = (
    <div className={imageRight ? '' : 'lg:order-2'}>
      {section?.eyebrow ? (
        <p
          className={`mb-2 font-heading text-sm font-bold uppercase tracking-[0.2em] ${
            theme === 'dark' ? 'text-gold' : theme === 'gold' ? 'text-navy/70' : 'text-gold'
          }`}
        >
          {section.eyebrow}
        </p>
      ) : null}
      <h2 className={`font-heading text-2xl font-extrabold uppercase leading-tight md:text-3xl ${titleClass}`}>
        {section?.heading}
      </h2>
      {section?.description ? <p className={`mt-4 max-w-xl leading-relaxed ${muted}`}>{section.description}</p> : null}
      {items.length > 0 ? (
        <ul className="mt-8 space-y-5">
          {items.map((item) => (
            <li key={item.title} className="flex gap-4">
              <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconWrap}`}>
                <Icon name={item.icon || 'check'} className="h-5 w-5" />
              </span>
              <div>
                <h3 className={`font-heading text-sm font-bold uppercase tracking-wide ${titleClass}`}>
                  {item.title}
                </h3>
                {item.text ? <p className={`mt-1 text-sm leading-relaxed ${muted}`}>{item.text}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
      {section?.buttonText ? (
        <Link
          href={section.buttonHref || '/contact/'}
          className={`mt-8 inline-flex items-center justify-center rounded-md px-7 py-3 font-heading text-sm font-bold uppercase tracking-wide transition-colors ${buttonClass}`}
        >
          {section.buttonText}
        </Link>
      ) : null}
    </div>
  )

  const imageBlock = (
    <div className={`relative min-h-[260px] overflow-hidden rounded-2xl sm:min-h-[360px] ${imageRight ? '' : 'lg:order-1'}`}>
      <CmsImage
        src={image}
        alt={section?.imageAlt || section?.heading || 'Handyman Maintenance'}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  )

  return (
    <section className={`${shell} py-10 md:py-16`}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2 lg:gap-14">
        {textBlock}
        {imageBlock}
      </div>
    </section>
  )
}

function MissionSection({section}) {
  const dark = section?.theme === 'dark'
  return (
    <section className={`${dark ? 'bg-navy text-white' : 'bg-gold text-navy'} py-14 md:py-20`}>
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="font-heading text-2xl font-extrabold uppercase leading-tight md:text-4xl">
          {section?.heading}
        </h2>
        {section?.description ? (
          <p className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg ${dark ? 'text-white/80' : 'text-navy/85'}`}>
            {section.description}
          </p>
        ) : null}
        {section?.buttonText ? (
          <Link
            href={section.buttonHref || '/contact/'}
            className={`mt-8 inline-flex items-center justify-center rounded-md px-8 py-3 font-heading text-sm font-bold uppercase tracking-wide transition-colors ${
              dark
                ? 'bg-gold text-navy hover:bg-gold-600'
                : 'bg-navy text-white hover:bg-navy-800'
            }`}
          >
            {section.buttonText}
          </Link>
        ) : null}
      </div>
    </section>
  )
}

function ServiceAreasSection({section, settings}) {
  const heading = section?.heading || settings?.serviceAreasHeading || 'Areas We Serve'
  const areas =
    section?.useSiteAreas === false && section?.areas?.length
      ? section.areas
      : settings?.serviceAreas?.length
        ? settings.serviceAreas
        : SERVICE_AREAS
  const image = section?.image || IMAGES.skyline

  return (
    <section className="bg-slate-50 py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="rounded-2xl bg-navy p-6 text-white sm:p-8 md:p-10">
            <h2 className="font-heading text-2xl font-extrabold uppercase md:text-3xl">{heading}</h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {areas.map((area) => (
                <li key={area} className="flex items-start gap-2.5 text-sm text-white/90 sm:text-base">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-gold">
                    <Icon name="pin" className="h-4 w-4" />
                  </span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
            {section?.buttonText ? (
              <Link
                href={section.buttonHref || '/service-areas/'}
                className="mt-8 inline-flex items-center justify-center rounded-md bg-gold px-7 py-3 font-heading text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:bg-gold-600"
              >
                {section.buttonText}
              </Link>
            ) : null}
          </div>
          <div className="relative min-h-[240px] overflow-hidden rounded-2xl sm:min-h-[360px]">
            <CmsImage
              src={image}
              alt={section?.imageAlt || heading}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection({section, settings}) {
  const phone = settings?.phone
  const tel = telHref(phone)
  const wa = whatsappHref(phone, settings?.whatsappMessage)
  const showForm = section?.showForm !== false
  const showDetails = section?.showDetails !== false

  const details = [
    settings?.email && {
      icon: 'mail',
      label: settings?.labels?.emailLabel || 'Email Address',
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
    phone && {
      icon: 'phone',
      label: settings?.labels?.phoneLabel || 'Phone Number',
      value: phone,
      href: tel,
    },
    settings?.address && {
      icon: 'pin',
      label: settings?.labels?.addressLabel || 'Address',
      value: settings.address,
    },
    {
      icon: 'clock',
      label: settings?.labels?.hoursLabel || 'Business Hours',
      value: settings?.workingHours || '24/7 Emergency Service',
    },
    {
      icon: 'emergency',
      label: 'Emergency Services',
      value: 'Available 24/7',
    },
  ].filter(Boolean)

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        {section?.description ? (
          <p className="mx-auto mb-8 max-w-2xl text-center text-slate-600">{section.description}</p>
        ) : null}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {showForm ? (
            <QuoteForm
              title={section?.heading || 'Contact Us Today'}
              settings={settings}
              variant="dark"
            />
          ) : null}
          {showDetails ? (
            <div className={`flex flex-col justify-center ${showForm ? '' : 'lg:col-span-2'}`}>
              <ul className="space-y-6">
                {details.map((item) => (
                  <li key={item.label} className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-navy">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-navy">
                        {item.label}
                      </h3>
                      {item.href ? (
                        <a href={item.href} className="mt-1 block text-slate-600 hover:text-gold">
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-slate-600">{item.value}</p>
                      )}
                      {item.icon === 'phone' && wa ? (
                        <a
                          href={wa}
                          className="mt-1 block text-sm text-gold"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {settings?.labels?.whatsappLinkLabel || 'WhatsApp Now'}
                        </a>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function WhyChooseSection({section, settings}) {
  const heading = section?.heading || settings?.whyChooseHeading || 'Why Handyman Maintenance'
  const points =
    section?.useSitePoints === false && section?.points?.length
      ? section.points
      : settings?.whyChoosePoints?.length
        ? settings.whyChoosePoints
        : WHY_CHOOSE_POINTS
  const image = section?.image || IMAGES.about

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            {section?.eyebrow ? (
              <p className="mb-2 font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold">
                {section.eyebrow}
              </p>
            ) : null}
            <h2 className="font-heading text-2xl font-extrabold uppercase text-navy md:text-3xl">
              {heading}
            </h2>
            <div className="mt-4 h-1 w-16 bg-gold" />
            {section?.description ? (
              <p className="mt-5 max-w-xl leading-relaxed text-slate-600">{section.description}</p>
            ) : null}
            <ul className="mt-8 space-y-3 text-navy">
              {points.map((item) => (
                <CheckBullet key={item}>{item}</CheckBullet>
              ))}
            </ul>
            {section?.buttonText ? (
              <Link
                href={section.buttonHref || '/why-choose-us/'}
                className="mt-8 inline-flex items-center justify-center rounded-md bg-navy px-7 py-3 font-heading text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-navy-800"
              >
                {section.buttonText}
              </Link>
            ) : null}
          </div>
          <div className="relative min-h-[260px] overflow-hidden rounded-2xl sm:min-h-[380px]">
            <CmsImage
              src={image}
              alt={section?.imageAlt || heading}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function FaqSection({section, settings}) {
  const heading = section?.heading || settings?.labels?.faqHeading || 'Frequently Asked Questions'
  const faqs = section?.faqs?.length ? section.faqs : HOME_FAQS

  return (
    <section className="bg-slate-50 py-10 md:py-16">
      <div className="mx-auto max-w-3xl px-4">
        {section?.eyebrow ? (
          <p className="mb-2 text-center font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold">
            {section.eyebrow}
          </p>
        ) : null}
        <h2 className="text-center font-heading text-2xl font-extrabold uppercase text-navy md:text-3xl">
          {heading}
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 bg-gold" />
        {section?.description ? (
          <p className="mx-auto mt-5 max-w-2xl text-center text-slate-600">{section.description}</p>
        ) : null}
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-slate-200 bg-white p-4 open:shadow-sm sm:p-5"
            >
              <summary className="cursor-pointer list-none font-heading font-semibold text-navy [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-navy transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactBannerSection({section, settings}) {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <CTASection
        settings={settings}
        title={section?.heading}
        description={section?.description}
        buttonLabel={section?.buttonText}
        buttonHref={section?.buttonHref || '/contact/'}
        showPhone={section?.showPhone !== false}
      />
    </div>
  )
}

export function HomeSections({settings, home}) {
  const trustItems = settings?.trustItems?.length ? settings.trustItems : TRUST_ITEMS
  const sections = home?.sections?.length ? home.sections : []

  return (
    <>
      <HeroSection settings={settings} home={home} />
      {sections.map((section) => {
        switch (section._type) {
          case 'homeServices':
            return <OurServices key={section._key} section={section} />
          case 'homeFeature':
            return <FeatureSection key={section._key} section={section} />
          case 'homeMission':
            return <MissionSection key={section._key} section={section} />
          case 'homeWhyChoose':
            return <WhyChooseSection key={section._key} section={section} settings={settings} />
          case 'homeFaq':
            return <FaqSection key={section._key} section={section} settings={settings} />
          case 'homeTrust':
            return <TrustBar key={section._key} items={trustItems} />
          case 'homeServiceAreas':
            return <ServiceAreasSection key={section._key} section={section} settings={settings} />
          case 'homeContact':
            return <ContactSection key={section._key} section={section} settings={settings} />
          case 'homeContactBanner':
            return <ContactBannerSection key={section._key} section={section} settings={settings} />
          default:
            return null
        }
      })}
    </>
  )
}
