import Link from 'next/link'
import Image from 'next/image'
import {ServiceCard, CategoryCard, PostCard} from '@/components/ui/Cards'
import {CTASection} from '@/components/ui/CTASection'
import {ButtonLink} from '@/components/ui/ButtonLink'

function SectionHeader({title, viewAllHref}) {
  if (!title) return null
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 md:mb-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
      {viewAllHref && (
        <Link href={viewAllHref} className="text-brand-600 font-medium hover:underline text-sm">
          View all →
        </Link>
      )}
    </div>
  )
}

function HeroSection({hero}) {
  const hasImage = Boolean(hero.heroImage)

  return (
    <section
      className={`relative text-white overflow-hidden ${hasImage ? '' : 'bg-gradient-to-br from-brand-700 to-brand-900'}`}
    >
      {hasImage && (
        <>
          <Image src={hero.heroImage} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-brand-900/70" />
        </>
      )}
      <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 max-w-3xl">
          {hero.heroHeading}
        </h1>
        {hero.heroText && (
          <p className="text-base sm:text-lg md:text-xl text-brand-100 mb-6 md:mb-8 max-w-2xl">
            {hero.heroText}
          </p>
        )}
        <div className="flex flex-wrap gap-4">
          {(hero.heroButtons || []).map((button, i) => (
            <ButtonLink key={button._key || `${button.label}-${i}`} button={button} variant="hero" />
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomeSections({home, services, categories, posts, settings}) {
  const pickItems = (selected, fallback, limit) => {
    const chosen = (selected || []).filter(Boolean)
    if (chosen.length) return chosen
    return (fallback || []).slice(0, limit)
  }

  return (
    <>
      <HeroSection hero={home} />

      {(home.sections || []).map((section) => {
        const key = section._key || section._type

        if (section._type === 'homeServices') {
          const items = pickItems(section.selectedServices, services, 6)
          if (!items.length) return null

          return (
            <div key={key} className="max-w-7xl mx-auto px-4 py-12">
              <section className="mb-16">
                <SectionHeader title={section.heading} viewAllHref="/services" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((service) => (
                    <ServiceCard key={service._id} service={service} />
                  ))}
                </div>
              </section>
            </div>
          )
        }

        if (section._type === 'homeCategories') {
          const items = pickItems(section.selectedCategories, categories, 6)
          if (!items.length) return null

          return (
            <div key={key} className="max-w-7xl mx-auto px-4">
              <section className="mb-16">
                <SectionHeader title={section.heading} viewAllHref="/categories" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((category) => (
                    <CategoryCard key={category._id} category={category} />
                  ))}
                </div>
              </section>
            </div>
          )
        }

        if (section._type === 'homeBlog') {
          if (section.show === false) return null
          const items = pickItems(section.selectedPosts, posts, 3)
          if (!items.length) return null

          return (
            <div key={key} className="max-w-7xl mx-auto px-4">
              <section className="mb-16">
                <SectionHeader title={section.heading} viewAllHref="/blog" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {items.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              </section>
            </div>
          )
        }

        if (section._type === 'homeContactBanner') {
          return (
            <div key={key} className="max-w-7xl mx-auto px-4 pb-12">
              <CTASection
                settings={settings}
                title={section.heading}
                description={section.description}
                buttonLabel={section.buttonText}
                buttonHref="/contact"
                showPhone={section.showPhone}
              />
            </div>
          )
        }

        return null
      })}
    </>
  )
}
