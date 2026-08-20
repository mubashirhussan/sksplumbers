import {SERVICE_SELECT_OPTIONS} from '@/lib/site-content'

export function QuoteForm({title, submitLabel, defaultService, settings, variant = 'light'}) {
  const form = settings?.quoteForm || {}
  const options = form.serviceOptions?.length > 0 ? form.serviceOptions : SERVICE_SELECT_OPTIONS
  const heading = title || form.title || 'Request a Quote'
  const buttonLabel = submitLabel || form.submitLabel || 'Submit Now'
  const dark = variant === 'dark'

  return (
    <div
      className={
        dark
          ? 'rounded-2xl bg-navy p-5 text-white shadow-sm md:p-8'
          : 'border border-slate-200 bg-white p-5 shadow-sm md:p-8'
      }
    >
      <h2
        className={`font-heading text-xl md:text-2xl font-extrabold uppercase mb-6 ${
          dark ? 'text-white' : 'text-navy'
        }`}
      >
        {heading}
      </h2>
      <form className="space-y-4" action="#" method="POST">
        <div>
          <label
            htmlFor="quote-name"
            className={`block text-sm font-medium mb-1 ${dark ? 'text-white/90' : 'text-navy'}`}
          >
            {form.nameLabel || 'Name'}
          </label>
          <input id="quote-name" name="name" type="text" required className="input-field" />
        </div>
        <div>
          <label
            htmlFor="quote-phone"
            className={`block text-sm font-medium mb-1 ${dark ? 'text-white/90' : 'text-navy'}`}
          >
            {form.phoneLabel || 'Phone'}
          </label>
          <input id="quote-phone" name="phone" type="tel" required className="input-field" />
        </div>
        <div>
          <label
            htmlFor="quote-email"
            className={`block text-sm font-medium mb-1 ${dark ? 'text-white/90' : 'text-navy'}`}
          >
            {form.emailLabel || 'Email'}
          </label>
          <input id="quote-email" name="email" type="email" className="input-field" />
        </div>
        <div>
          <label
            htmlFor="quote-service"
            className={`block text-sm font-medium mb-1 ${dark ? 'text-white/90' : 'text-navy'}`}
          >
            {form.serviceLabel || 'Service'}
          </label>
          <select id="quote-service" name="service" className="input-field" defaultValue={defaultService || ''}>
            <option value="">{form.servicePlaceholder || 'Select a service'}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="quote-message"
            className={`block text-sm font-medium mb-1 ${dark ? 'text-white/90' : 'text-navy'}`}
          >
            {form.messageLabel || 'Message'}
          </label>
          <textarea id="quote-message" name="message" rows={4} required className="input-field" />
        </div>
        <button
          type="submit"
          className="w-full bg-gold text-navy py-3 font-heading font-extrabold uppercase tracking-wide hover:bg-gold-600 transition-colors"
        >
          {buttonLabel}
        </button>
      </form>
    </div>
  )
}
