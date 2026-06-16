import Link from 'next/link'

export function ServiceCard({service}) {
  return (
    <Link
      href={`/services/${service.slug.current}`}
      className="group block bg-white border border-slate-200 rounded-xl p-6 hover:border-brand-300 hover:shadow-md transition-all"
    >
      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-600 mb-2 transition-colors">
        {service.title}
      </h3>
      {service.excerpt && (
        <p className="text-slate-500 text-sm line-clamp-2">{service.excerpt}</p>
      )}
      <span className="inline-block mt-4 text-brand-600 text-sm font-medium group-hover:underline">
        Learn more →
      </span>
    </Link>
  )
}

export function CategoryCard({category}) {
  return (
    <Link
      href={`/categories/${category.slug.current}`}
      className="group block bg-white border border-slate-200 rounded-xl p-6 hover:border-brand-300 hover:shadow-md transition-all"
    >
      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-600 mb-2 transition-colors">
        {category.title}
      </h3>
      {category.description && (
        <p className="text-slate-500 text-sm line-clamp-3">{category.description}</p>
      )}
      <span className="inline-block mt-4 text-brand-600 text-sm font-medium group-hover:underline">
        View services →
      </span>
    </Link>
  )
}

export function PostCard({post}) {
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all"
    >
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
