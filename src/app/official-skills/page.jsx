'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import index from '@/data/official-skills/index.json'
import vendors from '@/data/official-skills/vendors.json'
import { useI18n } from '@/i18n/I18nContext'

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + 'M'
  if (bytes >= 1024) return (bytes / 1024).toFixed(0) + 'K'
  return bytes + 'B'
}

function matchesQuery(skill, query, lang) {
  if (!query) return true
  const q = query.trim().toLowerCase()
  const desc = lang === 'en'
    ? skill.description
    : (skill.descriptionZh || skill.description)
  const haystack = `${skill.name} ${desc || ''}`.toLowerCase()
  return haystack.includes(q)
}

export default function OfficialSkillsPage() {
  const { t, lang } = useI18n()
  const [query, setQuery] = useState('')

  const grouped = useMemo(() => {
    const result = {}
    for (const skill of index) {
      if (!matchesQuery(skill, query, lang)) continue
      if (!result[skill.vendor]) result[skill.vendor] = []
      result[skill.vendor].push(skill)
    }
    return result
  }, [query, lang])

  const orderedVendors = vendors.filter((v) => grouped[v.id]?.length > 0)
  const totalVisible = useMemo(
    () => Object.values(grouped).reduce((sum, arr) => sum + arr.length, 0),
    [grouped]
  )

  return (
    <div className="section">
      <div className="section-header">
        <div className="section-tag">{t('officialSkills.tag')}</div>
        <h2>{t('officialSkills.title', { count: index.length })}</h2>
        <p className="section-desc">{t('officialSkills.desc')}</p>
      </div>

      <div className="browser-controls">
        <input
          type="search"
          className="search-input"
          placeholder={t('common.search')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="result-count">
        {t('common.found')} <strong>{totalVisible}</strong> / {index.length}
      </div>

      {totalVisible === 0 ? (
        <div className="empty-state">
          <p>{t('common.noResults')}</p>
        </div>
      ) : (
        <>
          {orderedVendors.map((v) => {
            const skills = grouped[v.id]
            if (!skills || skills.length === 0) return null
            const vLabel = lang === 'en' ? v.labelEn : v.label
            const vDesc = lang === 'en' ? v.descEn : v.desc
            return (
              <div key={v.id} className="category-block">
            <div className="category-header">
              <h3>
                <span className="category-icon">{v.emoji}</span>
                {vLabel}
                <span className="vendor-count">{skills.length}</span>
                <a
                  className="vendor-repo-link"
                  href={`https://github.com/${v.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/{v.repo}
                </a>
              </h3>
              <p className="category-desc">{vDesc}</p>
            </div>
            <table className="skill-table">
              <thead>
                <tr>
                  <th>{t('officialSkills.thName')}</th>
                  <th>{t('officialSkills.thDesc')}</th>
                  <th className="num-col">{t('officialSkills.thFiles')}</th>
                  <th className="num-col">{t('officialSkills.thSize')}</th>
                  <th>{t('officialSkills.tableHeaderView')}</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill) => (
                  <tr key={`${skill.vendor}/${skill.name}`}>
                    <td>
                      <Link
                        href={`/official-skills/${skill.vendor}/${skill.name}`}
                        className="skill-table-name"
                      >
                        {skill.name}
                      </Link>
                    </td>
                    <td className="skill-table-desc">
                      {(() => {
                        const desc = lang === 'en'
                          ? skill.description
                          : (skill.descriptionZh || skill.description)
                        return desc.length > 120 ? desc.slice(0, 120) + '…' : desc
                      })()}
                    </td>
                    <td className="num-col">{skill.fileCount}</td>
                    <td className="num-col">{formatSize(skill.totalSize)}</td>
                    <td className="num-col">
                      <Link
                        href={`/official-skills/${skill.vendor}/${skill.name}`}
                        className="skill-table-link"
                      >
                        →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      })}
    </>
  )}
  </div>
  )
}