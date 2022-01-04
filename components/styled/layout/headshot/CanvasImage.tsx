//@ts-nocheck
import { useMemo } from "react"
import Material from "./Material"
import { useTexture } from "@react-three/drei"

const CanvasImage = () => {
  const texture = useTexture("headshot.png")
  const { width, height } = texture.image

  const numPoints = width * height
  const threshold = 50

  //_ vertices and index for the square shape
  const vertices = useMemo(
    () =>
      new Float32Array([
        -0.5, 0.5, 0.0, 0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0,
      ]),
    []
  )

  const index = useMemo(() => new Uint16Array([0, 2, 1, 2, 3, 1]), [])

  const { originalColors, numVisible } = useMemo(() => {
    let numVisible = 0
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    canvas.width = width
    canvas.height = height

    ctx.scale(1, -1)
    ctx.drawImage(texture.image, 0, 0, width, height * -1)

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const originalColors = Float32Array.from(data)

    for (let i = 0; i < numPoints; i++) {
      if (originalColors[i * 4 + 0] >= threshold) numVisible++
    }

    return { originalColors, numVisible }
  }, [numPoints, texture, width, height])

  //_ positions, indexes and UV coords for each pixel / shape
  const { offsets, indices } = useMemo(() => {
    const offsets = new Float32Array(numVisible * 3)
    const indices = new Uint16Array(numVisible)

    for (let i = 0, j = 0; i < numPoints; i++) {
      if (originalColors[i * 4 + 0] >= threshold) {
        offsets[j * 3 + 0] = i % width
        offsets[j * 3 + 1] = Math.floor(i / width)
        offsets[j * 3 + 2] = 0
        indices[j] = i
        j++
      }
    }

    return { offsets, indices }
  }, [numVisible, numPoints, width, originalColors])

  return (
    <instancedMesh
      position={[-width / 2, -width / 2, 0]}
      args={[null, null, numVisible]}
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
        <instancedBufferAttribute
          attachObject={["attributes", "offset"]}
          args={[offsets, 3]}
        />
        <instancedBufferAttribute
          attachObject={["attributes", "pindex"]}
          args={[indices, 1]}
        />
      </bufferGeometry>
      <Material texture={texture} />
    </instancedMesh>
  )
}

export default CanvasImage
