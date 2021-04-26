import styled from "styled-components"

const SectionTitle = ({ className, children }) => {
  return <div className={className}>{children}</div>
}

export default styled(SectionTitle)`
  h1 {
    color: ${({ theme }) => theme.colors.headline};
    font-size: 2.7rem;
    padding: 0.5rem 0rem;
    margin: 0px;
    text-transform: uppercase;
    font-family: "Saira", sans-serif;
  }
`
