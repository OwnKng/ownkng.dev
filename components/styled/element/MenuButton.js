import styled from "styled-components";
import { useAppState } from "../../state";

const MenuWrapper = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  margin-right: 2px;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ theme }) => theme.colors.headline};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }
`;

export const Menu = () => {
  const { toggleMenu } = useAppState();
  return (
    <MenuWrapper onClick={toggleMenu}>
      <div />
      <div />
      <div />
    </MenuWrapper>
  );
};

export default Menu;
