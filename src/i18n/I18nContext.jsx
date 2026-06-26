'use client'

import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react'
import zhDict from './zh.json'
import enDict from './en.json'

const DICTS = { zh: zhDict, en: enDict }
const STORAGE_KEY = 'ai-skill-hub-lang'

const I18nContext = createContext({
  lang: 'zh',
  setLang: () => {},
  t: (k) => k,
  pick: (a, b) => b,
})

function getByPath(obj, path) {
  return path.split('.').reduce((cur, key) => (cur ? cur[key] : undefined), obj)
}

function interpolate(template, vars) {
  if (!vars || typeof template !== 'string') return template
  return template.replace(/\{(\w+)\}/g, (_, name) =>
    vars[name] !== undefined ? String(vars[name]) : `{${name}}`
  )
}

export function I18nProvider({ children, initialLang = 'zh' }) {
  const [lang, setLangState] = useState(initialLang)
  const [hydrated, setHydrated] = useState(false)

  // hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === 'zh' || saved === 'en') setLangState(saved)
    } catch {}
    setHydrated(true)
  }, [])

  // persist on change
  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {}
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN'
  }, [lang, hydrated])

  const t = useCallback(
    (key, vars) => {
      const value =
        getByPath(DICTS[lang], key) ?? getByPath(DICTS.zh, key) ?? key
      return interpolate(value, vars)
    },
    [lang]
  )

  const pick = useCallback(
    (enVal, zhVal) => (lang === 'en' ? enVal : zhVal),
    [lang]
  )

  const value = useMemo(
    () => ({
      lang,
      setLang: setLangState,
      t,
      pick,
    }),
    [lang, t, pick]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}