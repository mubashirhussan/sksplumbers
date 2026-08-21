import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {randomBytes} from 'node:crypto'

function loadToken() {
  const envPath = resolve('../studio-sksplumbers/.env')
  const raw = readFileSync(envPath, 'utf8')
  const match = raw.match(/^SANITY_API_TOKEN=(.+)$/m)
  if (!match) throw new Error('SANITY_API_TOKEN not found in studio .env')
  return match[1].trim()
}

function key(prefix) {
  return `${prefix}${randomBytes(4).toString('hex')}`
}

const client = createClient({
  projectId: 'yk2toi4y',
  dataset: 'production',
  apiVersion: '2026-05-15',
  token: loadToken(),
  useCdn: false,
})

function navPath(href) {
  return (href || '/').replace(/\/$/, '') || '/'
}

const header = await client.fetch(`*[_type == "siteHeader"][0]{_id, menuItems}`)
if (!header?._id) throw new Error('siteHeader document not found')

const byPath = new Map()
for (const item of header.menuItems || []) {
  byPath.set(navPath(item.href).toLowerCase(), item)
}

function menuItem(label, href, children = []) {
  const existing = byPath.get(navPath(href).toLowerCase())
  return {
    _type: 'navMenuItem',
    _key: existing?._key || key('mi'),
    label,
    href,
    openInNewTab: false,
    children: children.map((child) => ({
      _type: 'navLink',
      _key: key('nl'),
      label: child.label,
      href: child.href,
      openInNewTab: false,
    })),
  }
}

const services = byPath.get('/services')
const serviceChildren =
  services?.children?.length > 0
    ? services.children.map((child) => ({
        label: child.label,
        href: (child.href || '').replace(/^\/services\//, '/'),
      }))
    : []

// Canonical dynamic menu order — all from Sanity content refs
const menuItems = [
  menuItem('Home', '/'),
  menuItem('Services', '/services/', serviceChildren),
  menuItem('About Us', '/about/'),
  menuItem('Why Choose Us', '/why-choose-us/'),
  menuItem('Service Areas', '/service-areas/'),
  menuItem('Gallery', '/gallery/'),
  menuItem('Blog', '/blog/'),
  menuItem('Contact Us', '/contact/'),
]

await client.patch(header._id).set({menuItems}).commit()

const verify = await client.fetch(
  `*[_type == "siteHeader"][0]{menuItems[]{label, href, "childCount": count(children)}}`,
)
console.log(JSON.stringify(verify, null, 2))
