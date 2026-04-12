import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
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
      <Navbar />
      <HeroSection />
      <main className="mx-auto w-[min(1100px,95%)] pb-16">
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <SocialFooter />
      </main>
    </>
  )
}

export default App
