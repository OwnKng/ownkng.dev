import styled from "styled-components"
import { motion } from "framer-motion"

export const Article = styled(motion.article)`
  max-width: 800px;
  margin: 0px auto;
  color: ${({ theme }) => theme.colors.paragraph};
  padding: 2rem 0rem;

  @media only screen and (max-width: 600px) {
    padding: 2rem 8px 2rem 8px;
  }

  a {
    position: relative;
    background: none;
    color: ${({ theme }) => theme.colors.button};
    text-decoration: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.paragraph};

    :visited {
      color: ${({ theme }) => theme.colors.button};
    }
  }

  h1,
  h2,
  h3,
  h4 {
    margin-top: 5rem;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 1.8rem;
  }

  h3 {
    font-size: 1.6rem;
  }

  img {
    max-width: 100%;
    height: auto;
    margin: 0px auto;
  }

  strong {
    color: ${({ theme }) => theme.colors.headline};
  }

  ul {
    font-size: 1.4rem;
  }

  .footnotes {
    margin-top: 100px;
  }

  hr {
    border: 1px solid ${({ theme }) => theme.colors.paragraph};
    opacity: 0.5;
  }
`
