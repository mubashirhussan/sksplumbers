import {SERVICE_SELECT_OPTIONS} from '@/lib/site-content'

export function QuoteForm({title = 'Request a Quote', submitLabel = 'Submit Now', defaultService}) {
  return (
    <div className="border border-slate-200 bg-white p-5 shadow-sm md:p-8">
      <h2 className="font-heading text-xl md:text-2xl font-extrabold uppercase text-navy mb-6">
        {title}
      </h2>
      <form className="space-y-4" action="#" method="POST">
        <div>
          <label htmlFor="quote-name" className="block text-sm font-medium text-navy mb-1">
            Name
          </label>
          <input id="quote-name" name="name" type="text" required className="input-field" />
        </div>
        <div>
          <label htmlFor="quote-phone" className="block text-sm font-medium text-navy mb-1">
            Phone
          </label>
          <input id="quote-phone" name="phone" type="tel" required className="input-field" />
        </div>
        <div>
          <label htmlFor="quote-email" className="block text-sm font-medium text-navy mb-1">
            Email
          </label>
          <input id="quote-email" name="email" type="email" className="input-field" />
        </div>
        <div>
          <label htmlFor="quote-service" className="block text-sm font-medium text-navy mb-1">
            Service
          </label>
          <select id="quote-service" name="service" className="input-field" defaultValue={defaultService || ''}>
            <option value="">Select a service</option>
            {SERVICE_SELECT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quote-message" className="block text-sm font-medium text-navy mb-1">
            Message
          </label>
          <textarea id="quote-message" name="message" rows={4} required className="input-field" />
        </div>
        <button
          type="submit"
          className="w-full bg-gold text-navy py-3 font-heading font-extrabold uppercase tracking-wide hover:bg-gold-600 transition-colors"
        >
          {submitLabel}
        </button>
      </form>
    </div>
  )
}
