import Posts from "../components/styled/layout/Posts";
import { SectionHeader } from "../components/styled/element/SectionHeader";
import { posts } from "../getAllPosts";

export default function Archive() {
  return (
    <>
      <SectionHeader id='thoughts'>
        <SectionHeader.Title>Thoughts</SectionHeader.Title>
        <SectionHeader.Subtitle>
          Articles and how-to's from some of my personal projects
        </SectionHeader.Subtitle>
      </SectionHeader>
      <Posts posts={posts} />
    </>
  );
}
