import {NavLink} from '@/components/ui/NavLink'

function formatCopyright(text) {
  if (!text) return null
  return text.replace('{year}', new Date().getFullYear().toString())
}

export function Footer({settings, footer}) {
  const columns = footer?.columns || []

  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-white text-lg font-bold mb-4">
            {footer?.brandTitle || settings?.siteName || 'SKS Plumbers Dubai'}
          </h2>
          <p className="text-sm leading-relaxed mb-4">
            {footer?.description || settings?.tagline || 'Professional plumbing services in Dubai.'}
          </p>
          {settings?.phone && (
            <a
              href={`tel:${settings.phone.replace(/\s/g, '')}`}
              className="text-brand-400 font-semibold hover:underline block mb-2"
            >
              {settings.phone}
            </a>
          )}
          {settings?.email && (
            <a href={`mailto:${settings.email}`} className="text-sm hover:text-white transition-colors block mb-2">
              {settings.email}
            </a>
          )}
          {settings?.address && <p className="text-sm">{settings.address}</p>}
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-white font-semibold mb-4">{column.title}</h3>
            <ul className="space-y-2 text-sm">
              {(column.links || []).map((link) => (
                <li key={`${column.title}-${link.href}-${link.label}`}>
                  <NavLink link={link} className="hover:text-white transition-colors" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-slate-500 flex flex-wrap justify-between gap-2">
          <span>{formatCopyright(footer?.copyrightText) || `© ${new Date().getFullYear()} SKS Plumbers`}</span>
          {footer?.bottomNote && <span>{footer.bottomNote}</span>}
        </div>
      </div>
    </footer>
  )
}
