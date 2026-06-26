'use client'

import Link from 'next/link'
import { useI18n } from '@/i18n/I18nContext'

export default function Home() {
  const { t, lang } = useI18n()

  const cards = [
    {
      href: '/marketplaces/',
      titleKey: 'nav.marketplaces',
      descKey: 'home.cardMarketplaces',
    },
    {
      href: '/official-skills/',
      titleKey: 'nav.officialSkills',
      descKey: 'home.cardOfficialSkills',
    },
    {
      href: '/docs/',
      titleKey: 'nav.docs',
      descKey: 'home.cardDocs',
    },
    {
      href: '/criteria/',
      titleKey: 'nav.criteria',
      descKey: 'home.cardCriteria',
    },
    {
      href: '/examples/',
      titleKey: 'nav.examples',
      descKey: 'home.cardExamples',
    },
    {
      href: '/learn/',
      titleKey: 'nav.learn',
      descKey: 'home.cardLearn',
    },
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
          <Link key={card.href} href={card.href} className="card">
            <h3>{t(card.titleKey)}</h3>
            <p>{t(card.descKey)}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}