import {notFound} from 'next/navigation'
import Image from 'next/image'
import {SiteLayout} from '@/components/layout/SiteLayout'
import {PageBanner} from '@/components/ui/PageBanner'
import {PortableText} from '@/components/content/PortableText'
import {JsonLd} from '@/components/seo/JsonLd'
import {buildSeoFromDoc} from '@/lib/seo/metadata'
import {blogPostingSchema, breadcrumbSchema} from '@/lib/seo/jsonld'
import {getPostBySlug, getPostSlugs, getSiteSettings} from '@/lib/sanity/queries'

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map((slug) => ({slug}))
}

export async function generateMetadata({params}) {
  const {slug} = await params
  const [post, settings] = await Promise.all([getPostBySlug(slug), getSiteSettings()])
  return buildSeoFromDoc(post, `/blog/${slug}`, settings)
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
      <JsonLd data={[blogPostingSchema(post, settings), breadcrumbSchema(breadcrumbs, settings)]} />
      <PageBanner title={post.title} />
      <article className="mx-auto max-w-3xl px-4 py-10 md:py-16">
        {post.publishedAt ? (
          <time className="text-sm text-slate-400" dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-AE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        ) : null}
        {post.excerpt ? <p className="text-lg text-slate-600 mt-4 mb-8">{post.excerpt}</p> : null}
        {post.image ? (
          <div className="relative aspect-[16/9] mb-8 overflow-hidden">
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        ) : null}
        <PortableText value={post.body} />
      </article>
    </SiteLayout>
  )
}
