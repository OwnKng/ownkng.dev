import React from "react"
import styled from "styled-components"
import StyledExternalLink from "../element/StyledExternalLink"

type aboutProps = {
  className?: string
}

const AboutMe = ({ className }: aboutProps) => (
  <div className={className}>
    <h2>Hi, I'm Owen</h2>
    <p>
      I'm a quantitative researcher at{" "}
      <StyledExternalLink href='https://www.jll.com'>JLL</StyledExternalLink>,
      based in London. In my professional work, I apply skills in data
      visualisation, machine learning and software engineering to generate
      insights, communicate trends and create new products.
    </p>
    <p>
      This site is a collection of my personal projects, with a focus on data
      analysis, visualisation and web development.
    </p>
  </div>
)

export default styled(AboutMe)`
  padding-top: 2rem;
`
