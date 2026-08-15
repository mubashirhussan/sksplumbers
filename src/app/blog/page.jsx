import {SiteLayout} from '@/components/layout/SiteLayout'
import {PostCard} from '@/components/ui/Cards'
import {PageBanner} from '@/components/ui/PageBanner'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildMetadata, buildSeoFromDoc} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {getPageBySlug, getPosts, getSiteSettings} from '@/lib/sanity/queries'
import {IMAGES} from '@/lib/images'

export async function generateMetadata() {
  const page = await getPageBySlug('blog')
  if (page) return buildSeoFromDoc(page, '/blog', 'Plumbing Blog Dubai')
  return buildMetadata({
    title: 'Plumbing Blog Dubai | Tips & Guides | Handyman Maintenance',
    description:
      'Read plumbing tips, guides, and expert advice from Handyman Maintenance Dubai. Stay informed about plumbing maintenance and repairs.',
    path: '/blog',
  })
}

export default async function BlogPage() {
  const [page, posts, settings] = await Promise.all([
    getPageBySlug('blog'),
    getPosts(),
    getSiteSettings(),
  ])
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Blog', path: '/blog'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <PageBanner
        title={page?.title || 'Plumbing Blog'}
        subtitle={page?.bannerSubtitle || 'Tips, guides, and expert advice from Handyman Maintenance Dubai'}
      />
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        {posts?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={{...post, image: post.image || IMAGES.plumbing}} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center">
            {settings?.labels?.noPosts || 'No blog posts yet. Check back soon!'}
          </p>
        )}
      </section>
    </SiteLayout>
  )
}
