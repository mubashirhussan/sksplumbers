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

function withKeys(item) {
  return {
    _type: 'navMenuItem',
    _key: item._key || key('mi'),
    label: item.label,
    href: item.href || '',
    openInNewTab: item.openInNewTab || false,
    children: (item.children || []).map((child) => ({
      _type: 'navLink',
      _key: child._key || key('nl'),
      label: child.label,
      href: child.href,
      openInNewTab: child.openInNewTab || false,
    })),
  }
}

const header = await client.fetch(`*[_type == "siteHeader"][0]{_id, menuItems}`)
if (!header?._id) throw new Error('siteHeader document not found')

const existing = (header.menuItems || []).map(withKeys)
const paths = new Set(existing.map((item) => navPath(item.href).toLowerCase()))

const blogItem = withKeys({
  label: 'Blog',
  href: '/blog/',
  openInNewTab: false,
  children: [],
})

const extras = []
if (!paths.has('/blog')) extras.push(blogItem)

let menuItems = existing
if (extras.length) {
  const contactIdx = existing.findIndex(
    (item) => /contact/i.test(item.label || '') || navPath(item.href).toLowerCase() === '/contact',
  )
  menuItems =
    contactIdx >= 0
      ? [...existing.slice(0, contactIdx), ...extras, ...existing.slice(contactIdx)]
      : [...existing, ...extras]
}

// Drop Categories from the header menu
menuItems = menuItems.filter((item) => {
  const path = navPath(item.href).toLowerCase()
  return path !== '/categories' && !/^categor/i.test(item.label || '')
})

await client.patch(header._id).set({menuItems}).commit()

const home = await client.fetch(`*[_type == "homePage"][0]{_id, sections}`)
if (home?._id && Array.isArray(home.sections)) {
  const sections = home.sections.filter(
    (section) => section._type !== 'homeCategories' && section._type !== 'homeBlog',
  )
  if (sections.length !== home.sections.length) {
    await client.patch(home._id).set({sections}).commit()
    console.log('Removed homeCategories and homeBlog from homePage')
  }
}

const verify = await client.fetch(
  `*[_type == "siteHeader"][0]{menuItems[]{label, href, children[]{label, href}}}`,
)
console.log('Updated header menu:')
console.log(JSON.stringify(verify, null, 2))
