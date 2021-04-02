import { motion } from "framer-motion"

export const HeadPost = ({ meta, variants }) => (
  <div>
    <motion.h1 variants={variants}>{meta.title}</motion.h1>
    <motion.div className='details' variants={variants}>
      <p>{meta.description}</p>
      <span>{meta.date}</span>
    </motion.div>
  </div>
)
