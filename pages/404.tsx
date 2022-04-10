import { Canvas } from "@react-three/fiber"
import Link from "next/link"
import styled from "styled-components"
import Layout from "../components/Layout"
import Tornado from "../components/Tornado"

const FourOhFour = ({ className }: { className?: string }) => (
  <Layout url='/404'>
    <div className={className}>
      <Canvas orthographic camera={{ zoom: 20, position: [0, -100, 50] }}>
        <Tornado />
      </Canvas>
      <div className='escape'>
        <h1>404</h1>
        <p>There's nothing to see here</p>
        <Link href='/'>Go back home</Link>
      </div>
    </div>
  </Layout>
)

export default styled(FourOhFour)`
  height: calc(100vh - 4rem);
  display: grid;
  grid-template-rows: 1fr auto;
  margin: 0px;

  .escape {
    text-align: center;
  }

  h1 {
    margin: 0px;
    font-size: 4vw;
  }

  canvas {
    width: 80;
  }

  p {
    margin: 0px;
  }

  a {
    color: ${({ theme }) => theme.colors.paragraph};
    text-align: center;
    font-size: 2vw;

    :hover {
      color: ${({ theme }) => theme.colors.secondary};
    }

    :vistied {
      color: ${({ theme }) => theme.colors.stroke};
    }
  }
`
