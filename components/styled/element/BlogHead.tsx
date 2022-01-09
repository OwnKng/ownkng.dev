import styled from "styled-components"

export const BlogHead = styled.div`
  color: ${({ theme }) => theme.colors.paragraph};
  padding: 3rem 0rem 2rem;

  @media only screen and (max-width: 600px) {
    padding: 3rem 5px 0px 5px;
  }
`
