'use client'

import { useEffect } from 'react'
import { useI18n } from '@/i18n/I18nContext'

const TITLES = {
  zh: 'AI Skill Hub | 发现、评价、学会写优质 skill',
  en: 'AI Skill Hub | Discover, evaluate, and learn to write quality skills',
}

/**
 * 在客户端根据 i18n 状态动态更新 document.title
 * 放在 layout 中即可覆盖所有页面
 */
export default function DocumentTitle() {
  const { lang } = useI18n()
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = TITLES[lang] || TITLES.zh
    }
  }, [lang])
  return null
}