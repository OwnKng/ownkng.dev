import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import styled from "styled-components"

const BlogImage = ({ className, src, width = 800, height = 465 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-100px 0px",
  })

  const variants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className={className}
      ref={ref}
      variants={variants}
      initial='initial'
      animate={inView ? "animate" : "initial"}
    >
      <Image
        alt='card-background-image'
        src={src}
        layout='responsive'
        objectFit='fill'
        width={width}
        height={height}
        priority={true}
      />
    </motion.div>
  )
}

export default styled(BlogImage)`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6), 0 1px 6px 0px rgba(0, 0, 0, 0.3);
`
