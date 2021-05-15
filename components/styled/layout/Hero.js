import { Suspense, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import * as THREE from "three"
import styled from "styled-components"
import { DownArrowAlt } from "@styled-icons/boxicons-regular/DownArrowAlt"
import { motion } from "framer-motion"
import Points from "./Points"

const divVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.4,
    },
  },
}

const titleVariants = {
  initial: { y: 100 },
  animate: { y: 0 },
  transition: { type: "easeIn" },
}

const scrollVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { type: "easeIn" },
}

const StyledNameCard = styled(motion.div)`
    position: absolute;
    top: 40%;
    width: 100%;
    z-index: 1;

    h1 {
        margin: 0px 10%;
        max-width: 1200px;
        font-size: 4rem;
      }

      h2 {
        margin: 10px 10%;
        max-width: 1200px;
        font-size: 2rem;
        color:  ${({ theme }) => theme.colors.paragraph};
        font-family: 'Saira', sans-serif;
      }

    .title {
      background: rgba(8, 18, 28, 0.8);
      backdrop-filter: blur(4px);
      overflow: hidden;
    }

    .subtitle {
      overflow: hidden;
      margin-top: 10px;
      background: rgba(8, 18, 28, 0.8);
      backdrop-filter: blur(4px);
    }

    @media only screen and (max-width: 600px) {
      h1, h2 {
        margin: 10px 5%;
      }
    }
  }`

const NameCard = () => (
  <StyledNameCard>
    <div className='title'>
      <motion.h1 variants={titleVariants} transition='transition'>
        OWEN KING
      </motion.h1>
    </div>
    <div className='subtitle'>
      <motion.h2 variants={titleVariants} transition='transition'>
        I analyse, visualise and model data using modern tech
      </motion.h2>
    </div>
  </StyledNameCard>
)

const Hero = ({ className }) => {
  const scroll = useRef(0)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      scroll.current = window.scrollY
    })
  })

  return (
    <motion.div
      className={className}
      variants={divVariants}
      initial='initial'
      animate='animate'
    >
      <NameCard />
      <Canvas
        camera={{ fov: 75, position: [6, 1, 6] }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NoToneMapping
        }}
      >
        <Suspense fallback={null}>
          <color attach='background' args={["#08121C"]} />
          <Points scroll={scroll} />
        </Suspense>
      </Canvas>
      <div></div>
      <motion.div
        className='scrollPrompt'
        variants={scrollVariants}
        initial='initial'
        animate='animate'
      >
        <DownArrowAlt size={50} color={"#a7a9be"} />
        <DownArrowAlt size={50} color={"#a7a9be"} />
      </motion.div>
    </motion.div>
  )
}

export default styled(Hero)`
  height: 80vh;
  width: 100%;
  position: relative;

  .scrollPrompt {
    align-items: top;
    width: 100%;
    height: 9vh;
    display: flex;
    color: white;
    justify-content: space-between;
  }
`
