import './globals.css'
import Header from '@/components/layout/Header'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import DocumentTitle from '@/components/layout/DocumentTitle'
import { I18nProvider } from '@/i18n/I18nContext'

export const metadata = {
  title: 'AI Skill Hub | Discover, evaluate, and learn to write quality skills',
  description: 'AI Skill resource hub + learning site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <I18nProvider>
          <DocumentTitle />
          <Header />
          <Nav />
          <main>{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  )
}