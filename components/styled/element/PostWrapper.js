import styled from "styled-components";

export const PostWrapper = styled.li`
  list-style: none;
  padding: 70px 0 70px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.boxShadow};
`;
