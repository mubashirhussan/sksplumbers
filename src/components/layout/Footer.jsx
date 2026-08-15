import {NavLink} from '@/components/ui/NavLink'
import {Logo} from '@/components/brand/Logo'
import {Icon} from '@/components/ui/Icons'
import {telHref} from '@/lib/contact'

function formatCopyright(text) {
  if (!text) return null
  return text.replace('{year}', new Date().getFullYear().toString())
}

export function Footer({settings, footer, header}) {
  const columns = footer?.columns || []
  const phone = settings?.phone
  const tel = telHref(phone)

  return (
    <footer className="mt-auto bg-navy text-slate-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 md:grid-cols-2 md:py-14 lg:grid-cols-4">
        <div>
          <div className="mb-4 inline-block rounded-md bg-white p-2">
            <Logo header={header} settings={settings} />
          </div>
          {footer?.description || settings?.tagline ? (
            <p className="mb-4 text-sm leading-relaxed text-white/70">
              {footer?.description || settings?.tagline}
            </p>
          ) : null}
          {phone ? (
            <a href={tel} className="mb-2 block font-heading font-bold break-all text-gold hover:underline">
              {phone}
            </a>
          ) : null}
          {settings?.email ? (
            <a href={`mailto:${settings.email}`} className="mb-2 block break-all text-sm transition-colors hover:text-white">
              {settings.email}
            </a>
          ) : null}
          {settings?.address ? (
            <p className="text-sm inline-flex items-start gap-2">
              <Icon name="pin" className="w-4 h-4 text-gold mt-0.5 shrink-0" />
              {settings.address}
            </p>
          ) : null}
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            {column.title ? (
              <h3 className="text-white font-heading font-bold uppercase mb-4">{column.title}</h3>
            ) : null}
            <ul className="space-y-2 text-sm">
              {(column.links || []).map((link) => (
                <li key={`${column.title}-${link.href}-${link.label}`}>
                  <NavLink link={link} className="hover:text-gold transition-colors" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {(footer?.copyrightText || footer?.bottomNote) ? (
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-4 py-4 text-sm text-white/50">
            <span>{formatCopyright(footer?.copyrightText)}</span>
            {footer?.bottomNote ? <span>{footer.bottomNote}</span> : null}
          </div>
        </div>
      ) : null}
    </footer>
  )
}
