import styled from "styled-components";

export const BlogHead = styled.div`
  color: ${({ theme }) => theme.colors.paragraph};
  max-width: 720px;
  margin: 0px auto;
  padding-bottom: 4rem;
  h1 {
    color: ${({ theme }) => theme.colors.headline};
  }
`;
