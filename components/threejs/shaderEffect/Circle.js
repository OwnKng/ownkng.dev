import { useState, useEffect, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { NoToneMapping, Vector2, Math } from "three"
import { vertexShader } from "./glsl/vertexShader"
import { fragmentShader } from "./glsl/fragmentShader"
import styled from "styled-components"
import { useSpring, animated } from "@react-spring/three"

const Circle = ({ scroll }) => {
  const mesh = useRef()
  const material = useRef()

  useFrame(({ clock, camera, mouse }) => {
    material.current.uniforms.uTime.value = clock.elapsedTime
    camera.lookAt(mesh.current.position)

    const mouseAdjusted = new Vector2((mouse.x + 1) / 2, (mouse.y + 1) / 2)

    material.current.uniforms.uBaseCol.value = mouseAdjusted
  })

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[10, 10, 100, 100]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uNoiseDistortion: { value: 2.0 },
          uSpeed: { value: 0.5 },
          uTime: { value: 0 },
          uBaseCol: { value: new Vector2(0, 0) },
        }}
        transparent
      />
    </mesh>
  )
}

const CircleWrapper = ({ className }) => {
  const scroll = useRef(0)

  const props = useSpring({
    to: async (next) => {
      await next({ scale: [1, 1, 1] })
      await next({ scale: [1, 1, 1] })
    },
    from: { scale: [0.4, 0.4, 0.4] },
    config: { duration: 800 },
  })

  useEffect(() => {
    window.addEventListener("scroll", () => {
      scroll.current = window.scrollY
    })
  }, [])

  return (
    <div scroll={scroll} className={className}>
      <Canvas
        camera={{ fov: 75, position: [0, 0, 8] }}
        onCreated={({ gl }) => {
          gl.toneMapping = NoToneMapping
        }}
      >
        <Suspense fallback={null}>
          <animated.group {...props}>
            <color attach='background' args={["#08121C"]} />
            <Circle scroll={scroll} />
          </animated.group>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default styled(CircleWrapper)`
  width: 100vw;
  position: relative;
  height: 70vh;
  left: calc(-50vw + 50%);
  overflow: hidden;
`
