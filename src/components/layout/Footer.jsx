'use client'

import { useI18n } from '@/i18n/I18nContext'

export default function Footer() {
  const { t, lang } = useI18n()
  return (
    <footer>
      <p>{t('footer.disclaimer')}</p>
      <p style={{ marginTop: '8px' }}>
        Next.js {process.env.npm_package_dependencies_next?.replace('^', '') || '16'} · App Router ·{' '}
        {lang === 'en' ? 'static export' : '静态部署'}
      </p>
    </footer>
  )
}