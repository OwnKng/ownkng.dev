import styled from "styled-components"

export const Button = styled.button`
  position: relative;
  font-size: 1.4rem;
  padding: 0.5rem 1rem;
  background: none;
  color: ${({ theme }) => theme.colors.paragraph};
  border: 1px solid rgba(167, 169, 190, 0.2);
  margin: 5px;
  border-radius: 4px;

  :hover {
    color: ${({ theme }) => theme.colors.button};
  }

  :focus {
    outline: none;
  }

  cursor: pointer;
`
