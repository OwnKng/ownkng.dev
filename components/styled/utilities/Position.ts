import { css } from "styled-components"

export const fixed = ({
  x = 0,
  y = 0,
  xProp = "top",
  yProp = "left",
} = {}) => css`
  position: fixed;
  ${xProp}: ${y};
  ${yProp}: ${x};
`

export const absolute = ({
  x = 0,
  y = 0,
  xProp = "top",
  yProp = "left",
} = {}) => css`
  position: absolute;
  ${xProp}: ${y};
  ${yProp}: ${x};
`
