import { useState } from "react"
import styled from "styled-components"

const ButtonGroup = ({
  className,
  labels,
  selected,
  onClick = (f: any) => f,
}: any) => {
  const [state, setState] = useState<string>(selected)

  return (
    <div className={className}>
      {labels.map((label: string, i: number) => (
        <button
          key={`${i}-${label}`}
          name={label}
          className={state === label ? "active" : ""}
          onClick={(e) => {
            e.preventDefault()
            setState(label)
            onClick(label)
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default styled(ButtonGroup)`
  button {
    background: var(--colors-background);
    color: var(--colors-paragraph);
    padding: 0.5rem 1rem;
    border: 1px solid var(--colors-outline);
  }

  button.active {
    color: var(--colors-headline);
    border: 1px solid var(--colors-button);
    background: var(--colors-foreground);
  }

  button:hover {
    color: var(--colors-headline);
  }
`
