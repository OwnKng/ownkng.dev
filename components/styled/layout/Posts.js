import { useState, useEffect } from "react";
import { Post } from "./Post";
import { posts } from "../../../getAllPosts";
import { SectionHeader } from "../element/SectionHeader";
import styled from "styled-components";
import Form from "./Form";
import { motion } from "framer-motion";
import { PostWrapper } from "../element/PostWrapper";

const ArticleWrapper = styled(motion.div)``;

const variants = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const Posts = () => {
  const [active, setActive] = useState(false);
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
    <>
      <SectionHeader>
        <SectionHeader.Title>Thoughts</SectionHeader.Title>
        <SectionHeader.Subtitle>
          Articles and how-to's from some of my personal projects
        </SectionHeader.Subtitle>
      </SectionHeader>
      <Form tags={[...new Set(tags)]} active={active} setActive={setActive} />
      <ArticleWrapper>
        {filteredPosts
          ? filteredPosts.map((post) => (
              <PostWrapper>
                <motion.div
                  key={Math.random()}
                  variants={variants}
                  initial='initial'
                  animate='animate'
                >
                  <Post post={post} />
                </motion.div>
              </PostWrapper>
            ))
          : null}
      </ArticleWrapper>
    </>
  );
};

export default Posts;
