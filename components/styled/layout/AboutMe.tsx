// @ts-nocheck
import React from "react"
import styled from "styled-components"
import Link from "next/link"
import { LinkedinSquare, Github } from "@styled-icons/boxicons-logos"
import { SectionHeader } from "../element/SectionHeader"
import Tech from "./Tech"
import { elevation } from "../utilities"
import StyledExternalLink from "../element/StyledExternalLink"
import SectionTitle from "../element/SectionTitle"
import Headshot from "./headshot/Headshot"
import dynamic from "next/dynamic"

type aboutProps = {
  className?: string
}

const DynamicHeadshot = dynamic(() => import("./headshot/Headshot"), {
  ssr: false,
})

const AboutMe = ({ className }: aboutProps) => {
  return (
    <>
      <SectionHeader className='title' id='about'>
        <SectionTitle>
          <h1>About me</h1>
        </SectionTitle>
        <SectionHeader.Subtitle>
          The tools and technologies I use
        </SectionHeader.Subtitle>
      </SectionHeader>
      <div className={className}>
        <div className='imgWrapper'>
          <DynamicHeadshot />
        </div>
        <div className='grid'>
          <div className='hero'>
            <div>
              <h1>Owen King</h1>
              <p>I analyse, visualise and model data using modern tech</p>
            </div>
            <ul>
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
          </div>
          <div className='bio'>
            <div>
              <h2>Hi, I'm Owen</h2>
              <p>
                I'm a quantitative researcher at{" "}
                <StyledExternalLink href='https://www.jll.com'>
                  JLL
                </StyledExternalLink>
                , based in London. In my professional work, I apply skills in
                data visualisation, geospatial analysis, automation and machine
                learning to generate insights, automate processes and create new
                products.
              </p>
            </div>
            <p>
              This site is a collection of my personal projects, with a focus on
              data analysis, visualisation and web development.
            </p>
            <Tech />
          </div>
        </div>
      </div>
    </>
  )
}

export default styled(AboutMe)`
  padding-top: 2rem;

  .grid {
    display: grid;
    grid-template-areas: "hero bio";
    grid-template-columns: 1fr 2fr;
    grid-gap: 50px 6.66667%;
    margin: 50px 0px;

    @media screen and (max-width: 767px) {
      grid-template-areas: "hero" "bio";
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      grid-gap: 20px;
    }
  }

  .imgWrapper {
    width: 100%;
    height: 80vh;
  }

  .hero {
    grid-area: hero;
    display: flex;
    flex-direction: column;
    place-items: center;
    text-align: center;
    padding: 20px 50px 20px 50px;

    p {
      color: ${({ theme }) => theme.colors.paragraph};
      margin-top: 2px;
      font-size: 1.4rem;
    }

    ul {
      padding: 0px;
      list-style: none;
      display: flex;

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
  }

  .tech {
    grid-area: tech;
    padding: 0px 50px;
  }

  .bio {
    padding: 0px 50px;
    grid-area: bio;

    h3 {
      margin-top: 0px;
    }
  }
`
