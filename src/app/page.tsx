import { About } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'
import { Experience } from '@/components/sections/experience'
import { GithubActivity } from '@/components/sections/github-activity'
import { Hero } from '@/components/sections/hero'
import { Projects } from '@/components/sections/projects'
import { Skills } from '@/components/sections/skills'
import { Volunteer } from '@/components/sections/volunteer'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Volunteer />
      <GithubActivity />
      <Contact />
    </>
  )
}
