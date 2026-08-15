import {Icon} from '@/components/ui/Icons'
import {TRUST_ITEMS} from '@/lib/site-content'

export function TrustBar() {
  return (
    <section className="bg-white py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl bg-navy px-4 py-8 text-white sm:px-6 sm:py-10 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST_ITEMS.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <Icon name={item.icon} className="w-8 h-8 shrink-0 text-white" />
                <div>
                  <h3 className="font-heading font-bold uppercase text-sm tracking-wide">{item.title}</h3>
                  <p className="text-white/75 text-sm mt-1">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
