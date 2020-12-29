import styled from "styled-components";

export const Button = styled.button`
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.paragraph};
  color: ${({ theme }) => theme.colors.background};
  border-radius: 5px;
  border: none;
  margin: 5px;

  :focus {
    outline: none;
  }
`;
