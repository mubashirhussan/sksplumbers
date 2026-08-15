import {PortableText as PortableTextComponent} from '@portabletext/react'
import Image from 'next/image'
import {urlFor} from '@/lib/sanity/image'

const components = {
  types: {
    image: ({value}) => {
      const src = value?.asset ? urlFor(value)?.width(1200).url() : null
      if (!src) return null
      return (
        <div className="relative my-6 aspect-[16/9] overflow-hidden">
          <Image src={src} alt={value.alt || ''} fill className="object-cover" sizes="100vw" />
        </div>
      )
    },
  },
  block: {
    h2: ({children}) => (
      <h2 className="mb-4 mt-8 font-heading text-xl font-bold text-navy md:text-2xl">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="font-heading text-xl font-semibold text-navy mt-6 mb-3">{children}</h3>
    ),
    normal: ({children}) => <p className="text-slate-600 leading-relaxed mb-4">{children}</p>,
  },
  marks: {
    link: ({value, children}) => (
      <a
        href={value?.href}
        className="text-gold underline hover:text-gold-600"
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
}

export function PortableText({value}) {
  if (!value?.length) return null
  return (
    <div className="prose-content">
      <PortableTextComponent value={value} components={components} />
    </div>
  )
}
