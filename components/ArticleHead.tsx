import { motion } from "framer-motion"
import ViewCounter from "./ViewCounter"
import styled from "styled-components"

const ArticleHead = ({ meta, variants, className }: any) => {
  console.log(meta)

  return (
    <div className={className}>
      <motion.h1 variants={variants}>{meta.title}</motion.h1>
      <motion.p variants={variants}>{meta.description}</motion.p>
      <motion.div className='details' variants={variants}>
        <div>
          <p>Published</p>
          <span>{meta.date}</span>
        </div>
        <div>
          <p>Views</p>
          <ViewCounter title={meta.title} />
        </div>
      </motion.div>
    </div>
  )
}

export default styled(ArticleHead)`
  h1 {
    font-size: max(4rem, 5vw);
  }

  .details {
    font-size: 0.8rem;

    p {
      margin-bottom: 0px;
      font-size: 1rem;
      font-weight: bold;
      color: white;
    }
  }

  .tags {
    display: flex;
    flex-direction: column;
  }
`
