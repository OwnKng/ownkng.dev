import React from "react"
import styled from "styled-components"
import { theme } from "../utilities"

const Footer = ({ className }) => (
  <footer className={className}>
    <p>
      Built with <a href='https://nextjs.org/'>Next.js</a> and{" "}
      <a href='https://vercel.com/'>Vercel</a>
    </p>
    <p>&#169; 2021 Owen King</p>
  </footer>
)

export default styled(Footer)`
  margin: 0 auto;
  width: 96%;
  max-width: 1200px;
  padding-top: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.paragraph};
  border-top: 1px solid ${({ theme }) => theme.colors.boxShadow};

  a {
    color: ${({ theme }) => theme.colors.paragraph};
  }

  p {
    font-size: 1rem;
    margin: 0px;
    padding: 0.2rem 0 0.8rem 0;
  }
`
