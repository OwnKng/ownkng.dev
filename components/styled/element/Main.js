import styled from "styled-components";

export const Main = styled.main`
  width: 85%;
  min-height: 100vh;
  margin: 0px auto;
  padding: 4rem 1rem 0;

  p {
    color: ${({ theme }) => theme.colors.paragraph};
  }
`;
