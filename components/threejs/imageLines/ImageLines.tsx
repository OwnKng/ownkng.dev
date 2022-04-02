import Settings from "./Settings"
import { Suspense, useState } from "react"
import styled from "styled-components"
import { Canvas } from "@react-three/fiber"
import Lines from "./Lines"

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <meshStandardMaterial attach='material' transparent opacity={0.5} />
    </mesh>
  )
}

const ImageLines = ({ className }: { className: string }) => {
  const [state, setState] = useState({
    numberLines: 200,
    baseColor: 0.8,
    colorRange: 0.3,
    maxDistance: 8,
    sampleSize: 2500,
  })

  return (
    <div className={className}>
      <Canvas>
        <Suspense fallback={<Box />}>
          <Lines {...state} />
        </Suspense>
      </Canvas>
      <Settings
        {...state}
        updateProperty={(property: any) => setState({ ...state, ...property })}
      />
    </div>
  )
}

export default styled(ImageLines)`
  display: grid;
  grid-template-areas: "canvas settings";
  grid-template-columns: 2fr 1fr;
  width: 100%;
  height: 100%;

  canvas {
    grid-area: canvas;
  }

  .settings {
    grid-area: settings;
  }
`
