import React from "react";
import styled from "styled-components";
import Image from "next/image";
import img from "../../../public/bio.png";
import Link from "next/link";
import { LinkedinSquare, Github } from "@styled-icons/boxicons-logos";
import { SectionHeader } from "../element/SectionHeader";
import Tech from "./Tech";

const AboutMe = ({ className }) => {
  return (
    <div className={className} id='about'>
      <SectionHeader className='title'>
        <SectionHeader.Title>About me</SectionHeader.Title>
        <SectionHeader.Subtitle>
          The tools and technologies I use
        </SectionHeader.Subtitle>
      </SectionHeader>
      <div className='hero'>
        <div className='imgWrapper'>
          <Image src={img} layout='fill' objectFit='cover' />
        </div>
        <div>
          <h1>Owen King</h1>
          <p>I analyse, visualise and model data using modern tech</p>
        </div>
        <ul>
          <li>
            <Link href='/'>
              <a>
                <LinkedinSquare size={40} />
              </a>
            </Link>
          </li>
          <li>
            <Link href=''>
              <a>
                <Github size={40} />
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div className='bio'>
        <div>
          <h3>Hi, I'm Owen</h3>
          <p>
            I'm a quantitative researcher in the property sector, based in
            London. In my professional work, I apply skills in data
            visualisation, geospatial analysis, automation and machine learning
            to generate insights, automate processes and create new products.
          </p>
        </div>
        <p>
          This site is a collection of my personal projects, mainly written in
          R. My R code makes extensive use of the Tidyverse, ggplot and R Shiny.
          I also have experience in package development and apply the principals
          of functional programming across my work.
        </p>
      </div>
      <div className='tech'>
        <Tech />
      </div>
    </div>
  );
};

export default styled(AboutMe)`
  display: grid;
  grid-template-areas:
    "title title"
    "hero bio"
    "hero tech";
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr auto auto;
  grid-gap: 50px 6.66667%;

  @media screen and (max-width: 767px) {
    grid-template-areas: "title" "hero" "bio" "tech";
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    grid-gap: 20px;
  }

  .title {
    grid-area: title;
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

  .imgWrapper {
    position: relative;
    width: 200px;
    height: 200px;

    img {
      border-radius: 50%;
    }
  }

  .bio {
    padding: 0px 50px;
    grid-area: bio;

    h3 {
      margin-top: 0px;
    }
  }
`;
