import Link from 'next/link'
import officialIndex from '@/data/official-skills/index.json'
import LegacyRedirect from '@/components/skill-source/LegacyRedirect'

export async function generateStaticParams() {
  return officialIndex
    .filter((s) => s.vendor === 'anthropics')
    .map((s) => ({ name: s.name }))
}

export const metadata = { title: '已迁移 | AI Skill Hub' }

export default async function LegacySkillRedirect({ params }) {
  const { name } = await params
  return <LegacyRedirect name={name} kind="skill" />
}