import { HeadPost } from "./HeadPost";
import { BlogHead } from "./styled/element/BlogHead";
import { Article } from "./styled/element/Article";

export default function BlogPost({ children, meta }) {
  return (
    <>
      <BlogHead>
        <HeadPost meta={meta} isBlogPost />
      </BlogHead>
      <Article>{children}</Article>
    </>
  );
}
