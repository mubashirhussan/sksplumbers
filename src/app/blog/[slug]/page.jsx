import {notFound} from 'next/navigation'
import {SiteLayout} from '@/components/layout/SiteLayout'
import {Breadcrumbs} from '@/components/ui/Breadcrumbs'
import {PortableText} from '@/components/content/PortableText'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {blogPostingSchema, breadcrumbSchema} from '@/lib/seo/jsonld'
import {getPostBySlug, getPostSlugs, getSiteSettings} from '@/lib/sanity/queries'

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return (slugs || []).map((slug) => ({slug}))
}

export async function generateMetadata({params}) {
  const {slug} = await params
  const post = await getPostBySlug(slug)
  return buildSeoFromDoc(post, `/blog/${slug}`, 'Blog Post')
}

export default async function BlogPostPage({params}) {
  const {slug} = await params
  const [post, settings] = await Promise.all([getPostBySlug(slug), getSiteSettings()])

  if (!post) notFound()

  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Blog', path: '/blog'},
    {name: post.title, path: `/blog/${slug}`},
  ]

  return (
    <SiteLayout>
      <JsonLd data={[blogPostingSchema(post, settings), breadcrumbSchema(breadcrumbs)]} />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Breadcrumbs items={breadcrumbs} />
        <header className="mb-8">
          <time className="text-sm text-slate-400" dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-AE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">{post.title}</h1>
          {post.excerpt && <p className="text-lg text-slate-600">{post.excerpt}</p>}
        </header>
        <PortableText value={post.body} />
      </article>
    </SiteLayout>
  )
}
