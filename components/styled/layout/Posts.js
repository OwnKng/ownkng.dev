import { useState, useEffect } from "react";
import { Post } from "./Post";
import { posts } from "../../../getAllPosts";
import { SectionHeader } from "../element/SectionHeader";
import Form from "./Form";
import Link from "next/link";
import { PostWrapper } from "../element/PostWrapper";
import styled from "styled-components";

const StyledPosts = styled.div`
  .footer {
    text-align: center;
    border-left: 1px solid ${({ theme }) => theme.colors.boxShadow};
    border-right: 1px solid ${({ theme }) => theme.colors.boxShadow};
    padding: 1rem 0px 1rem 0px;

    @media only screen and (max-width: 1000px) {
      border: none;
    }
  }
  border-bottom: 1px solid ${({ theme }) => theme.colors.boxShadow};

  a {
    color: ${({ theme }) => theme.colors.paragraph};
    font-size: 1.2rem;

    :hover {
      color: ${({ theme }) => theme.colors.tertiary};
    }

    :vistied {
      color: ${({ theme }) => theme.colors.stroke};
    }
  }
`;

const StyledWrapper = styled.div`
  .grid {
    display: grid;
    grid-template-columns: 1fr minmax(auto, 1000px) 1fr;
    grid-template-rows: 1fr;
    grid-auto-flow: rows;

    @media only screen and (max-width: 1000px) {
      grid-template-columns: 0px 100% 0px;
    }
  }

  .wrapper {
    border: 1px solid ${({ theme }) => theme.colors.boxShadow};
    border-top: none;
    width: 100%;
    max-width: 1000px;
    margin: 0px auto;

    @media only screen and (max-width: 1000px) {
      border: none;
      border-bottom: 1px solid ${({ theme }) => theme.colors.boxShadow};
    }
  }
`;

const Posts = ({ className }) => {
  const [active, setActive] = useState("Featured");
  const [filteredPosts, setFiltered] = useState();

  let tags = posts
    .map((mod) => {
      const {
        module: { meta },
      } = mod;
      return meta;
    })
    .map((meta) => meta.tags)
    .flat();

  useEffect(() => {
    let withTag;

    withTag = posts.filter((post) => {
      const {
        module: { meta },
      } = post;
      return meta.tags.includes(active);
    });

    if (!active) withTag = posts;

    setFiltered(withTag);
  }, [active]);

  return (
    <StyledPosts>
      <SectionHeader id='thoughts'>
        <SectionHeader.Title>Thoughts</SectionHeader.Title>
        <SectionHeader.Subtitle>
          Articles and how-to's from some of my personal projects
        </SectionHeader.Subtitle>
      </SectionHeader>
      <Form
        tags={[...new Set(tags)].filter((tag) => tag !== "Featured")}
        active={active}
        setActive={setActive}
      />
      <StyledWrapper>
        {filteredPosts
          ? filteredPosts.map((post, i) => (
              <div className='grid'>
                <div />
                <PostWrapper key={`post-${i}`} className='wrapper'>
                  <Post post={post} />
                </PostWrapper>
                <div />
              </div>
            ))
          : null}
        <div className='grid'>
          <div />
          <div className='footer'>
            <Link href='/archive'>See all posts &#x2192;</Link>
          </div>
          <div />
        </div>
      </StyledWrapper>
    </StyledPosts>
  );
};

export default Posts;
