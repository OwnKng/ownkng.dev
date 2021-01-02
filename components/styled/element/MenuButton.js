import styled from "styled-components";
import { useAppState } from "../../state";

const MenuWrapper = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ theme }) => theme.colors.headline};
    border-radius: 10px;
    transition: all 0.1s linear;
    position: relative;
    transform-origin: 0px;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

export const Menu = () => {
  const { isMenuOpen, toggleMenu } = useAppState();
  return (
    <MenuWrapper open={isMenuOpen} onClick={toggleMenu}>
      <div />
      <div />
      <div />
    </MenuWrapper>
  );
};

export default Menu;
