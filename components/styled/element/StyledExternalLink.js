import styled from "styled-components"

const StyledExternalLink = ({ className, href, children }) => (
  <a className={className} href={href}>
    {children}
  </a>
)

export default styled(StyledExternalLink)`
  position: relative;
  background: none;
  color: ${({ theme }) => theme.colors.button};
  padding: 0px 0px 0px 0px;
  font-size: 1.5rem;
  text-decoration: none;

  :before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0px;
    background-color: ${({ theme }) => theme.colors.paragraph};
    visibility: visible;
    transition: all 0.2s ease-in-out;
  }

  :hover:before {
    background-color: ${({ theme }) => theme.colors.button};
  }

  :visited {
    color: ${({ theme }) => theme.colors.button};
  }
`
