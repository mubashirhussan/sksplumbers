import {SiteLayout} from '@/components/layout/SiteLayout'
import {PostCard} from '@/components/ui/Cards'
import {PageBanner} from '@/components/ui/PageBanner'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {getPosts, getPageBySlug, getSiteSettings} from '@/lib/sanity/queries'
import {label} from '@/lib/contact'

export async function generateMetadata() {
  const [page, settings] = await Promise.all([getPageBySlug('blog'), getSiteSettings()])
  return buildSeoFromDoc(page, '/blog', settings)
}

export default async function BlogPage() {
  const [posts, page, settings] = await Promise.all([
    getPosts(),
    getPageBySlug('blog'),
    getSiteSettings(),
  ])
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: page?.title || 'Blog', path: '/blog'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs, settings)} />
      <PageBanner title={page?.title} subtitle={page?.bannerSubtitle || page?.excerpt} />
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        {posts?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} settings={settings} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center">{label(settings, 'noPosts')}</p>
        )}
      </section>
    </SiteLayout>
  )
}
