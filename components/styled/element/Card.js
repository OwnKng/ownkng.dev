import styled from "styled-components";
import PostLink from "../layout/PostLink";

export const Card = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "image content";
  grid-gap: 0 6.66667%;
  cursor: pointer;
  min-height: 50vh;

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "image" "content";
    grid-gap: 20px;
  }
`;

const CardDesc = styled.p`
  grid-area: description;
`;

const CardTags = styled.div`
  grid-area: tags;
  display: flex;
  flex-wrap: wrap;
  place-items: center;
`;

const CardTag = styled.div`
  color: ${({ theme }) => theme.colors.background};
  background: ${({ theme }) => theme.colors.paragraph};
  opacity: 0.6;
  margin: 3px 3px 0px 0px;
  border-radius: 2px;
  padding: 5px 10px;
`;

const CardStar = styled.div`
  grid-area: stared;
  font-size: 1.4rem;
  text-align: right;
  color: ${({ theme }) => theme.colors.tertiary};
`;

const CardContent = styled.div`
  grid-area: content;
  display: grid;
  grid-template-areas:
    "title stared"
    "description description"
    "tags tags"
    "link link";

  grid-template-rows: 1fr auto 0.5fr 0.5fr;
  grid-template-columns: 5fr 1fr;

  @media screen and (max-width: 767px) {
  }
`;

const CardHeading = styled.h1`
  grid-area: title;
  margin: 0px;
  color: ${({ theme }) => theme.colors.headline};
  flex-grow: 1;
  place-items: center;
`;

const CardImage = styled.div`
  position: relative;
  grid-area: image;
  overflow: hidden;
`;

const CardLink = styled(PostLink)`
  grid-area: link;
  position: relative;
  display: flex;
  place-items: center;
  margin: 20px 0 0 0;
`;

Card.Heading = CardHeading;
Card.Content = CardContent;
Card.Image = CardImage;
Card.Tag = CardTag;
Card.Tags = CardTags;
Card.Desc = CardDesc;
Card.Star = CardStar;
Card.Link = CardLink;
