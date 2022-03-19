import { useMemo, useRef } from "react"
import * as THREE from "three"
import { vertex } from "../../../threejs/shaders/vertex"
import { fragment } from "../../../threejs/shaders/fragment"
import { useFrame } from "@react-three/fiber"
import { ShaderMaterial } from "three"
import useScrollPosition from "../../../hooks/useScrollPosition"

const Material = ({ texture, nrows, ncols }: any) => {
  const ref = useRef<ShaderMaterial>(null!)

  const { scrollPos, height } = useScrollPosition()

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTextureSize: {
        value: new THREE.Vector2(
          texture.image.width / ncols,
          texture.image.height / nrows
        ),
      },
      uTime: { value: 0.0 },
      uNumberColumns: { value: ncols },
      uNumberRows: { value: nrows },
      uScroll: { value: 0 },
    }),
    [texture]
  )

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    ref.current.uniforms.uTime.value = elapsedTime

    ref.current.uniforms.uScroll.value = Math.min(
      scrollPos / (height * 0.25),
      1.0
    )
  })

  return (
    <shaderMaterial
      ref={ref}
      uniforms={uniforms}
      vertexShader={vertex}
      fragmentShader={fragment}
      transparent={true}
      depthWrite={false}
    />
  )
}

export default Material
