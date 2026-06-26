'use client'

import Link from 'next/link'
import { useI18n } from '@/i18n/I18nContext'

export default function LegacyRedirect({ name, list = false }) {
  const { lang } = useI18n()
  const isEn = lang === 'en'
  if (list) {
    return (
      <div>
        <div className="section-header">
          <h2>{isEn ? 'Page moved' : '页面已迁移'}</h2>
          <p>
            {isEn
              ? 'This page has moved to "Official Skills". Now featuring 65 skills across 4 publishers.'
              : '本页面已迁移到「官方 Skill 仓库」，现在支持 4 个发布方的 65 个 skill。'}
          </p>
        </div>
        <p>
          <Link href="/official-skills/">
            → {isEn ? 'Go to Official Skills' : '前往官方 Skill 仓库'}
          </Link>
        </p>
      </div>
    )
  }
  return (
    <div>
      <div className="section-header">
        <h2>{isEn ? 'Page moved' : '页面已迁移'}</h2>
        <p>
          {isEn
            ? 'This page has moved to "Official Skills".'
            : '本页面已迁移到「官方 Skill 仓库」。'}
        </p>
      </div>
      <p>
        <Link href={`/official-skills/anthropics/${name}`}>
          → {isEn ? `Go to anthropics/${name}` : `前往 anthropics/${name}`}
        </Link>
      </p>
      <p>
        <Link href="/official-skills/">
          ← {isEn ? 'Back to Official Skills list' : '返回官方 Skill 列表'}
        </Link>
      </p>
    </div>
  )
}