import Link from 'next/link'
import {SiteLayout} from '@/components/layout/SiteLayout'
import {getSiteSettings} from '@/lib/sanity/queries'
import {label} from '@/lib/contact'

export default async function NotFound() {
  const settings = await getSiteSettings().catch(() => null)
  const title = label(settings, 'pageNotFoundTitle')
  const text = label(settings, 'pageNotFoundText')
  const back = label(settings, 'backToHome')

  return (
    <SiteLayout>
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="font-heading text-6xl font-extrabold text-gold mb-4">404</h1>
        {title ? <h2 className="font-heading text-2xl font-bold uppercase text-navy mb-4">{title}</h2> : null}
        {text ? <p className="text-slate-600 mb-8">{text}</p> : null}
        {back ? (
          <Link
            href="/"
            className="inline-block bg-gold text-navy px-6 py-3 font-heading font-extrabold uppercase hover:bg-gold-600 transition-colors"
          >
            {back}
          </Link>
        ) : null}
      </div>
    </SiteLayout>
  )
}
