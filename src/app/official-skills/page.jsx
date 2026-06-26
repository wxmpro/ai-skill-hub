'use client'

import Link from 'next/link'
import index from '@/data/official-skills/index.json'
import vendors from '@/data/official-skills/vendors.json'
import { useI18n } from '@/i18n/I18nContext'

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + 'M'
  if (bytes >= 1024) return (bytes / 1024).toFixed(0) + 'K'
  return bytes + 'B'
}

export default function OfficialSkillsPage() {
  const { t, lang } = useI18n()

  const grouped = {}
  for (const skill of index) {
    if (!grouped[skill.vendor]) grouped[skill.vendor] = []
    grouped[skill.vendor].push(skill)
  }

  const orderedVendors = vendors.filter((v) => grouped[v.id])

  return (
    <div className="section">
      <div className="section-header">
        <div className="section-tag">{t('officialSkills.tag')}</div>
        <h2>{t('officialSkills.title', { count: index.length })}</h2>
        <p className="section-desc">{t('officialSkills.desc')}</p>
      </div>

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
    </div>
  )
}