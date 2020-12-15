import styled from "styled-components";

export const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "image image content";
  grid-gap: 100px 6.66667%;
  cursor: pointer;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.5fr 1fr;
    grid-template-areas: "image image" "content content";
    grid-gap: 50px 6.66667%;
  }
`;

const CardContent = styled.div`
  grid-area: content;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  a {
    color: ${({ theme }) => theme.colors.button};
    line-height: 1.5rem;
    font-weight: bold;
  }

  p {
    color: ${({ theme }) => theme.colors.paragraph};
  }

  span {
    margin-bottom: 50px;
    box-shadow: 0 1px ${({ theme }) => theme.colors.paragraph};
    padding: 0.4rem 0rem;
  }

  h4 {
    color: ${({ theme }) => theme.colors.paragraph};
    line-height: 1.7;
    display: inline-block;
  }
`;

const CardHeading = styled.h1`
  margin: 0px;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.headline};
  flex-grow: 1;
  place-items: center;
`;

const CardImg = styled.img`
  grid-area: image;
  width: 100%;
  object-fit: cover;
`;

Card.Heading = CardHeading;
Card.Img = CardImg;
Card.Content = CardContent;
