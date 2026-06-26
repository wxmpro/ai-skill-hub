'use client'

import sections from '@/data/learn/sections.json'
import { useI18n } from '@/i18n/I18nContext'

export default function LearnPage() {
  const { t, lang } = useI18n()
  return (
    <div className="section">
      <div className="section-header">
        <div className="section-tag">{t('learn.tag')}</div>
        <h2>{t('learn.title')}</h2>
        <p className="section-desc">
          {lang === 'en'
            ? 'From the SKILL.md spec to templates and anti-patterns — a hands-on guide to writing quality skills. Each section cites its source, so feel free to reference them.'
            : '从 SKILL.md 规范到模板与反例，手把手教你写出优质 skill。每个章节都标注了来源，可放心引用。'}
        </p>
      </div>

      {sections.map((s, idx) => (
        <div key={idx} className="example-card">
          <div className="example-header">
            <div className="example-avatar">{idx + 1}</div>
            <div>
              <div className="example-title">
                {lang === 'en' ? s.title : s.titleZh}
              </div>
              <div className="example-subtitle">
                {lang === 'en' ? 'Source: ' : '来源：'}
                {lang === 'en' ? s.source : s.sourceZh}
              </div>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: 12 }}>
            {lang === 'en' ? s.body : s.bodyZh}
          </p>
        </div>
      ))}
    </div>
  )
}