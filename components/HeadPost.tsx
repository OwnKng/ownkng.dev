import { motion } from "framer-motion"
import ViewCounter from "./ViewCounter"

export const HeadPost = ({ meta, variants }: any) => (
  <div>
    <motion.h1 variants={variants}>{meta.title}</motion.h1>
    <motion.div className='details' variants={variants}>
      <p>{meta.description}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{meta.date}</span>
        <ViewCounter title={meta.title} />
      </div>
    </motion.div>
  </div>
)
