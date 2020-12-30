import styled from "styled-components";

export const Main = styled.main`
  margin: 0 auto;
  width: 90%;
  max-width: 1400px;
  border-left: 1px solid ${({ theme }) => theme.colors.boxShadow};
  border-right: 1px solid ${({ theme }) => theme.colors.boxShadow};

  p {
    color: ${({ theme }) => theme.colors.paragraph};
  }
`;
