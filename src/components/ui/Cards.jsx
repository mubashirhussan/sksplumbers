import Link from 'next/link'
import Image from 'next/image'
import {IMAGES} from '@/lib/images'

function CardImage({src, alt}) {
  const image = src || IMAGES.plumbing
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
      <Image src={image} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
    </div>
  )
}

export function ServiceCard({service}) {
  return (
    <Link
      href={`/services/${service.slug.current}`}
      className="group block bg-white border border-slate-200 overflow-hidden hover:border-gold hover:shadow-md transition-all"
    >
      <CardImage src={service.image} alt={service.title} />
      <div className="p-4 sm:p-6">
        <h3 className="font-heading text-lg font-bold uppercase text-navy group-hover:text-gold mb-2 transition-colors">
          {service.title}
        </h3>
        {service.excerpt && (
          <p className="text-slate-500 text-sm line-clamp-2">{service.excerpt}</p>
        )}
        <span className="inline-block mt-4 text-gold text-sm font-heading font-bold uppercase">
          Read More
        </span>
      </div>
    </Link>
  )
}

export function CategoryCard({category}) {
  return (
    <Link
      href={`/categories/${category.slug.current}`}
      className="group block bg-white border border-slate-200 overflow-hidden hover:border-gold hover:shadow-md transition-all"
    >
      <CardImage src={category.image} alt={category.title} />
      <div className="p-4 sm:p-6">
        <h3 className="font-heading text-lg font-bold uppercase text-navy group-hover:text-gold mb-2 transition-colors">
          {category.title}
        </h3>
        {category.description && (
          <p className="text-slate-500 text-sm line-clamp-3">{category.description}</p>
        )}
        <span className="inline-block mt-4 text-gold text-sm font-heading font-bold uppercase">
          Read More
        </span>
      </div>
    </Link>
  )
}

export function PostCard({post}) {
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block bg-white border border-slate-200 overflow-hidden hover:shadow-md transition-all"
    >
      <CardImage src={post.image || IMAGES.plumbing} alt={post.title} />
      <div className="p-4 sm:p-6">
        <time className="text-xs text-slate-400" dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString('en-AE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <h3 className="font-heading text-lg font-bold text-navy group-hover:text-gold mt-2 mb-2 transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-slate-500 text-sm line-clamp-2">{post.excerpt}</p>
        )}
      </div>
    </Link>
  )
}
