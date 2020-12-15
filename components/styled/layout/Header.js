import React from "react";
import styled from "styled-components";
import { fixed } from "../utilities";
import Link from "next/link";
import MenuButton from "../element/MenuButton";

const Header = ({ className }) => {
  return (
    <header className={className}>
      <Link href='/'>
        <a>
          <h1>Owen King</h1>
        </a>
      </Link>
      <ul>
        <MenuButton />
      </ul>
    </header>
  );
};

export default styled(Header)`
  background: ${(props) => props.theme.colors.background};
  padding: 0px 4%;
  width: 100%;
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
    padding: 1rem;
  }
`;
