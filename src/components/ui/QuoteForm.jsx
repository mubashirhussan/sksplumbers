import {telHref, whatsappHref, whatsappNumber} from '@/lib/contact'

export function QuoteForm({settings, services = [], title, submitLabel, defaultService}) {
  const form = settings?.quoteForm || {}
  const heading = title || form.title
  const button = submitLabel || form.submitLabel
  const options =
    form.serviceOptions?.length > 0 ? form.serviceOptions : services.map((service) => service.title).filter(Boolean)

  return (
    <div className="border border-slate-200 bg-white p-5 shadow-sm md:p-8">
      {heading ? (
        <h2 className="font-heading text-xl md:text-2xl font-extrabold uppercase text-navy mb-6">{heading}</h2>
      ) : null}
      <form className="space-y-4" action="#" method="POST">
        {form.nameLabel ? (
          <div>
            <label htmlFor="quote-name" className="block text-sm font-medium text-navy mb-1">
              {form.nameLabel}
            </label>
            <input id="quote-name" name="name" type="text" required className="input-field" />
          </div>
        ) : null}
        {form.phoneLabel ? (
          <div>
            <label htmlFor="quote-phone" className="block text-sm font-medium text-navy mb-1">
              {form.phoneLabel}
            </label>
            <input id="quote-phone" name="phone" type="tel" required className="input-field" />
          </div>
        ) : null}
        {form.emailLabel ? (
          <div>
            <label htmlFor="quote-email" className="block text-sm font-medium text-navy mb-1">
              {form.emailLabel}
            </label>
            <input id="quote-email" name="email" type="email" className="input-field" />
          </div>
        ) : null}
        {form.serviceLabel ? (
          <div>
            <label htmlFor="quote-service" className="block text-sm font-medium text-navy mb-1">
              {form.serviceLabel}
            </label>
            <select id="quote-service" name="service" className="input-field" defaultValue={defaultService || ''}>
              <option value="">{form.servicePlaceholder || ''}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        {form.messageLabel ? (
          <div>
            <label htmlFor="quote-message" className="block text-sm font-medium text-navy mb-1">
              {form.messageLabel}
            </label>
            <textarea id="quote-message" name="message" rows={4} required className="input-field" />
          </div>
        ) : null}
        {button ? (
          <button
            type="submit"
            className="w-full bg-gold text-navy py-3 font-heading font-extrabold uppercase tracking-wide hover:bg-gold-600 transition-colors"
          >
            {button}
          </button>
        ) : null}
      </form>
    </div>
  )
}

export function resolveCtaHref(button, settings) {
  if (!button) return null
  if (button.linkType === 'phone') return telHref(settings?.phone)
  if (button.linkType === 'whatsapp') {
    return whatsappHref(whatsappNumber(settings), settings?.whatsappMessage)
  }
  return button.href
}
