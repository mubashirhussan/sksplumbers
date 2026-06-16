import {PortableText as PortableTextComponent} from '@portabletext/react'

const components = {
  block: {
    h2: ({children}) => (
      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">{children}</h3>
    ),
    normal: ({children}) => <p className="text-slate-600 leading-relaxed mb-4">{children}</p>,
  },
  marks: {
    link: ({value, children}) => (
      <a
        href={value?.href}
        className="text-brand-600 underline hover:text-brand-700"
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
