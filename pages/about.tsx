import Layout from "../components/Layout"
import AboutMe from "../components/styled/layout/AboutMe"
import Tech from "../components/styled/layout/Tech"
import styled from "styled-components"
import { LinkedinSquare, Github } from "@styled-icons/boxicons-logos"
import Link from "next/link"
import Headshot from "../components/styled/layout/headshot/Headshot"

const About: any = ({ className }: { className?: string }) => (
  <div className={className}>
    <Layout
      pageTitle='About Owen King'
      description="Hi, I'm Owen. I'm a quantitative researcher at JLL in London. I apply skills in data visualisation, machine learning and software engineering to generate insights and create new products."
      url='/about'
    >
      <div className='fold'>
        <div className='art'>
          <Headshot />
        </div>
        <div className='card'>
          <h1>Owen King</h1>
          <p>I analyse, visualise and model data using modern tech</p>
        </div>
      </div>
      <ul className='contact'>
        <li>
          <a href='https://www.linkedin.com/in/owenrking/'>
            <LinkedinSquare size={40} />
          </a>
        </li>
        <li>
          <Link href='https://github.com/OwnKng'>
            <a>
              <Github size={40} />
            </a>
          </Link>
        </li>
      </ul>
      <main>
        <AboutMe />
        <Tech />
      </main>
    </Layout>
  </div>
)

export default styled(About)/*css*/ `
  h1 {
    font-size: max(4rem, 4vw);
    margin: 0px;
  }

  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    height: 15%;

    p {
      margin: 0px;
    }
  }

  .art {
    top: 0rem;
    left: 0px;
    height: 85%;
    width: 100vw;
  }

  .fold {
    height: 100vh;
  }

  .contact {
    padding: 0px;
    list-style: none;
    display: flex;
    place-content: center;

    li {
      padding: 0rem 0.5rem;
    }

    svg {
      fill: ${({ theme }) => theme.colors.stroke};

      a:visited {
        color: ${({ theme }) => theme.colors.stroke};
      }
    }
  }

  main {
    max-width: 800px;
    padding: 2rem 0.5rem;
    margin: 0px auto;
  }
`
