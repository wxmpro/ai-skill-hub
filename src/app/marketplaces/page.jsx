'use client'

import marketplaces from '@/data/marketplaces.json'
import SearchableList from '@/components/sections/SearchableList'
import { useI18n } from '@/i18n/I18nContext'

export default function MarketplacesPage() {
  const { t } = useI18n()
  return (
    <div className="section">
      <div className="section-header">
        <div className="section-tag">{t('marketplaces.tag')}</div>
        <h2>{t('marketplaces.title')}</h2>
        <p className="section-desc">
          {t('marketplaces.desc', { count: marketplaces.length })}
        </p>
      </div>
      <SearchableList
        items={marketplaces}
        variant="marketplace"
        tagKey="tag"
        searchFields={['title', 'tagline', 'taglineEn']}
        emptyMessage={t('marketplaces.empty')}
      />
    </div>
  )
}