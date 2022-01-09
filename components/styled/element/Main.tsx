import styled from "styled-components"

export const Main = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;

  p {
    color: ${({ theme }) => theme.colors.paragraph};
  }
`
