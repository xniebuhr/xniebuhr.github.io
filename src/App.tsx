import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { Navbar } from './components/Navbar'
import { ProjectsSection } from './components/ProjectsSection'
import { ExperienceSection } from './components/ExperienceSection'
import { SkillsSection } from './components/SkillsSection'
import { SocialFooter } from './components/SocialFooter'
import { LandingIntro } from './components/LandingIntro'
import { AmbientOrbs } from './components/AmbientOrbs'
import { DraggableOrbs } from './components/DraggableOrbs'

function App() {
  return (
    <>
      <AmbientOrbs />
      <DraggableOrbs />
      <LandingIntro />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <main className="mx-auto w-[min(1100px,95%)] space-y-32 pb-24">
          <AboutSection />
          <ProjectsSection />
          <ExperienceSection />
          <SkillsSection />
          <SocialFooter />
        </main>
      </div>
    </>
  )
}

export default App
