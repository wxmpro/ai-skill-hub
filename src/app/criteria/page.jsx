'use client'

import criteria from '@/data/criteria.json'
import { useI18n } from '@/i18n/I18nContext'

export default function CriteriaPage() {
  const { t, lang } = useI18n()

  // 根据语言选字段
  const items = criteria.map((c) => ({
    name: lang === 'en' ? (c.nameEn || c.name) : c.name,
    weight: c.weight,
    veto: c.veto,
    importance: lang === 'en' ? (c.importanceEn || c.importance) : c.importance,
    source: lang === 'en' ? (c.sourceEn || c.source) : c.source,
    sourceTypeLabel: lang === 'en'
      ? (c.sourceTypeEn || c.sourceType)
      : c.sourceType,
  }))

  return (
    <div className="section">
      <div className="section-header">
        <div className="section-tag">{t('criteria.tag')}</div>
        <h2>{t('criteria.title')}</h2>
        <p className="section-desc">{t('criteria.desc')}</p>
      </div>

      <table className="criteria-table">
        <thead>
          <tr>
            <th>{t('criteria.thDimension')}</th>
            <th>{t('criteria.thWeight')}</th>
            <th>{t('criteria.thWhy')}</th>
            <th>{t('criteria.thSource')}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((c, idx) => (
            <tr key={idx}>
              <td>{c.name}</td>
              <td>
                <div className="weight-stack">
                  <span className="weight">{c.weight}</span>
                  {c.veto && <span className="veto">{t('criteria.veto')}</span>}
                </div>
              </td>
              <td>{c.importance}</td>
              <td>
                {c.source}
                <br />
                <span className="source">
                  {c.sourceTypeLabel === '一手' && t('criteria.sourceFirst')}
                  {c.sourceTypeLabel === '二手' && t('criteria.sourceSecond')}
                  {c.sourceTypeLabel === '一手 + 二手' && t('criteria.sourceBoth')}
                  {c.sourceTypeLabel === 'First-hand' && '📌 ' + c.sourceTypeLabel + ' source'}
                  {c.sourceTypeLabel === 'Second-hand' && '📚 ' + c.sourceTypeLabel + ' source'}
                  {c.sourceTypeLabel === 'First + Second-hand' && '📌 First-hand + 📚 Second-hand'}
                  {!['一手', '二手', '一手 + 二手', 'First-hand', 'Second-hand', 'First + Second-hand'].includes(c.sourceTypeLabel) && c.sourceTypeLabel}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="formula-box">
        <h3>{t('criteria.formulaTitle')}</h3>
        <code>{t('criteria.formulaCode')}</code>
        <p dangerouslySetInnerHTML={{
          __html: t('criteria.formulaNote').replace(
            /「([^」]+)」/g,
            '«$1»'
          ).replace(
            /重要：/g,
            `<strong>${lang === 'en' ? 'Important' : '重要'}：</strong>`
          )
        }} />
      </div>
    </div>
  )
}