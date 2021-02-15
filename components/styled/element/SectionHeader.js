import styled from "styled-components"

export const SectionHeader = styled.div`
  margin: 50px 0 0 0;
  text-align: center;

  :before {
    display: block;
    content: " ";
    margin-top: -80px;
    height: 80px;
    visibility: hidden;
    pointer-events: none;
  }
`

const SectionTitle = styled.h1`
  color: ${({ theme }) => theme.colors.headline};
  font-size: 2.7rem;
  padding: 0.5rem 0rem;
  margin: 0px;
  text-transform: uppercase;
  font-family: "Saira", sans-serif;
`

const SectionSubtitle = styled.p`
  padding: 0px;
  margin: 0px;
  color: ${({ theme }) => theme.colors.paragraph};
`

SectionHeader.Title = SectionTitle
SectionHeader.Subtitle = SectionSubtitle
