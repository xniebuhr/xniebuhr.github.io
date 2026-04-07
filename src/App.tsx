import { CustomCursor } from './components/CustomCursor'
import { HeroSection } from './components/HeroSection'
import { Navbar } from './components/Navbar'
import { ProjectsSection } from './components/ProjectsSection'
import { ExperienceSection } from './components/ExperienceSection'
import { SkillsSection } from './components/SkillsSection'
import { SocialFooter } from './components/SocialFooter'
import { LandingIntro } from './components/LandingIntro'

function App() {
  return (
    <>
      <LandingIntro />
      <CustomCursor />
      <Navbar />
      <main className="mx-auto w-[min(1100px,95%)] pb-16">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <SocialFooter />
      </main>
    </>
  )
}

export default App
