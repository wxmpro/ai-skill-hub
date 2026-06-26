'use client'

import examples from '@/data/examples.json'
import SearchableList from '@/components/sections/SearchableList'
import { useI18n } from '@/i18n/I18nContext'

export default function ExamplesPage() {
  const { t } = useI18n()
  return (
    <div className="section">
      <div className="section-header">
        <div className="section-tag">{t('examples.tag')}</div>
        <h2>{t('examples.title')}</h2>
        <p className="section-desc">{t('examples.desc')}</p>
      </div>
      <SearchableList
        items={examples}
        variant="example"
        tagKey="tags"
        searchFields={['title', 'subtitle', 'why', 'whyEn']}
        emptyMessage={t('common.noResults')}
      />
    </div>
  )
}