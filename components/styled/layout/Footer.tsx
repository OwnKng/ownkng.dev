import React from "react"
import styled from "styled-components"

const Footer = ({ className }: { className?: string }) => (
  <footer className={className}>
    <p>&#169; 2022 Owen King</p>
  </footer>
)

export default styled(Footer)`
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.paragraph};

  a {
    color: ${({ theme }) => theme.colors.paragraph};
  }

  p {
    font-size: 1rem;
    margin: 0px;
    padding: 0.2rem 0 0.8rem 0;
  }
`
