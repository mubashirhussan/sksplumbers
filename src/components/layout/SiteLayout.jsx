import {Header} from '@/components/layout/Header'
import {Footer} from '@/components/layout/Footer'
import {NeedServiceBar} from '@/components/ui/NeedServiceBar'
import {getSiteSettings, getSiteHeader, getSiteFooter} from '@/lib/sanity/queries'

export async function SiteLayout({children, showNeedService = true}) {
  const [settings, header, footer] = await Promise.all([
    getSiteSettings(),
    getSiteHeader(),
    getSiteFooter(),
  ])

  return (
    <>
      <Header settings={settings} header={header} />
      <main className="min-w-0 flex-1 overflow-x-hidden">{children}</main>
      {showNeedService && <NeedServiceBar settings={settings} />}
      <Footer settings={settings} footer={footer} />
    </>
  )
}
