import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import CanvasImage from "./CanvasImage"

const Scene = () => (
  <Canvas
    camera={{ position: [0, 15, 120] }}
    onCreated={({ camera }) => camera.lookAt(0, 15, 0)}
  >
    <Suspense fallback={null}>
      <CanvasImage />
    </Suspense>
  </Canvas>
)

export default Scene
