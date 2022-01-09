import * as THREE from "three"
import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RawShaderMaterial } from "three"
import { vertexShader } from "../../../threejs/imageShaders/vertex"
import { fragmentShader } from "../../../threejs/imageShaders/fragment"
import { fragmentSquares } from "../../../threejs/imageShaders/sqaures/fragment"
import { vertexSquares } from "../../../threejs/imageShaders/sqaures/vertex"
import { stripesFragment } from "../../../threejs/imageShaders/stripes/fragment"
import { stripesVertex } from "../../../threejs/imageShaders/stripes/vertex"

const shaders = [
  { fragmentShader: fragmentShader, vertexShader: vertexShader },
  { fragmentShader: fragmentSquares, vertexShader: vertexSquares },
  { fragmentShader: stripesFragment, vertexShader: stripesVertex },
]

const Material = ({ texture }: any) => {
  const { image } = texture

  const ref = useRef<RawShaderMaterial>(null!)

  const shader = shaders[Math.floor(Math.random() * 3)]

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
      {...shader}
      transparent={true}
    />
  )
}

export default Material
