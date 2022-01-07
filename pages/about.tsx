import Layout from "../components/Layout"
import AboutMe from "../components/styled/layout/AboutMe"
import Tech from "../components/styled/layout/Tech"
import styled from "styled-components"
import { LinkedinSquare, Github } from "@styled-icons/boxicons-logos"
import Link from "next/link"

import dynamic from "next/dynamic"

const DynamicHeadshot = dynamic(
  () => import("../components/styled/layout/headshot/Headshot"),
  {
    ssr: false,
  }
)

const About: any = ({ className }: { className?: string }) => (
  <div className={className}>
    <Layout>
      <div className='art'>
        <DynamicHeadshot />
      </div>
      <main>
        <div className='card'>
          <h1>Owen King</h1>
          <p>I analyse, visualise and model data using modern tech</p>
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
    text-align: center;
  }

  .art {
    top: 0rem;
    left: 0px;
    height: 80vh;
    width: 100vw;
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
    padding: 2rem 0rem;
    margin: 0px auto;
  }
`
