import styled from "styled-components";

export const Main = styled.main`
  margin: 0 5%;
  border-left: 1px solid ${({ theme }) => theme.colors.boxShadow};
  border-right: 1px solid ${({ theme }) => theme.colors.boxShadow};

  p {
    color: ${({ theme }) => theme.colors.paragraph};
  }
`;
