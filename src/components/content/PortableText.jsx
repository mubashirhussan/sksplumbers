import {PortableText as PortableTextComponent} from '@portabletext/react'
import {urlFor} from '@/lib/sanity/image'

function SanityTable({value}) {
  const rows = value?.rows
  if (!rows?.length) return null

  const [header, ...bodyRows] = rows
  const headerCells = header?.cells || []

  return (
    <div className="prose-table-wrap">
      <table className="prose-table">
        {headerCells.length ? (
          <thead>
            <tr>
              {headerCells.map((cell, i) => (
                <th key={`${header._key || 'h'}-${i}`}>{cell}</th>
              ))}
            </tr>
          </thead>
        ) : null}
        {bodyRows.length ? (
          <tbody>
            {bodyRows.map((row, rowIndex) => (
              <tr key={row._key || `row-${rowIndex}`}>
                {(row.cells || []).map((cell, cellIndex) => (
                  <td key={`${row._key || rowIndex}-${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
    </div>
  )
}

function SanityImage({value}) {
  const src = value?.asset ? urlFor(value).width(1200).auto('format').url() : null
  if (!src) return null
  return (
    <figure className="my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={value?.alt || ''}
        className="h-auto w-full rounded-md object-cover"
      />
      {value?.alt ? (
        <figcaption className="mt-2 text-center text-sm text-slate-500">{value.alt}</figcaption>
      ) : null}
    </figure>
  )
}

const components = {
  types: {
    table: SanityTable,
    image: SanityImage,
  },
  block: {
    h2: ({children}) => (
      <h2 className="mb-4 mt-8 font-heading text-xl font-bold text-navy md:text-2xl">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="mb-3 mt-6 font-heading text-xl font-semibold text-navy">{children}</h3>
    ),
    normal: ({children}) => <p className="mb-4 leading-relaxed text-slate-600">{children}</p>,
  },
  list: {
    bullet: ({children}) => (
      <ul className="mb-4 list-disc space-y-2 pl-5 text-slate-600">{children}</ul>
    ),
    number: ({children}) => (
      <ol className="mb-4 list-decimal space-y-2 pl-5 text-slate-600">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({children}) => <li className="leading-relaxed">{children}</li>,
    number: ({children}) => <li className="leading-relaxed">{children}</li>,
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
