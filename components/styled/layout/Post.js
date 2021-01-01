import { useState } from "react";
import Link from "next/link";
import { Card } from "../element/Card";
import Image from "next/image";
import styled from "styled-components";
import { motion } from "framer-motion";

const StyledPost = styled.div`
  height: 400px;
  margin: 0rem 1rem 1rem 1rem;
  position: relative;

  .imageOverlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.background};
    opacity: 0.3;
  }

  .hoverOverlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(255, 255, 255);
    opacity: 0;
    transition: opacity 0.25s ease-in-out;

    :hover {
      opacity: 0.1;
    }
  }

  @media only screen and (max-width: 500px) {
    height: 300px;
  }
`;

const StyledContent = styled.div`
  position: absolute;
  width: 95%;
  height: 90%;
  display: grid;
  margin: 0px 5px;

  grid-template-areas:
    "featured"
    "title"
    "description"
    "tags"
    "link";

  grid-template-rows: 0.5fr 1fr 0.5fr 0.5fr;
  grid-template-columns: 1fr;

  h2,
  h3,
  span {
    margin: 10px;
  }

  .title {
    grid-area: title;
    display: flex;
    align-self: start;
    overflow: hidden;

    h2 {
      font-size: 2.1rem;
    }
  }

  .description {
    grid-area: description;
    align-self: end;
    overflow: hidden;
  }

  .tags {
    grid-area: tags;
    display: flex;
    align-self: end;
    margin-left: 10px;
  }

  .featured {
    grid-area: featured;
    display: flex;
    align-self: end;
    margin-left: 10px;

    span {
      color: ${({ theme }) => theme.colors.background};
      backdrop-filter: blur(4px);
      background: rgba(255, 255, 255, 1);
      margin: 3px 3px 0px 0px;
      border-radius: 2px;
      padding: 3px 5px;
    }
  }

  .link {
    margin-left: 10px;
    grid-area: link;
    align-self: center;
    justify-self: baseline;
    border-radius: 2px;
    padding: 3px 5px;
    background: ${({ theme }) => theme.colors.tertiary};
    color: ${({ theme }) => theme.colors.headline};
  }
`;

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
      duration: 0.2,
    },
  },
};

const titleVariants = {
  initial: { y: 100 },
  animate: { y: 0 },
  transition: { type: "easeIn" },
};

export const Post = ({ post }) => {
  const {
    link,
    module: { meta },
  } = post;

  return (
    <Link href={"/thoughts" + link}>
      <motion.div
        key={Math.random()}
        variants={variants}
        initial='initial'
        animate='animate'
      >
        <StyledPost>
          <Image src={meta.img} layout='fill' objectFit='fill' />
          <div className='imageOverlay' />
          <StyledContent>
            <div className='title'>
              <motion.h2 variants={titleVariants} transition='transition'>
                {meta.title}
              </motion.h2>
            </div>
            <div className='description'>
              <motion.h3 variants={titleVariants} transition='transition'>
                {meta.description}
              </motion.h3>
            </div>
            <div className='tags'>
              {meta.tags
                .filter((tag) => tag !== "Featured")
                .map((tag, i) => (
                  <Card.Tag key={`tag-${i}`}>{tag}</Card.Tag>
                ))}
            </div>
            <div className='featured'>
              {meta.tags.includes("Featured") && <span>Featured</span>}
            </div>
            <div className='link'>
              <span>Read more &rarr;</span>
            </div>
          </StyledContent>
          <div className='hoverOverlay' />
        </StyledPost>
      </motion.div>
    </Link>
  );
};
