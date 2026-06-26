'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import LangToggle from './LangToggle'
import { useI18n } from '@/i18n/I18nContext'

const NAV_KEYS = [
  { key: 'marketplaces', href: '/marketplaces/' },
  { key: 'officialSkills', href: '/official-skills/' },
  { key: 'docs', href: '/docs/' },
  { key: 'criteria', href: '/criteria/' },
  { key: 'examples', href: '/examples/' },
  { key: 'learn', href: '/learn/' },
]

export default function Nav() {
  const pathname = usePathname()
  const { t } = useI18n()
  return (
    <nav className="nav">
      <div className="nav-inner">
        {NAV_KEYS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? 'active' : ''}
            >
              {t(`nav.${item.key}`)}
            </Link>
          )
        })}
        <ThemeToggle />
        <LangToggle />
      </div>
    </nav>
  )
}