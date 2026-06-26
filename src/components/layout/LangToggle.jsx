'use client'

import { useI18n } from '@/i18n/I18nContext'

const LANGS = [
  { code: 'zh', label: '中文', flag: '中' },
  { code: 'en', label: 'English', flag: 'EN' },
]

export default function LangToggle() {
  const { lang, setLang } = useI18n()
  const current = LANGS.find((l) => l.code === lang) || LANGS[0]

  return (
    <div className="lang-switcher">
      <select
        className="lang-select"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        aria-label="Language"
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
      <span className="lang-arrow" aria-hidden="true">▾</span>
    </div>
  )
}