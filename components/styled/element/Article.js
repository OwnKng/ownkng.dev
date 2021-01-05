import styled from "styled-components";
import { motion } from "framer-motion";

export const Article = styled(motion.article)`
  max-width: 800px;
  margin: 0px auto;
  color: ${({ theme }) => theme.colors.paragraph};
  padding: 2rem 0rem;

  @media only screen and (max-width: 600px) {
    padding: 2rem 5px 2rem 5px;
  }

  a {
    color: ${({ theme }) => theme.colors.tertiary};
  }

  a:visited {
    color: ${({ theme }) => theme.colors.tertiary};
  }

  h1,
  h2,
  h3,
  h4 {
    margin-top: 2.5rem;
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
`;
