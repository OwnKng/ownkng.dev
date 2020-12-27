import { Post } from "../components/Post";
import { posts } from "../getAllPosts";
import { SectionTitle } from "../components/styled/element/SectionTitle";
import Bio from "../components/styled/layout/Bio";
import Hero from '../components/styled/layout/Hero';
import styled from "styled-components";

const ArticleWrapper = styled.div`
  li:nth-child(even) {
    direction: rtl;
  }
`;

export default function IndexPage() {
  return (
    <>
    <Hero />
      <SectionTitle>Thoughts</SectionTitle>
      <p style={{ textAlign: "center", padding: "0px", margin: "0px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </p>
      <ArticleWrapper>
        {posts.map((post) => (
          <Post key={post.link} post={post} />
        ))}
      </ArticleWrapper>
      <Bio />
    </>
  );
}
