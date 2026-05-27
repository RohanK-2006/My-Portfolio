import { HeroSection } from '@/sections/home/HeroSection'
import { ServicesPreview } from '@/sections/home/ServicesPreview'
import { StatsSection } from '@/sections/home/StatsSection'
import { ProjectsPreview } from '@/sections/home/ProjectsPreview'
import { ProcessSection } from '@/sections/home/ProcessSection'
import { TechStack } from '@/sections/home/TechStack'
import { CTASection } from '@/sections/home/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <StatsSection />
      <ProjectsPreview />
      <ProcessSection />
      <TechStack />
      <CTASection />
    </>
  )
}
