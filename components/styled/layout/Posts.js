import Post from "./Post"
import { PostWrapper } from "../element/PostWrapper"
import styled from "styled-components"

const Posts = ({ className, posts }) => {
  return (
    <div className={className}>
      <ul>
        {posts
          ? posts.map((post) => (
              <PostWrapper className='wrapper'>
                <Post post={post} key={post.link} />
              </PostWrapper>
            ))
          : null}
      </ul>
    </div>
  )
}

export default styled(Posts)`
  ul {
    padding: 0px;
  }

  .wrapper {
    border-top: none;
    width: 100%;
    max-width: 1000px;
    margin: 0px auto;

    @media only screen and (max-width: 1000px) {
      border: none;
    }
  }
`
