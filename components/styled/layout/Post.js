import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { motion } from "framer-motion";
import { elevation } from "../utilities";
import { useInView } from "react-intersection-observer";

const StyledPost = styled.div`
  height: 400px;
  margin: 0rem 1rem 1rem 1rem;
  position: relative;
  ${elevation[2]};

  .imageOverlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      to right,
      rgba(2, 10, 18, 0.7),
      rgba(2, 10, 18, 0.4)
    );
  }

  .hoverOverlay {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    opacity: 0;
    border: 1px solid ${({ theme }) => theme.colors.boxShadow};
    transition: opacity 0.5s;

    :hover {
      opacity: 1;
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
  margin: 0px 15px;

  grid-template-areas:
    "featured"
    "title"
    "description"
    "tags"
    "link";

  grid-template-rows: 0.5fr 1fr 0.5fr 0.5fr 0.5fr;
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
      margin-left: 0px;
    }
  }

  h3 {
    display: flex;
    margin-left: 0px;
  }

  .description {
    grid-area: description;
    align-self: end;
    overflow: hidden;
    justify-self: baseline;
  }

  .tags {
    grid-area: tags;
    display: flex;
    align-self: end;

    span {
      color: ${({ theme }) => theme.colors.background};
      backdrop-filter: blur(4px);
      background: rgba(255, 255, 255, 0.4);
      margin: 3px 3px 0px 0px;
      border-radius: 2px;
      padding: 3px 10px;
    }
  }

  .featured {
    grid-area: featured;
    display: flex;
    align-self: end;

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
    grid-area: link;
    align-self: end;
    justify-self: baseline;
    border-radius: 2px;
    display: flex;
    background: ${({ theme }) => theme.colors.button};
    color: ${({ theme }) => theme.colors.headline};

    span {
      margin: 0px 3px 0px 0px;
      border-radius: 2px;
      padding: 5px 10px;
    }
  }
`;

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      duration: 0.2,
    },
  },
};

const titleVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "easeIn" },
};

export const Post = ({ post }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-150px 0px",
  });

  const {
    link,
    module: { meta },
  } = post;

  return (
    <Link href={"/thoughts" + link}>
      <motion.div
        ref={ref}
        key={Math.random()}
        variants={variants}
        initial='initial'
        animate={inView ? "animate" : "initial"}
      >
        <StyledPost style={{ cursor: "pointer" }}>
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
                  <span key={`tag-${i}`} className='tag'>
                    {tag}
                  </span>
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
