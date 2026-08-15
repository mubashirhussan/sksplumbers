'use client'

import {useMemo, useState} from 'react'
import Image from 'next/image'

export function GalleryGrid({filters = [], images = []}) {
  const initial = filters[0]?.id || 'all'
  const [filter, setFilter] = useState(initial)
  const items = useMemo(
    () => (filter === 'all' ? images : images.filter((item) => item.category === filter)),
    [filter, images],
  )

  return (
    <div>
      {filters.length ? (
        <div className="mb-8 flex flex-wrap justify-center gap-2 md:mb-10">
          {filters.map((tab) => {
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
      ) : null}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) =>
          item.src ? (
            <figure key={`${item.src}-${item.alt}`} className="relative aspect-square overflow-hidden bg-slate-100">
              <Image
                src={item.src}
                alt={item.alt || item.imageAlt || ''}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </figure>
          ) : null,
        )}
      </div>
    </div>
  )
}
