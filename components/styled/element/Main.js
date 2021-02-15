import styled from "styled-components"

export const Main = styled.main`
  margin: 0 auto;
  width: 96%;
  max-width: 1200px;

  p {
    color: ${({ theme }) => theme.colors.paragraph};
  }
`
