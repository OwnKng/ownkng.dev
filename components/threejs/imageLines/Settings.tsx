import ButtonGroup from "../../styled/element/ButtonGroup"
import React from "react"
import styled from "styled-components"

type settingsType = {
  className?: string
  baseColor: number
  colorRange: number
  updateProperty: (f: any) => void
}

const createThreshold = (map: any[]) => (input: string) => {
  const [f1, f2, f3] = map
  input === "high" ? f1() : input === "med" ? f2() : f3()
}

const Settings: React.FC<settingsType> = ({
  className,
  baseColor,
  colorRange,
  updateProperty,
}) => (
  <form className={className}>
    <h2>Controls</h2>
    <div>
      <p>Number of lines</p>
      <ButtonGroup
        labels={["low", "med", "high"]}
        selected='med'
        onClick={(f: string) =>
          createThreshold([
            () => updateProperty({ numberLines: 300 }),
            () => updateProperty({ numberLines: 200 }),
            () => updateProperty({ numberLines: 100 }),
          ])(f)
        }
      />
    </div>
    <div>
      <p>Max number of vertices</p>
      <ButtonGroup
        labels={["low", "med", "high"]}
        selected='med'
        onClick={(f: string) =>
          createThreshold([
            () => updateProperty({ sampleSize: 4000 }),
            () => updateProperty({ sampleSize: 2500 }),
            () => updateProperty({ sampleSize: 1000 }),
          ])(f)
        }
      />
    </div>
    <div>
      <p>Max sampling distance</p>
      <ButtonGroup
        labels={["low", "med", "high"]}
        selected='med'
        onClick={(f: string) =>
          createThreshold([
            () => updateProperty({ maxDistance: 10 }),
            () => updateProperty({ maxDistance: 8 }),
            () => updateProperty({ maxDistance: 4 }),
          ])(f)
        }
      />
    </div>
    <div>
      <label htmlFor='baseColor'>Base color hue</label>
      <input
        id='baseColor'
        className='slider'
        type='range'
        min={0.0}
        max={1.0}
        step={0.1}
        name='baseColor'
        value={baseColor}
        onChange={(input) =>
          updateProperty({ [input.target.name]: input.target.value })
        }
      />
      <span>{baseColor}</span>
    </div>
    <div>
      <label htmlFor='colorRange'>Color range</label>
      <input
        className='slider'
        type='range'
        min={0.0}
        max={1.0}
        step={0.1}
        name='colorRange'
        value={colorRange}
        onChange={(input) =>
          updateProperty({ [input.target.name]: input.target.value })
        }
      />
      <span>{colorRange}</span>
    </div>
  </form>
)

export default styled(Settings)`
  grid-area: settings;
  color: var(--colors-headline);

  display: flex;
  flex-direction: column;
  gap: 20px;

  p {
    color: var(--colors-headline);
    margin: 0px;
  }

  label {
    display: block;
    font-size: 1.4rem;
  }

  .slider {
    appearance: none;
    background: var(--colors-foreground);
    height: 3px;
    background: #d3d3d3;
    outline: none;
    margin-right: 5px;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: var(--colors-button);
    cursor: pointer;
  }
`
