import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/cannon"
import Blocks from "./Blocks"
import Player from "./Player"

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 10, 0] }}>
      <hemisphereLight intensity={0.2} />
      <directionalLight intensity={0.4} position={[0, 12, 0]} />
      <Physics broadphase='SAP'>
        <Player />
        <Blocks />
      </Physics>
    </Canvas>
  )
}
