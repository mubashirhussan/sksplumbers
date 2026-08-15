export function digitsOnly(value = '') {
  return String(value).replace(/\D/g, '')
}

export function telHref(phone) {
  if (!phone) return null
  return `tel:${digitsOnly(phone)}`
}

export function whatsappHref(phone, message = '') {
  if (!phone) return null
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${digitsOnly(phone)}${text}`
}

export function whatsappNumber(settings) {
  return settings?.whatsappNumber || settings?.phone
}

export function label(settings, key) {
  return settings?.labels?.[key] || ''
}
