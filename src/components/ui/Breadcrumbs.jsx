import Link from 'next/link'

export function Breadcrumbs({items}) {
  if (!items?.length) return null
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i < items.length - 1 ? (
              <Link href={item.path} className="hover:text-brand-600 transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="text-slate-700 font-medium" aria-current="page">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
