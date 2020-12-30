import styled from "styled-components";

export const SectionHeader = styled.div`
  margin: 50px 0 0 0;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.boxShadow};

  :before {
    display: block;
    content: " ";
    margin-top: -80px;
    height: 80px;
    visibility: hidden;
    pointer-events: none;
  }
`;

const SectionTitle = styled.h1`
  color: ${({ theme }) => theme.colors.headline};
  font-size: 2.2rem;
  padding: 0.5rem 0rem;
  margin: 0px;
`;

const SectionSubtitle = styled.p`
  padding: 0px;
  margin: 0px;
`;

SectionHeader.Title = SectionTitle;
SectionHeader.Subtitle = SectionSubtitle;
