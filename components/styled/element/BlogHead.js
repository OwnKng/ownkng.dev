import styled from "styled-components";

export const BlogHead = styled.div`
  color: ${({ theme }) => theme.colors.paragraph};
  padding-bottom: 4rem;
  h1 {
    color: ${({ theme }) => theme.colors.headline};
  }
`;
