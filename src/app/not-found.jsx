import Link from 'next/link'
import {SiteLayout} from '@/components/layout/SiteLayout'

export default function NotFound() {
  return (
    <SiteLayout>
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-6xl font-bold text-brand-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Page Not Found</h2>
        <p className="text-slate-600 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </SiteLayout>
  )
}
