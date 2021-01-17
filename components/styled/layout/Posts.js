import { Post } from "./Post";
import { PostWrapper } from "../element/PostWrapper";
import styled from "styled-components";

const Posts = ({ className, posts }) => {
  return (
    <div className={className}>
      {posts
        ? posts.map((post, i) => (
            <div className='grid' key={`post-${i}`}>
              <div />
              <PostWrapper className='wrapper'>
                <Post post={post} />
              </PostWrapper>
              <div />
            </div>
          ))
        : null}
    </div>
  );
};

export default styled(Posts)`
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
