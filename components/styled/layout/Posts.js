import { Post } from "./Post";
import { posts } from "../../../getAllPosts";
import { SectionTitle } from "../element/SectionTitle";
import styled from "styled-components";

const StyledPosts = styled.div`
  margin-top: 100px;
`;

const ArticleWrapper = styled.div`
  li:nth-child(even) {
    direction: rtl;
  }
`;

const Posts = () => (
  <StyledPosts>
    <SectionTitle>Writing</SectionTitle>
    <p style={{ textAlign: "center", padding: "0px", margin: "0px" }}>
      Articles and how-to's about some of my personal projects
    </p>
    <ArticleWrapper>
      {posts.map((post) => (
        <Post key={post.link} post={post} />
      ))}
    </ArticleWrapper>
  </StyledPosts>
);

export default Posts;
