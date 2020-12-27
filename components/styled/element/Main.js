import styled from "styled-components";

export const Main = styled.main`
  min-height: 100vh;
  margin: 0px auto;
  padding: 0rem 5%;

  p {
    color: ${({ theme }) => theme.colors.paragraph};
  }
`;
