'use client'

import Link from 'next/link'
import { useI18n } from '@/i18n/I18nContext'

export default function BreadcrumbBack({ vendorLabel, vendorEmoji }) {
  const { t } = useI18n()
  return (
    <div className="breadcrumb">
      <Link href="/official-skills">{t('breadcrumb.backToOfficial')}</Link>
      {' · '}
      <span className="muted">{vendorEmoji} {vendorLabel}</span>
    </div>
  )
}