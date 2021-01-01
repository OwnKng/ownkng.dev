import styled from "styled-components";

export const Article = styled.article`
  max-width: 800px;
  margin: 0px auto;
  color: ${({ theme }) => theme.colors.paragraph};
  padding: 2rem 0rem;

  h2 {
    color: ${({ theme }) => theme.colors.headline};
  }

  @media only screen and (max-width: 600px) {
    padding: 2rem 5px 2rem 5px;
  }
`;
