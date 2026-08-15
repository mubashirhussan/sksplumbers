import Link from 'next/link'
import Image from 'next/image'
import {Icon} from '@/components/ui/Icons'
import {ButtonLink} from '@/components/ui/ButtonLink'
import {TrustBar} from '@/components/ui/TrustBar'
import {CTASection} from '@/components/ui/CTASection'
import {ServiceCard, CategoryCard, PostCard} from '@/components/ui/Cards'

function CmsImage({src, alt, className, sizes, priority}) {
  if (!src) return <div className={`bg-slate-100 ${className || ''}`} />
  return (
    <Image src={src} alt={alt || ''} fill className={className || 'object-cover'} sizes={sizes} priority={priority} />
  )
}

function HeroSection({home, settings}) {
  const buttons = home?.heroButtons || []
  const trust = home?.heroTrust || []
  const card = home?.emergencyCard

  return (
    <section className="relative isolate overflow-hidden bg-white lg:min-h-[calc(100dvh-4.75rem)]">
      {home?.heroImage ? (
        <div className="relative h-[240px] sm:h-[320px] md:h-[380px] lg:absolute lg:inset-0 lg:h-auto">
          <CmsImage
            src={home.heroImage}
            alt={home.heroImageAlt || home.heroHeading}
            className="object-cover object-[72%_center] sm:object-[68%_center] lg:object-right"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent lg:hidden" />
        </div>
      ) : null}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-4 py-8 sm:py-10 lg:min-h-[calc(100dvh-4.75rem)] lg:py-12">
        <div className="w-full max-w-xl lg:max-w-[540px]">
          {home?.heroHeading ? (
            <h1 className="font-heading text-[26px] font-extrabold uppercase leading-[1.2] text-navy sm:text-4xl lg:text-[42px]">
              {home.heroHeading}
            </h1>
          ) : null}
          {home?.heroText ? (
            <p className="mt-3 max-w-xl text-[15px] text-slate-600 sm:mt-4 sm:text-base md:text-lg">{home.heroText}</p>
          ) : null}
          {buttons.length ? (
            <div className="mt-5 flex w-full flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap">
              {buttons.map((button) => (
                <ButtonLink key={button._key || button.label} button={button} settings={settings} />
              ))}
            </div>
          ) : null}
          {trust.length ? (
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
          ) : null}
        </div>
        {card?.enabled !== false && (card?.title || card?.subtitle || card?.badge) ? (
          <div className="absolute bottom-6 right-4 hidden max-w-[200px] rounded-md bg-navy px-4 py-3 text-white shadow-lg lg:block lg:right-8">
            {card.title ? (
              <p className="font-heading text-xs font-extrabold uppercase leading-snug tracking-wide">{card.title}</p>
            ) : null}
            {card.subtitle ? <p className="mt-1 text-[11px] text-white/80">{card.subtitle}</p> : null}
            {card.badge ? (
              <p className="mt-2 inline-flex items-center gap-1.5 font-heading font-extrabold text-gold">
                <Icon name={card.icon || 'clock'} className="h-4 w-4" />
                {card.badge}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}

function HomeServiceCard({service}) {
  const href = service?.slug?.current ? `/services/${service.slug.current}/` : null
  if (!href) return null
  const items = service.highlights || []

  return (
    <Link
      href={href}
      className="group flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white shadow-[0_6px_20px_rgba(10,29,55,0.06)] transition-shadow hover:shadow-[0_10px_28px_rgba(10,29,55,0.12)]"
    >
      <div className="relative">
        <div className="relative h-[148px] overflow-hidden rounded-t-2xl bg-slate-100">
          <CmsImage src={service.image} alt={service.imageAlt || service.title} sizes="(max-width: 1280px) 50vw, 16vw" />
        </div>
        {service.icon ? (
          <span className="absolute left-1/2 bottom-0 z-10 flex h-[56px] w-[56px] -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-navy text-white shadow-md ring-[5px] ring-white">
            <Icon name={service.icon} className="h-6 w-6" />
          </span>
        ) : null}
      </div>
      <div className={`flex flex-1 flex-col items-center px-3 pb-6 text-center ${service.icon ? 'pt-10' : 'pt-5'}`}>
        <h3 className="font-heading text-[13px] font-extrabold uppercase tracking-wide text-navy">{service.title}</h3>
        {items.length ? (
          <ul className="mt-2 space-y-1 text-[12px] leading-5 text-slate-500">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : service.excerpt ? (
          <p className="mt-2 text-[12px] leading-5 text-slate-500">{service.excerpt}</p>
        ) : null}
      </div>
    </Link>
  )
}

function SectionHeading({heading}) {
  if (!heading) return null
  return (
    <div className="mb-8 flex items-center justify-center gap-3 sm:mb-12 sm:gap-4">
      <span className="h-px w-8 bg-gold sm:w-14 md:w-20" />
      <h2 className="font-heading text-xl font-extrabold uppercase tracking-wide text-navy sm:text-2xl md:text-3xl">
        {heading}
      </h2>
      <span className="h-px w-8 bg-gold sm:w-14 md:w-20" />
    </div>
  )
}

function HomeSection({section, settings}) {
  if (section._type === 'homeServices') {
    const cards = section.selectedServices || []
    if (!cards.length && !section.heading) return null
    return (
      <section className="bg-white py-10 md:py-16">
        <div className="mx-auto max-w-[1400px] px-4">
          <SectionHeading heading={section.heading} />
          {cards.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-6 xl:gap-5">
              {cards.map((service) => (
                <HomeServiceCard key={service._id} service={service} />
              ))}
            </div>
          ) : null}
          {section.viewAllLabel && section.viewAllHref ? (
            <div className="mt-12 text-center">
              <Link
                href={section.viewAllHref}
                className="inline-flex items-center gap-2 rounded-md bg-navy px-8 py-3 font-heading text-sm font-bold uppercase text-white hover:bg-navy-800"
              >
                {section.viewAllLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    )
  }

  if (section._type === 'homeTrust') {
    return <TrustBar items={settings?.trustItems} />
  }

  if (section._type === 'homeCategories') {
    const items = section.selectedCategories || []
    if (!items.length && !section.heading) return null
    return (
      <section className="bg-slate-50 py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading heading={section.heading} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((category) => (
              <CategoryCard key={category._id} category={category} settings={settings} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (section._type === 'homeBlog') {
    if (section.show === false) return null
    const posts = section.selectedPosts || []
    if (!posts.length && !section.heading) return null
    return (
      <section className="bg-white py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading heading={section.heading} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} settings={settings} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (section._type === 'homeContactBanner') {
    return (
      <div className="mx-auto max-w-7xl px-4">
        <CTASection
          settings={settings}
          title={section.heading}
          description={section.description}
          buttonLabel={section.buttonText}
          buttonHref={section.buttonHref}
          showPhone={section.showPhone}
        />
      </div>
    )
  }

  return null
}

export function HomeSections({home, settings}) {
  if (!home) return null
  const sections = home.sections || []

  return (
    <>
      <HeroSection home={home} settings={settings} />
      {sections.map((section) => (
        <HomeSection key={section._key || section._type} section={section} settings={settings} />
      ))}
    </>
  )
}
