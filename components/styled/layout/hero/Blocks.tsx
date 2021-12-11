//@ts-nocheck
import { useConvexPolyhedron } from "@react-three/cannon"
import { useMemo } from "react"
import * as THREE from "three"
import { Geometry } from "three-stdlib/deprecated/Geometry"
import { useThree } from "@react-three/fiber"
import type { ConvexPolyhedronProps } from "@react-three/cannon"

const toConvexProps = (
  bufferGeometry: THREE.BufferGeometry
): ConvexPolyhedronProps["args"] => {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry)
  geo.mergeVertices()
  return [
    geo.vertices.map((v) => [v.x, v.y, v.z]),
    geo.faces.map((f) => [f.a, f.b, f.c]),
    [],
  ]
}

const Blocks = ({ colorArray }: any) => {
  const size = 0.9
  const number = 40

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(size, 0), [])
  const args = useMemo(() => toConvexProps(geometry), [geometry])
  const { viewport } = useThree()

  const [ref] = useConvexPolyhedron(() => ({
    mass: 0.5,
    args,
    position: [
      (Math.random() - 0.5) * viewport.width,
      1,
      (Math.random() - 0.5) * viewport.height,
    ],
    rotation: [Math.random(), 0, 0],
  }))

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, number]}>
      <icosahedronGeometry args={[size, 0]}>
        <instancedBufferAttribute
          attachObject={["attributes", "color"]}
          args={[colorArray, 3]}
        />
      </icosahedronGeometry>
      <meshPhongMaterial vertexColors={THREE.VertexColors} />
    </instancedMesh>
  )
}

const tempColor = new THREE.Color()

const data = Array.from({ length: 40 }, () => ({
  color: ["#5ADBFF", "#006DAA", "#F15152", "#E4B363", "#41C499"][
    Math.floor(Math.random() * 6)
  ],
  scale: 1,
}))

export default function BlocksWrapper() {
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(40)
          .fill(0)
          .flatMap((_, i) => tempColor.set(data[i].color).toArray())
      ),
    []
  )

  return <Blocks colorArray={colorArray} />
}
