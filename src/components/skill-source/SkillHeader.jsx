'use client'

import { useI18n } from '@/i18n/I18nContext'

export default function SkillHeader({ skill, vendorInfo, fileCount }) {
  const { t, lang } = useI18n()
  const desc = lang === 'en' ? skill.description : (skill.descriptionZh || skill.description)
  const vendorLabel = lang === 'en'
    ? (vendorInfo?.labelEn || vendorInfo?.label)
    : vendorInfo?.label
  return (
    <div className="section-header">
      <div className="section-tag">
        {vendorLabel} · {fileCount} {t('skillSource.filesUnit')} ·{' '}
        <a
          href={`https://github.com/${skill.repo}/tree/main/skills/${skill.name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/{skill.repo}
        </a>
      </div>
      <h2>{skill.name}</h2>
      <p className="section-desc">{desc}</p>
    </div>
  )
}