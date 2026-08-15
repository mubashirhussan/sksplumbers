import Link from 'next/link'
import {SiteLayout} from '@/components/layout/SiteLayout'

export default function NotFound() {
  return (
    <SiteLayout>
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="font-heading text-6xl font-extrabold text-gold mb-4">404</h1>
        <h2 className="font-heading text-2xl font-bold uppercase text-navy mb-4">Page Not Found</h2>
        <p className="text-slate-600 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-gold text-navy px-6 py-3 font-heading font-extrabold uppercase hover:bg-gold-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </SiteLayout>
  )
}
