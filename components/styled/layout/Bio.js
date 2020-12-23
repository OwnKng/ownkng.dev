import React from "react";
import styled from "styled-components";
import Image from "next/image";
import img from "../../../public/bio.png";
import { theme } from "../utilities";
import Link from "next/link";
import { LinkedinSquare, Github } from "@styled-icons/boxicons-logos";

const Bio = ({ className }) => {
  return (
    <div className={className}>
      <div className='hero'>
        <div className='imgWrapper'>
          <Image src={img} layout='fill' objectFit='cover' />
        </div>
        <div>
          <h1>Owen King</h1>
          <p>Hobbyist statistician and developer</p>
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
    </div>
  );
};

export default styled(Bio)`
  display: grid;
  grid-template-areas: "hero bio";
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  padding-bottom: 70px;
  grid-gap: 100px 6.66667%;

  @media screen and (max-width: 767px) {
    grid-template-areas: "hero" "bio";
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    grid-gap: 20px;
  }

  .hero {
    grid-area: hero;
    display: flex;
    flex-direction: column;
    place-items: center;
    text-align: center;

    h1 {
      margin-bottom: 0px;
    }

    p {
      color: ${({ theme }) => theme.colors.paragraph};
      margin-top: 2px;
      font-size: 1.4rem;
    }
  }

  ul {
    list-style: none;
    display: flex;

    li {
      padding: 0rem 0.5rem;
      color: ${({ theme }) => theme.colors.stroke};
    }

    svg {
      fill: ${({ theme }) => theme.colors.stroke};
    }
  }

  a:visited {
    color: ${({ theme }) => theme.colors.stroke};
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
    grid-area: bio;

    h3 {
      margin-top: 0px;
    }
  }
`;
