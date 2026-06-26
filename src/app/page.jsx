'use client'

import Link from 'next/link'
import { useI18n } from '@/i18n/I18nContext'

// 细线图标（stroke 1.6，currentColor）——避免厚描边/Material 风格
const icons = {
  marketplaces: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M16.2 7.8 13.4 13.4 7.8 16.2 10.6 10.6z" />
    </svg>
  ),
  official: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8 12 3 3 8l9 5 9-5z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </svg>
  ),
  docs: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22.5z" />
      <path d="M8 7h8M8 11h6" />
    </svg>
  ),
  criteria: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  ),
  examples: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5 14.6 8.9 20.5 9.8 16.2 14 17.3 19.9 12 17.1 6.7 19.9 7.8 14 3.5 9.8 9.4 8.9z" />
    </svg>
  ),
  learn: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
    </svg>
  ),
}

export default function Home() {
  const { t } = useI18n()

  const cards = [
    { href: '/marketplaces/', icon: 'marketplaces', titleKey: 'nav.marketplaces', descKey: 'home.cardMarketplaces' },
    { href: '/official-skills/', icon: 'official', titleKey: 'nav.officialSkills', descKey: 'home.cardOfficialSkills' },
    { href: '/docs/', icon: 'docs', titleKey: 'nav.docs', descKey: 'home.cardDocs' },
    { href: '/criteria/', icon: 'criteria', titleKey: 'nav.criteria', descKey: 'home.cardCriteria' },
    { href: '/examples/', icon: 'examples', titleKey: 'nav.examples', descKey: 'home.cardExamples' },
    { href: '/learn/', icon: 'learn', titleKey: 'nav.learn', descKey: 'home.cardLearn' },
  ]

  return (
    <div className="section">
      <div className="section-header">
        <div className="section-tag">{t('home.tag')}</div>
        <h2>{t('home.title')}</h2>
        <p className="section-desc">{t('home.desc')}</p>
      </div>

      <div className="card-grid">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="card home-card">
            <div className="home-card-icon">{icons[card.icon]}</div>
            <div className="home-card-body">
              <h3>{t(card.titleKey)}</h3>
              <p>{t(card.descKey)}</p>
            </div>
            <span className="home-card-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
