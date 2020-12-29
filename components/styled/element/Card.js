import styled from "styled-components";

export const Card = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "image content";
  grid-gap: 0px 6.66667%;
  cursor: pointer;
  min-height: 60vh;

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "image" "content";
    grid-gap: 20px;
    min-height: 50vh;
  }
`;

const CardTag = styled.div`
  color: ${({ theme }) => theme.colors.background};
  background: ${({ theme }) => theme.colors.paragraph};
  opacity: 0.6;
  margin-right: 3px;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 0.5rem;
  border-radius: 2px;
`;

const CardContent = styled.div`
  grid-area: content;
  display: flex;
  flex-direction: column;
  padding: 0 1rem 0 1rem;
  margin-top: 0;

  span {
    margin-bottom: 50px;
    padding: 0.4rem 0rem;
  }

  h4 {
    color: ${({ theme }) => theme.colors.paragraph};
    line-height: 1.7;
    display: inline-block;
    margin-top: 0px;
    font-family: "Saira", sans-serif;
  }
`;

const CardHeading = styled.h1`
  margin: 0px;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.headline};
  flex-grow: 1;
  place-items: center;
`;

const CardImage = styled.div`
  position: relative;
  grid-area: image;
  overflow: hidden;
`;

Card.Heading = CardHeading;
Card.Content = CardContent;
Card.Image = CardImage;
Card.Tag = CardTag;
