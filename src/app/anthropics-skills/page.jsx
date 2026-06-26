import Link from 'next/link'
import LegacyListInner from '@/components/skill-source/LegacyRedirect'

export const metadata = { title: '已迁移 | AI Skill Hub' }

export default function LegacyListRedirect() {
  return (
    <div className="section">
      <LegacyListInner list />
    </div>
  )
}