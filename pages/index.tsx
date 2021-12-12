import AboutMe from "../components/styled/layout/AboutMe"
import Hero from "../components/styled/layout/hero/Hero"
import Thoughts from "../components/styled/layout/Thoughts"
import { Main } from "../components/styled/element/Main"
import Layout from "../components/Layout"

export default function IndexPage() {
  return (
    <Layout
      pageTitle='Owen King'
      description='Owen King - I analyse, visualize and model data using modern technology'
    >
      <Hero />
      <Main>
        <Thoughts />
        <AboutMe />
      </Main>
    </Layout>
  )
}
