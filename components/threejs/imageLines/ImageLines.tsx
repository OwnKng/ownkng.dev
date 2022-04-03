import Settings from "./Settings"
import { Suspense, useState } from "react"
import styled from "styled-components"
import { Canvas } from "@react-three/fiber"
import Lines from "./Lines"
import { elevation } from "../../styled/utilities"

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <meshBasicMaterial color='teal' />
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
      <Canvas camera={{ position: [0, 0, 0] }}>
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
  grid-template-columns: 3fr 1fr;
  left: calc(-50vw + 50%);
  position: relative;
  width: 100vw;
  height: 90vh;
  background: #0b1e31;
  ${elevation[1]};

  canvas {
    grid-area: canvas;
  }

  .settings {
    grid-area: settings;
  }

  @media only screen and (max-width: 600px) {
    grid-template-areas:
      "settings"
      "canvas";
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr;
  }
`
