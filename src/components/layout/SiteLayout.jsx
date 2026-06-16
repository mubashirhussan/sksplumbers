import {Header} from '@/components/layout/Header'
import {Footer} from '@/components/layout/Footer'
import {getSiteSettings, getSiteHeader, getSiteFooter} from '@/lib/sanity/queries'

export async function SiteLayout({children}) {
  const [settings, header, footer] = await Promise.all([
    getSiteSettings(),
    getSiteHeader(),
    getSiteFooter(),
  ])

  return (
    <>
      <Header settings={settings} header={header} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} footer={footer} />
    </>
  )
}
