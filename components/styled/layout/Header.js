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
  border-left: 1px solid ${({ theme }) => theme.colors.boxShadow};
  border-right: 1px solid ${({ theme }) => theme.colors.boxShadow};
  background: ${(props) => props.theme.colors.background};
  margin: 0 5%;
  display: flex;
  z-index: 1;
  justify-content: space-between;
  place-items: center;

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
