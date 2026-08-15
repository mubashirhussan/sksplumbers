export function digitsOnly(value = '') {
  return String(value).replace(/\D/g, '')
}

export function telHref(phone) {
  if (!phone) return null
  return `tel:${digitsOnly(phone)}`
}

export function whatsappHref(phone, message = 'Hello Handyman Maintenance, I need a service in Dubai.') {
  if (!phone) return null
  const text = encodeURIComponent(message || 'Hello Handyman Maintenance, I need a service in Dubai.')
  return `https://wa.me/${digitsOnly(phone)}?text=${text}`
}
