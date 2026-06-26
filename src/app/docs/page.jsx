'use client'

import docs from '@/data/docs.json'
import SearchableList from '@/components/sections/SearchableList'
import { useI18n } from '@/i18n/I18nContext'

export default function DocsPage() {
  const { t, lang } = useI18n()
  // docs.title / docs.description 多语言选择
  const items = docs.map((d) => ({
    ...d,
    description: lang === 'en' ? (d.descriptionEn || d.description) : d.description,
  }))
  return (
    <div className="section">
      <div className="section-header">
        <div className="section-tag">{t('docs.tag')}</div>
        <h2>{t('docs.title')}</h2>
        <p className="section-desc">
          {lang === 'en'
            ? 'First-hand sources are always the most reliable. These documents define what a skill is, how to write one, and how agents load them.'
            : '一手来源永远最可靠。这些文档定义了 skill 是什么、如何写、如何被 agent 加载。'}
        </p>
      </div>
      <SearchableList
        items={items}
        variant="doc"
        tagKey="tag"
        searchFields={['title', 'description', 'icon']}
        showTagFilter={false}
        emptyMessage={t('docs.empty')}
      />
    </div>
  )
}