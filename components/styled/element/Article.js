import styled from "styled-components";

export const Article = styled.article`
  max-width: 920px;
  margin: 0px auto;
  color: ${({ theme }) => theme.colors.paragraph};

  h2 {
    color: ${({ theme }) => theme.colors.headline};
  }
`;
