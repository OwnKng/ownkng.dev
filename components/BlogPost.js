import { HeadPost } from "./HeadPost";
import { BlogHead } from "./styled/element/BlogHead";
import { Article } from "./styled/element/Article";

const variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const BlogPost = ({ children, meta }) => (
  <>
    <BlogHead>
      <HeadPost meta={meta} isBlogPost />
    </BlogHead>
    <Article variants={variants} initial='initial' animate='animate'>
      {children}
    </Article>
  </>
);

export default BlogPost;
