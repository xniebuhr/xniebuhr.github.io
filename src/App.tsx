import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { Navbar } from './components/Navbar'
import { ProjectsSection } from './components/ProjectsSection'
import { ExperienceSection } from './components/ExperienceSection'
import { SkillsSection } from './components/SkillsSection'
import { SocialFooter } from './components/SocialFooter'
import { DraggableOrbs } from './components/DraggableOrbs'

function App() {
  return (
    <div className="relative z-10">
      <DraggableOrbs />
      <Navbar />
      <HeroSection />
      <main className="pointer-events-none mx-auto w-[min(1100px,95%)] space-y-32 pb-24">
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <SocialFooter />
      </main>
    </div>
  )
}

export default App
