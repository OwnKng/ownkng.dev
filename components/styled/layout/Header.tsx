import React from "react"
import styled from "styled-components"
import Link from "next/link"
import MenuButton from "../element/MenuButton"

type headerProps = {
  className?: string
}

const Header = ({ className }: headerProps) => {
  return (
    <header className={className}>
      <Link href='/'>
        <a>Own Kng</a>
      </Link>
      <MenuButton />
    </header>
  )
}

export default styled(Header)`
  position: fixed;
  top: 0px;
  height: 4rem;
  width: 100%;
  z-index: 4;
  display: flex;
  justify-content: space-between;
  place-items: center;
  padding: 0px 1rem;

  @media only screen and (max-width: 600px) {
    padding: 0px 5%;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.headline};
    padding: 1rem 0rem;
    font-size: 2rem;
  }
`
