import { useState, useEffect } from "react";
import { Post } from "./Post";
import { posts } from "../../../getAllPosts";
import { SectionHeader } from "../element/SectionHeader";
import Form from "./Form";
import { PostWrapper } from "../element/PostWrapper";
import styled from "styled-components";

const StyledPosts = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.boxShadow};
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

const Posts = () => {
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
      </StyledWrapper>
    </StyledPosts>
  );
};

export default Posts;
