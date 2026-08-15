import {Icon} from '@/components/ui/Icons'
import {HOW_IT_WORKS_STEPS} from '@/lib/site-content'

export function HowItWorksSteps() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {HOW_IT_WORKS_STEPS.map((item) => (
        <div key={item.step} className="text-center px-4">
          <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-navy text-gold">
              <Icon name={item.icon} className="w-9 h-9" />
            </div>
            <span className="absolute -top-1 -right-1 font-heading text-gold font-extrabold text-lg">
              {item.step}
            </span>
          </div>
          <h3 className="font-heading font-bold uppercase text-navy mb-2">{item.title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  )
}
