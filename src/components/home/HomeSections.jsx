import Link from 'next/link'
import Image from 'next/image'
import {ServiceCard, CategoryCard, PostCard} from '@/components/ui/Cards'
import {CTASection} from '@/components/ui/CTASection'

function SectionHeader({title, viewAllHref}) {
  if (!title) return null
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
      {viewAllHref && (
        <Link href={viewAllHref} className="text-brand-600 font-medium hover:underline text-sm">
          View all →
        </Link>
      )}
    </div>
  )
}

function TopBanner({section}) {
  const hasImage = Boolean(section.image)

  return (
    <section
      className={`relative text-white overflow-hidden ${hasImage ? '' : 'bg-gradient-to-br from-brand-700 to-brand-900'}`}
    >
      {hasImage && (
        <>
          <Image src={section.image} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-brand-900/70" />
        </>
      )}
      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl">{section.heading}</h1>
        {section.text && <p className="text-xl text-brand-100 mb-8 max-w-2xl">{section.text}</p>}
        <div className="flex flex-wrap gap-4">
          {section.button1Text && section.button1Link && (
            <Link
              href={section.button1Link}
              className="bg-white text-brand-700 px-8 py-3 rounded-lg font-semibold hover:bg-brand-50 transition-colors"
            >
              {section.button1Text}
            </Link>
          )}
          {section.button2Text && section.button2Link && (
            <Link
              href={section.button2Link}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-600 transition-colors"
            >
              {section.button2Text}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export function HomeSections({sections, services, categories, posts, settings}) {
  return sections.map((section) => {
    const key = section._key || section._type

    if (section._type === 'homeTopBanner') {
      return <TopBanner key={key} section={section} />
    }

    if (section._type === 'homeServices') {
      return (
        <div key={key} className="max-w-7xl mx-auto px-4 py-12">
          <section className="mb-16">
            <SectionHeader title={section.heading} viewAllHref="/services" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 6).map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          </section>
        </div>
      )
    }

    if (section._type === 'homeCategories') {
      return (
        <div key={key} className="max-w-7xl mx-auto px-4">
          <section className="mb-16">
            <SectionHeader title={section.heading} viewAllHref="/categories" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.slice(0, 6).map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>
          </section>
        </div>
      )
    }

    if (section._type === 'homeBlog') {
      if (section.show === false) return null
      const items = (posts || []).slice(0, 3)
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
            buttonHref="/pages/contact"
            showPhone={section.showPhone}
          />
        </div>
      )
    }

    return null
  })
}
