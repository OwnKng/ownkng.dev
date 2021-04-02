import { useState, useRef, Suspense, useEffect } from "react"
import { useLoader, useFrame } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { Button } from "../styled/element/Button"
import { color } from "d3-color"

const Scene = () => {
  const [orbit, setOrbit] = useState(false)
  const [overlay, toggleOverlay] = useState(true)

  return (
    <>
      <Button
        onClick={() => toggleOverlay((prevState) => !prevState)}
        style={{
          background: overlay ? "#00A7E1" : "",
          color: overlay ? "#FFFFFE" : "",
          opacity: overlay ? 1 : 0.4,
        }}
      >
        Satellite overlay
      </Button>
      <Button
        onClick={() => setOrbit((prevState) => !prevState)}
        style={{
          background: orbit ? "#00A7E1" : "",
          color: orbit ? "#FFFFFE" : "",
          opacity: orbit ? 1 : 0.4,
        }}
      >
        Enable controls
      </Button>
      <div style={{ height: 450, width: "100%" }}>
        <Canvas
          camera={{
            fov: 30,
            position: [0, 90, 150],
          }}
          shadowMap={true}
        >
          <ambientLight />
          <spotLight
            intensity={1}
            position={overlay ? [0, 100, 0] : [70, 20, 30]}
          />
          <pointLight position={[0, 20, 0]} color={"#FFFFFF"} intensity={0.4} />
          <Suspense fallback={null}>
            <RayshaderModel overlay={overlay} />
          </Suspense>
          {orbit && <OrbitControls />}
        </Canvas>
      </div>
    </>
  )
}

const RayshaderModel = ({ overlay }) => {
  const ref = useRef()
  const { nodes, materials } = useLoader(GLTFLoader, "/yulongxueshan.glb")

  useFrame(() => {
    ref.current.rotation.y += 0.005
  })

  const overlayProps = {
    geometry: nodes.yulongxueshan.geometry,
    rotation: [Math.PI / 2, 0, 0],
    scale: [0.1, 0.1, 0.1],
    material: materials.ray_surface,
  }

  const materialProps = {
    geometry: nodes.yulongxueshan.geometry,
    rotation: [Math.PI / 2, 0, 0],
    scale: [0.1, 0.1, 0.1],
    receiveShadow: true,
    castShadow: true,
    material: new THREE.MeshPhongMaterial({
      color: 0xa87a65,
      side: THREE.DoubleSide,
      roughness: 0.7,
      metalness: 0.7,
    }),
  }

  const props = overlay ? overlayProps : materialProps

  return (
    <group ref={ref}>
      <mesh {...props}></mesh>
    </group>
  )
}

useLoader.preload(GLTFLoader, "/yulongxueshan.glb")

export default Scene
