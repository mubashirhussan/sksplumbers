import Link from 'next/link'
import Image from 'next/image'

function CardImage({src, alt}) {
  if (!src) return null
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
    </div>
  )
}

export function ServiceCard({service}) {
  return (
    <Link
      href={`/services/${service.slug.current}`}
      className="group block bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-brand-300 hover:shadow-md transition-all"
    >
      <CardImage src={service.image} alt={service.title} />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-600 mb-2 transition-colors">
          {service.title}
        </h3>
        {service.excerpt && (
          <p className="text-slate-500 text-sm line-clamp-2">{service.excerpt}</p>
        )}
        <span className="inline-block mt-4 text-brand-600 text-sm font-medium group-hover:underline">
          Learn more →
        </span>
      </div>
    </Link>
  )
}

export function CategoryCard({category}) {
  return (
    <Link
      href={`/categories/${category.slug.current}`}
      className="group block bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-brand-300 hover:shadow-md transition-all"
    >
      <CardImage src={category.image} alt={category.title} />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-600 mb-2 transition-colors">
          {category.title}
        </h3>
        {category.description && (
          <p className="text-slate-500 text-sm line-clamp-3">{category.description}</p>
        )}
        <span className="inline-block mt-4 text-brand-600 text-sm font-medium group-hover:underline">
          View services →
        </span>
      </div>
    </Link>
  )
}

export function PostCard({post}) {
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all"
    >
      <CardImage src={post.image} alt={post.title} />
      <div className="p-6">
        <time className="text-xs text-slate-400" dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString('en-AE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-600 mt-2 mb-2 transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-slate-500 text-sm line-clamp-2">{post.excerpt}</p>
        )}
      </div>
    </Link>
  )
}
