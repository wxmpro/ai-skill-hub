'use client'

import { useState, useMemo, Fragment } from 'react'
import { useI18n } from '@/i18n/I18nContext'

function MarketplaceCard({ item, lang }) {
  let primaryUrl
  if (item.type === "website") {
    primaryUrl = item.website || item.url
  } else if (item.homepage) {
    primaryUrl = item.homepage
  } else {
    primaryUrl = `https://github.com/${item.githubRepo}`
  }
  const githubUrl = item.githubRepo ? `https://github.com/${item.githubRepo}` : null
  const starText = item.stars ? `${item.stars.toLocaleString()} ⭐` : null
  const tagline = lang === 'en'
    ? (item.taglineEn || item.tagline)
    : (item.tagline || item.taglineEn)

  return (
    <div className="card">
      <div className="card-header">
        <a
          href={primaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="card-title"
          title={primaryUrl}
        >
          {item.title}
        </a>
        {item.tag && <span className="card-tag">{item.tag}</span>}
      </div>
      {tagline && (
        <div className="card-tagline">{tagline}</div>
      )}
      <div className="card-actions">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card-link"
            title={githubUrl}
          >
            <svg className="card-link-icon" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            GitHub
          </a>
        )}
        {starText && <span className="card-stars">{starText}</span>}
      </div>
    </div>
  )
}

function DocCard({ item }) {
  return (
    <div className="doc-card">
      <a href={item.url} target="_blank" rel="noopener noreferrer">
        {item.title}
      </a>
      <p>{item.description}</p>
    </div>
  )
}

function scoreToStars(score) {
  const n = parseFloat(score)
  if (isNaN(n)) return '★★★★★'
  const full = Math.floor(n)
  const half = n - full >= 0.5
  return '★'.repeat(full) + (half ? '☆' : '') + '☆'.repeat(5 - full - (half ? 1 : 0))
}

function ExampleCard({ item, lang, t }) {
  const stars = scoreToStars(item.score)
  const starCount = item.stars ? `${formatStars(item.stars)} ⭐` : null
  const why = lang === 'en' ? (item.whyEn || item.why) : (item.why || item.whyEn)
  const subtitle = lang === 'en' ? (item.subtitleEn || item.subtitle) : (item.subtitle || item.subtitleEn)
  return (
    <div className="example-card">
      <div className="example-header">
        <div className="example-avatar">{item.avatar}</div>
        <div className="example-info">
          <div className="example-title">
            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
          </div>
          <div className="example-subtitle">{subtitle}</div>
        </div>
        <div className="example-score">
          <div className="score-number">{item.score || '—'}</div>
          <div className="score-stars">{stars}</div>
        </div>
      </div>
      {starCount && (
        <div className="example-stars-inline">⭐ {starCount}</div>
      )}
      {item.tags && item.tags.length > 0 && (
        <div className="example-tags">
          {item.tags.map((tag, i) => <span key={i} className="example-tag">{tag}</span>)}
        </div>
      )}
      <div className="example-why">
        <h4>{t('examples.whyGood')}</h4>
        <p>{why}</p>
      </div>
    </div>
  )
}

function formatStars(n) {
  if (typeof n === 'number') {
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
    return String(n)
  }
  return n
}

/**
 * 通用搜索 + 标签筛选组件
 */
export default function SearchableList({
  items,
  variant = 'marketplace',
  tagKey = 'tag',
  searchFields = ['title', 'description', 'tag'],
  showTagFilter = true,
  emptyMessage,
}) {
  const { t, lang } = useI18n()
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('all')

  const allTags = useMemo(() => {
    if (!showTagFilter) return ['all']
    const set = new Set()
    items.forEach((it) => {
      const v = it[tagKey]
      if (Array.isArray(v)) v.forEach((tag) => tag && set.add(tag))
      else if (v) set.add(v)
    })
    return ['all', ...Array.from(set).sort()]
  }, [items, tagKey, showTagFilter])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((it) => {
      if (activeTag !== 'all') {
        const v = it[tagKey]
        const tags = Array.isArray(v) ? v : [v]
        if (!tags.includes(activeTag)) return false
      }
      if (!q) return true
      const haystack = searchFields
        .map((f) => it[f])
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [items, query, activeTag, tagKey, searchFields])

  const finalEmpty = emptyMessage || t('common.noResults')

  const renderItem = (item) => {
    if (variant === 'example') return <ExampleCard item={item} lang={lang} t={t} />
    if (variant === 'doc') return <DocCard item={item} />
    return <MarketplaceCard item={item} lang={lang} />
  }

  return (
    <>
      <div className="browser-controls">
        <input
          type="search"
          className="search-input"
          placeholder={t('common.search')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {showTagFilter && allTags.length > 2 && (
          <div className="tag-filters">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`tag-chip ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag === 'all' ? t('common.all') : tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="result-count">
        {t('common.found')} <strong>{filtered.length}</strong> / {items.length}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>{finalEmpty}</p>
        </div>
      ) : (
        <div className="browse-list">
          {filtered.map((item, idx) => (
            <Fragment key={idx}>{renderItem(item)}</Fragment>
          ))}
        </div>
      )}
    </>
  )
}