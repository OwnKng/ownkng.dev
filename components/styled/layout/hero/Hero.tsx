import Scene from "./Scene"
import styled from "styled-components"

type heroProps = {
  className?: string
}

const Hero = ({ className }: heroProps) => (
  <div className={className}>
    <Scene />
    <div className='name-card'>
      <div>
        <h1>Owen King</h1>
        <h2> I analyse, visualise and model data using modern tech</h2>
      </div>
    </div>
  </div>
)

export default styled(Hero)/* css */ `
  width: 100%;
  height: 100vh;

  position: relative;

  .name-card {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    z-index: var(--z-index-low);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 4rem;
    }

    h2 {
      font-size: 2rem;
    }
  }
`
