import { HeadPost } from "./HeadPost";
import { BlogHead } from "./styled/element/BlogHead";
import { Article } from "./styled/element/Article";

const BlogPost = ({ children, meta }) => (
  <>
    <BlogHead>
      <HeadPost meta={meta} isBlogPost />
    </BlogHead>
    <Article>{children}</Article>
  </>
);

export default BlogPost;
