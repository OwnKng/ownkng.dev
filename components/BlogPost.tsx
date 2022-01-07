import { motion } from "framer-motion"
import styled from "styled-components"
import ArticleHead from "./ArticleHead"
import { BlogHead } from "./styled/element/BlogHead"
import { Article } from "./styled/element/Article"
import Layout from "./Layout"
import Tag from "./styled/element/Tag"
import NameCard from "./styled/element/NameCard"

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
  tags: any[]
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
        <ArticleHead meta={meta} variants={titleVariants} />
      </BlogHead>
      <Article variants={articleVariants}>{children}</Article>
      <div className='tags'>
        {meta.tags && meta.tags.map((tag) => <Tag key={tag} tag={tag} />)}
      </div>
      <NameCard />
    </motion.div>
  </Layout>
)

export default styled(BlogPost)`
  max-width: 800px;
  margin: 0px auto;

  .tags {
    display: flex;
    justify-content: space-around;
  }
`
