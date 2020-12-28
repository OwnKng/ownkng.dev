import { Post } from "./Post";
import { posts } from "../../../getAllPosts";
import { SectionHeader } from "../element/SectionHeader";
import styled from "styled-components";

const ArticleWrapper = styled.div`
  li:nth-child(even) {
    direction: rtl;
  }
`;

const Posts = () => (
  <>
    <SectionHeader>
      <SectionHeader.Title>Thoughts</SectionHeader.Title>
      <SectionHeader.Subtitle>
        Articles and how-to's about some of my personal projects
      </SectionHeader.Subtitle>
    </SectionHeader>
    <ArticleWrapper>
      {posts.map((post) => (
        <Post key={post.link} post={post} />
      ))}
    </ArticleWrapper>
  </>
);

export default Posts;
