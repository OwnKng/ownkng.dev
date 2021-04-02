import { motion } from "framer-motion"

export const HeadPost = ({ meta, variants }) => (
  <div>
    <motion.h1 variants={variants} initial='initial' animate='animate'>
      {meta.title}
    </motion.h1>
    <div className='details'>
      <span>
        <p>{meta.description}</p>
      </span>
      <span>{meta.date}</span>
    </div>
  </div>
)
