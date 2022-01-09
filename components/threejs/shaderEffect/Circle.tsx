import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { NoToneMapping, ShaderMaterial, Vector2 } from "three"
import { vertexShader } from "./glsl/vertexShader"
import { fragmentShader } from "./glsl/fragmentShader"
import styled from "styled-components"

const Circle = () => {
  const mesh = useRef()
  const material = useRef<ShaderMaterial>(null!)

  useFrame(({ clock, mouse }) => {
    material.current.uniforms.uTime.value = clock.elapsedTime

    let mousePos = { x: mouse.x || 0, y: mouse.y || 0 }

    if (mousePos.y > 1) {
      mousePos.y = 1
    }

    if (mousePos.y < -1) {
      mousePos.y = -1
    }

    const mouseAdjusted = new Vector2(
      (mousePos.x + 1) / 2,
      (mousePos.y + 1) / 2
    )

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

const CircleWrapper = ({ className }: { className: string }) => (
  <div className={className}>
    <Canvas
      camera={{ fov: 75, position: [0, 0, 9.5] }}
      onCreated={({ gl }) => {
        gl.toneMapping = NoToneMapping
      }}
    >
      <Suspense fallback={null}>
        <group>
          <color attach='background' args={["#08121C"]} />
          <Circle />
        </group>
      </Suspense>
    </Canvas>
  </div>
)

export default styled(CircleWrapper)`
  width: 100vw;
  position: relative;
  height: 75vh;
  left: calc(-50vw + 50%);
  overflow: hidden;
`
