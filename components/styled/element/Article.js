import styled from "styled-components";

export const Article = styled.article`
  color: ${({ theme }) => theme.colors.paragraph};

  h2 {
    color: ${({ theme }) => theme.colors.headline};
  }
`;
