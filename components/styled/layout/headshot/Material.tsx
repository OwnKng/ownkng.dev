import * as THREE from "three"
import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RawShaderMaterial } from "three"
import { vertexShader } from "../../../threejs/imageShaders/vertex"
import { fragmentShader } from "../../../threejs/imageShaders/fragment"
import { fragmentSquares } from "../../../threejs/imageShaders/sqaures/fragment"
import { vertexSquares } from "../../../threejs/imageShaders/sqaures/vertex"

const Material = ({ texture }: any) => {
  const { image } = texture
  const ref = useRef<RawShaderMaterial>(null!)

  const random = Math.random()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uTexture: { value: texture },
      uTextureSize: { value: new THREE.Vector2(image.width, image.height) },
    }),
    [texture, image]
  )

  useFrame(({ clock }) => {
    ref.current.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <rawShaderMaterial
      ref={ref}
      uniforms={uniforms}
      fragmentShader={random > 0.5 ? fragmentSquares : fragmentShader}
      vertexShader={random > 0.5 ? vertexSquares : vertexShader}
      blending={THREE.AdditiveBlending}
    />
  )
}

export default Material
