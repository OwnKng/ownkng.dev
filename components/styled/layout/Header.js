import React from "react";
import styled from "styled-components";
import Link from "next/link";
import MenuButton from "../element/MenuButton";

const Header = ({ className }) => {
  return (
    <header className={className}>
      <Link href='/'>
        <a>
          <h1>Own Kng</h1>
        </a>
      </Link>
      <ul>
        <MenuButton />
      </ul>
    </header>
  );
};

export default styled(Header)`
  position: sticky;
  top: 0px;
  z-index: 2;
  margin: 0 auto;
  width: 90%;
  max-width: 1400px;
  backdrop-filter: blur(4px);
  border: 1px solid ${({ theme }) => theme.colors.boxShadow};
  border-top: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.boxShadow};
  background: rgba(15, 14, 23, 0.2);
  display: flex;
  justify-content: space-between;
  place-items: center;
  padding: 0px 5px;

  h1 {
    color: ${(props) => props.theme.colors.headline};
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.headline};
    padding: 1rem 0rem;
  }
`;
