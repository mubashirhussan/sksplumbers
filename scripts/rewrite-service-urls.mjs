import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'

function loadToken() {
  const envPath = resolve('../studio-sksplumbers/.env')
  const raw = readFileSync(envPath, 'utf8')
  const match = raw.match(/^SANITY_API_TOKEN=(.+)$/m)
  if (!match) throw new Error('SANITY_API_TOKEN not found in studio .env')
  return match[1].trim()
}

const client = createClient({
  projectId: 'yk2toi4y',
  dataset: 'production',
  apiVersion: '2026-05-15',
  token: loadToken(),
  useCdn: false,
})

function rewriteServiceHref(href = '') {
  if (href === '/services' || href === '/services/') return href
  return href.replace(/^\/services\//, '/')
}

function rewriteNavItems(items = []) {
  return items.map((item) => ({
    ...item,
    href: rewriteServiceHref(item.href),
    children: (item.children || []).map((child) => ({
      ...child,
      href: rewriteServiceHref(child.href),
    })),
  }))
}

function rewriteFooterColumns(columns = []) {
  return columns.map((column) => ({
    ...column,
    links: (column.links || []).map((link) => ({
      ...link,
      href: rewriteServiceHref(link.href),
    })),
  }))
}

const [header, footer, home] = await Promise.all([
  client.fetch(`*[_type == "siteHeader"][0]{_id, menuItems}`),
  client.fetch(`*[_type == "siteFooter"][0]{_id, columns}`),
  client.fetch(`*[_type == "homePage"][0]{_id, sections}`),
])

if (header?._id) {
  await client.patch(header._id).set({menuItems: rewriteNavItems(header.menuItems)}).commit()
  console.log('Updated siteHeader menu hrefs')
}

if (footer?._id) {
  await client.patch(footer._id).set({columns: rewriteFooterColumns(footer.columns)}).commit()
  console.log('Updated siteFooter link hrefs')
}

if (home?._id && Array.isArray(home.sections)) {
  const sections = home.sections.map((section) => {
    if (section._type !== 'homeServices') return section
    return {
      ...section,
      viewAllHref: rewriteServiceHref(section.viewAllHref || '/services/'),
    }
  })
  await client.patch(home._id).set({sections}).commit()
  console.log('Updated homePage service section hrefs')
}

console.log('Done')
