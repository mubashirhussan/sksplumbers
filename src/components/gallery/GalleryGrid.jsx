'use client'

import {useMemo, useState} from 'react'
import Image from 'next/image'
import {GALLERY_IMAGES} from '@/lib/images'
import {GALLERY_FILTERS} from '@/lib/site-content'

export function GalleryGrid() {
  const [filter, setFilter] = useState('all')
  const items = useMemo(
    () => (filter === 'all' ? GALLERY_IMAGES : GALLERY_IMAGES.filter((item) => item.category === filter)),
    [filter],
  )

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2 md:mb-10">
        {GALLERY_FILTERS.map((tab) => {
          const active = filter === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-2 font-heading text-xs font-bold uppercase transition-colors sm:px-4 sm:text-sm ${
                active ? 'bg-gold text-navy' : 'bg-slate-100 text-navy hover:bg-gold-100'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <figure key={`${item.src}-${item.alt}`} className="relative aspect-square overflow-hidden bg-slate-100">
            <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
          </figure>
        ))}
      </div>
    </div>
  )
}
