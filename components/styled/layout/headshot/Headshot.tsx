import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import CanvasImage from "./CanvasImage"

const Scene = () => (
  <Canvas
    camera={{ position: [-20, 40, 280] }}
    onCreated={({ camera }) => camera.lookAt(0, 40, 0)}
  >
    <Suspense fallback={null}>
      <CanvasImage />
    </Suspense>
  </Canvas>
)

export default Scene
