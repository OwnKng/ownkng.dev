import styled from "styled-components";

export const BlogHead = styled.div`
  color: ${({ theme }) => theme.colors.paragraph};
  max-width: 920px;
  margin: 0px auto;
  padding: 3rem 0rem 4rem;

  h1 {
    color: ${({ theme }) => theme.colors.headline};
    margin: 0;
  }

  @media only screen and (max-width: 600px) {
    padding: 3rem 5px 4rem 5px;
  }
`;
