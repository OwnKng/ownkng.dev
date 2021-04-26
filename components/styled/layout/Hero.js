import { Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { useFrame, useLoader } from "@react-three/fiber"
import * as THREE from "three"
import styled from "styled-components"
import { DownArrowAlt } from "@styled-icons/boxicons-regular/DownArrowAlt"
import { motion } from "framer-motion"

const generateParticles = (width, length) => {
  const numPoints = width * length

  const positions = new Float32Array(numPoints * 3)
  const colors = new Float32Array(numPoints * 3)

  const colorHigh = new THREE.Color("#4DE7DA")
  const colorLow = new THREE.Color("#5B7FE9")

  let k = 0

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < length; j++) {
      const u = i / width
      const v = j / length

      const x = u - 0.5
      const y = (Math.sin(u * Math.PI * 10) + Math.sin(v * Math.PI * 6)) / 20
      const z = v - 0.5

      positions[3 * k] = x
      positions[3 * k + 1] = y
      positions[3 * k + 2] = z

      //* Color
      const mixedColor = colorHigh.clone()
      mixedColor.lerp(colorLow, u)

      colors[k * 3 + 0] = mixedColor.r
      colors[k * 3 + 1] = mixedColor.g
      colors[k * 3 + 2] = mixedColor.b

      k++
    }
  }

  return { positions, colors }
}

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

const Points = () => {
  const mesh = useRef()
  const [particleTexture] = useLoader(THREE.TextureLoader, ["particle.png"])

  const { positions, colors } = generateParticles(200, 200)

  useFrame(({ clock, camera, mouse }) => {
    camera.position.y = mouse.y + 1.5
    camera.position.z = mouse.x
    camera.lookAt(mesh.current.position)
    mesh.current.rotation.y = clock.elapsedTime / 10
  })

  return (
    <points ref={mesh} scale={[20, 10, 20]}>
      <bufferGeometry attach='geometry'>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={["attributes", "color"]}
          count={colors.length}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach='material'
        size={0.1}
        vertexColors={true}
        transparent
        alphaTest={0.001}
        alphaMap={particleTexture}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
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

const Hero = ({ className }) => (
  <motion.div
    className={className}
    variants={divVariants}
    initial='initial'
    animate='animate'
  >
    <NameCard />
    <Canvas
      camera={{ fov: 75, position: [6, 0, 6] }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NoToneMapping
      }}
    >
      <Suspense fallback={null}>
        <color attach='background' args={["#08121C"]} />
        <Points />
      </Suspense>
    </Canvas>
    <div></div>
    <motion.div className='scrollPrompt'>
      <DownArrowAlt size={50} color={"#a7a9be"} />
      <DownArrowAlt size={50} color={"#a7a9be"} />
    </motion.div>
  </motion.div>
)

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
