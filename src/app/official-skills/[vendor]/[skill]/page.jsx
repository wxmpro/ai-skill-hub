import index from '@/data/official-skills/index.json'
import vendors from '@/data/official-skills/vendors.json'
import { notFound } from 'next/navigation'
import SkillDetail from '@/components/skill-source/SkillDetail'
import BreadcrumbBack from '@/components/skill-source/BreadcrumbBack'
import SkillHeader from '@/components/skill-source/SkillHeader'

export async function generateStaticParams() {
  return index.map((s) => ({ vendor: s.vendor, skill: s.name }))
}

export async function generateMetadata({ params }) {
  const { vendor, skill: skillName } = await params
  const skill = index.find((s) => s.vendor === vendor && s.name === skillName)
  if (!skill) return { title: 'Not Found' }
  return {
    title: `${skill.name} (${vendor}) | AI Skill Hub`,
    description: skill.description.slice(0, 160),
  }
}

export default async function SkillPage({ params }) {
  const { vendor, skill: skillName } = await params
  const skill = index.find((s) => s.vendor === vendor && s.name === skillName)
  if (!skill) notFound()
  const vendorInfo = vendors.find((v) => v.id === vendor)

  return (
    <div className="section">
      <BreadcrumbBack vendorLabel={vendorInfo?.label} vendorEmoji={vendorInfo?.emoji} />
      <SkillHeader skill={skill} vendorInfo={vendorInfo} fileCount={skill.fileCount} />
      <SkillDetail skill={skill} vendor={vendor} />
    </div>
  )
}