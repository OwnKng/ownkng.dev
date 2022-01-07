import styled from "styled-components"
import Link from "next/link"

const StyledLink = ({
  className,
  href,
  children,
}: {
  className?: string
  href: string
  children: any
}) => (
  <div className={className}>
    <Link href={href}>{children}</Link>
  </div>
)

export default styled(StyledLink)`
  a {
    position: relative;
    background: none;
    color: ${({ theme }) => theme.colors.buttonText};
    padding: 5px 0px 0px 0px;
    font-size: 1.4rem;
    text-decoration: none;

    :before {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0px;
      background-color: ${({ theme }) => theme.colors.button};
      visibility: visible;
      transition: all 0.2s ease-in-out;
    }

    :hover:before {
      background-color: ${({ theme }) => theme.colors.buttonText};
    }

    :visited {
      color: ${({ theme }) => theme.colors.buttonText};
    }
  }
`
