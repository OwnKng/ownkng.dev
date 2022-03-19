import { useTexture } from "@react-three/drei"
import { useMemo, useRef } from "react"
import Material from "./Material"
import * as THREE from "three"
import { InstancedMesh } from "three"

const CanvasImage = () => {
  const ref = useRef<InstancedMesh>(null!)
  const texture = useTexture("spritemap.png")

  let { width, height } = texture.image
  const nrows = 2
  const ncols = 4

  width /= ncols
  height /= nrows

  const numPoints = width * height

  //_ vertices and index for the square shape
  const vertices = useMemo(
    () =>
      new Float32Array([
        -0.5, 0.5, 0.0, 0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0,
      ]),
    []
  )

  const uvs = useMemo(
    () => new Float32Array([0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0]),
    []
  )

  const index = useMemo(() => new Uint16Array([0, 2, 1, 2, 3, 1]), [])

  //_ positions, indexes and UV coords for each pixel / shape
  const { offsets, indices, colors } = useMemo(() => {
    const offsets = new Float32Array(numPoints * 3)
    const indices = new Uint16Array(numPoints)
    const colors = new Float32Array(numPoints * 3)

    for (let i = 0; i < numPoints; i++) {
      offsets[i * 3 + 0] = i % width
      offsets[i * 3 + 1] = Math.floor(i / width)
      offsets[i * 3 + 2] = 0
      indices[i] = i

      const { r, g, b } = new THREE.Color(
        ["#5ADBFF", "#006DAA", "#F15152", "#ffffff"][
          Math.floor(Math.random() * 4)
        ]
      )

      colors[i * 3 + 0] = r
      colors[i * 3 + 1] = g
      colors[i * 3 + 2] = b
    }

    return { offsets, indices, colors }
  }, [numPoints, width])

  return (
    <instancedMesh
      ref={ref}
      position={[-width / 2, -width / 2, 0]}
      args={[undefined, undefined, numPoints]}
    >
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          args={[vertices, 3]}
        />
        <bufferAttribute
          attach='index'
          array={index}
          count={index.length}
          itemSize={1}
        />
        <bufferAttribute attachObject={["attributes", "uv"]} args={[uvs, 2]} />
        <instancedBufferAttribute
          attachObject={["attributes", "offset"]}
          args={[offsets, 3]}
        />
        <instancedBufferAttribute
          attachObject={["attributes", "pindex"]}
          args={[indices, 1]}
        />
        <instancedBufferAttribute
          attachObject={["attributes", "pixelColor"]}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <Material texture={texture} nrows={nrows} ncols={ncols} />
    </instancedMesh>
  )
}

export default CanvasImage
