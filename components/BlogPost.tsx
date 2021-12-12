import { motion } from "framer-motion"
import styled from "styled-components"
import { HeadPost } from "./HeadPost"
import { BlogHead } from "./styled/element/BlogHead"
import { Article } from "./styled/element/Article"
import Layout from "./Layout"

const variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const titleVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  transition: { type: "easeIn" },
}

const articleVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
}

type blogMeta = {
  title: string
  description: string
  date: string
  img: string
  url: string
}

type blogPostProps = {
  className: string
  children: any
  meta: blogMeta
}

const BlogPost = ({ className, children, meta }: blogPostProps) => (
  <Layout
    pageTitle={meta.title}
    description={meta.description}
    image={meta.img}
    url={meta.url}
  >
    <motion.div
      className={className}
      variants={variants}
      initial='initial'
      animate='animate'
    >
      <BlogHead>
        <HeadPost meta={meta} variants={titleVariants} />
      </BlogHead>
      <Article variants={articleVariants}>{children}</Article>
    </motion.div>
  </Layout>
)

export default styled(BlogPost)`
  position: relative;
`
