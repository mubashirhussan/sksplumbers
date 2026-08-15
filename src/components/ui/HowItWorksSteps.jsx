import {Icon} from '@/components/ui/Icons'

export function HowItWorksSteps({steps}) {
  if (!steps?.length) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((item) => (
        <div key={item.step || item.title} className="text-center px-4">
          <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-navy text-gold">
              <Icon name={item.icon} className="w-9 h-9" />
            </div>
            {item.step ? (
              <span className="absolute -top-1 -right-1 font-heading text-gold font-extrabold text-lg">{item.step}</span>
            ) : null}
          </div>
          {item.title ? <h3 className="font-heading font-bold uppercase text-navy mb-2">{item.title}</h3> : null}
          {item.text ? <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p> : null}
        </div>
      ))}
    </div>
  )
}
