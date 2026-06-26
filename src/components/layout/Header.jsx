'use client'

import { useI18n } from '@/i18n/I18nContext'

export default function Header() {
  const { t } = useI18n()
  return (
    <header className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span>🎯</span>
          <span>{t('hero.badge')}</span>
        </div>
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.subtitle')}</p>
      </div>
    </header>
  )
}