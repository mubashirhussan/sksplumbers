'use client'

import {useMemo, useState} from 'react'
import {CmsImage} from '@/components/ui/CmsImage'
import {GALLERY_IMAGES} from '@/lib/images'
import {GALLERY_FILTERS} from '@/lib/site-content'

export function GalleryGrid({filters, images}) {
  const tabs = filters?.length ? filters : GALLERY_FILTERS
  const photos = images?.length ? images : GALLERY_IMAGES
  const [filter, setFilter] = useState(tabs[0]?.id || 'all')
  const items = useMemo(
    () => (filter === 'all' ? photos : photos.filter((item) => item.category === filter)),
    [filter, photos],
  )

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2 md:mb-10">
        {tabs.map((tab) => {
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
            <CmsImage src={item.src} alt={item.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
          </figure>
        ))}
      </div>
    </div>
  )
}
