import {SiteLayout} from '@/components/layout/SiteLayout'
import {PostCard} from '@/components/ui/Cards'
import {Breadcrumbs} from '@/components/ui/Breadcrumbs'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildMetadata} from '@/lib/seo/metadata'
import {breadcrumbSchema} from '@/lib/seo/jsonld'
import {getPosts} from '@/lib/sanity/queries'

export async function generateMetadata() {
  return buildMetadata({
    title: 'Plumbing Blog Dubai | Tips & Guides | SKS Plumbers',
    description:
      'Read plumbing tips, guides, and expert advice from SKS Plumbers Dubai. Stay informed about plumbing maintenance and repairs.',
    path: '/blog',
  })
}

export default async function BlogPage() {
  const posts = await getPosts()
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Blog', path: '/blog'},
  ]

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Plumbing Blog</h1>
        <p className="text-lg text-slate-600 mb-10 max-w-3xl">
          Expert plumbing tips, guides, and news from SKS Plumbers Dubai.
        </p>
        {posts?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500">No blog posts yet. Check back soon!</p>
        )}
      </div>
    </SiteLayout>
  )
}
