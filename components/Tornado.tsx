// @ts-nocheck
import { shaderMaterial } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"
import { InstancedMesh } from "three"
import fragment from "./threejs/tornado/fragment"
import vertex from "./threejs/tornado/vertex"

const radius = 5
const precision = 100
const numberOfRings = 250

const CircleMaterial = shaderMaterial(
  {
    uTime: 0,
    uDistance: 0,
  },
  vertex,
  fragment
)

extend({ CircleMaterial })

const Tornado = () => {
  const ref = useRef<InstancedMesh>(null!)
  const playerRef = useRef(new THREE.Vector3(0, 0, 0))

  const geometry = useMemo(() => {
    const points = []

    //_ create curve
    for (let i = 0; i < precision; i++) {
      const x = radius * Math.sin((Math.PI * 2 * i) / precision)
      const y = radius * Math.cos((Math.PI * 2 * i) / precision)

      points.push(new THREE.Vector3(x, y, 0))
    }

    const curve = new THREE.CatmullRomCurve3(points)
    const tube = new THREE.TubeBufferGeometry(curve, 200, 0.1, 8, true)

    //_ create instanced buffer geometry
    const geometry = new THREE.InstancedBufferGeometry()
    geometry.index = tube.index
    geometry.attributes = tube.attributes

    //_ set translate
    const translate = new Float32Array(numberOfRings * 3)
    const scale = new Float32Array(numberOfRings)
    const offset = new Float32Array(numberOfRings)
    const cIndex = new Float32Array(numberOfRings)

    for (let i = 0; i < numberOfRings; i++) {
      const x = Math.random()
      const y = Math.random()
      const z = i * 0.1

      translate[i * 3 + 0] = x
      translate[i * 3 + 1] = y
      translate[i * 3 + 2] = z

      scale[i] = i * 0.4

      offset[i] = Math.random()

      cIndex[i] = i
    }

    geometry.setAttribute(
      "translate",
      new THREE.InstancedBufferAttribute(translate, 3)
    )

    geometry.setAttribute("scale", new THREE.InstancedBufferAttribute(scale, 1))

    geometry.setAttribute(
      "offset",
      new THREE.InstancedBufferAttribute(offset, 1)
    )

    geometry.setAttribute(
      "cIndex",
      new THREE.InstancedBufferAttribute(offset, 1)
    )

    return geometry
  }, [])

  useFrame(({ clock }) => {
    const target = new THREE.Vector3(...playerRef.current)
    ref.current.position.lerp(target, 0.05)

    ref.current.material.uniforms.uDistance.value = target.distanceTo(
      ref.current.position
    )

    ref.current.material.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <>
      <instancedMesh
        ref={ref}
        scale={[0.01, 0.01, 0.01]}
        args={[undefined, undefined, numberOfRings]}
        position={[0, 0, 0]}
      >
        <primitive object={geometry} attach='geometry' />
        <circleMaterial />
      </instancedMesh>
      <mesh
        rotation={[0, 0, Math.PI * 0.5]}
        onPointerMove={(e) => (playerRef.current = e.point)}
        onPointerDown={(e) => (playerRef.current = e.point)}
      >
        <planeGeometry args={[1000, 1000, 1, 1]} />
        <meshPhongMaterial color='#ff0000' opacity={0} transparent />
      </mesh>
    </>
  )
}

export default Tornado
