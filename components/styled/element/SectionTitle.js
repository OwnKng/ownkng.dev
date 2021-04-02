import styled from "styled-components"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "easeIn" },
}

const SectionTitle = ({ className, children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-150px 0px",
  })

  return (
    <motion.div
      variants={variants}
      ref={ref}
      initial='initial'
      animate={inView ? "animate" : "initial"}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default styled(SectionTitle)`
  h1 {
    color: ${({ theme }) => theme.colors.headline};
    font-size: 2.7rem;
    padding: 0.5rem 0rem;
    margin: 0px;
    text-transform: uppercase;
    font-family: "Saira", sans-serif;
  }
`
