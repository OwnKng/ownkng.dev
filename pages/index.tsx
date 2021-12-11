import AboutMe from "../components/styled/layout/AboutMe"
import Hero from "../components/styled/layout/Hero/Hero"
import Thoughts from "../components/styled/layout/Thoughts"
import { Main } from "../components/styled/element/Main"

export default function IndexPage() {
  return (
    <>
      <Hero />
      <Main>
        <Thoughts />
        <AboutMe />
      </Main>
    </>
  )
}
