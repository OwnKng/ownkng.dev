import styled from "styled-components";
import { elevation } from "../utilities";

export const Card = styled.div`
  background: ${(props) => props.theme.colors.main};
  border-radius: 4px;
  ${elevation[1]};
  padding: 0 0 1rem 0;
  color: ${({ theme }) => theme.colors.cardParagraph};

  a {
    color: ${({ theme }) => theme.colors.button};
    line-height: 1.5rem;
    padding: 0rem 1rem;
    font-weight: bold;
  }

  p {
    padding: 0rem 1rem;
    margin: 0.5rem 0;
  }
`;

const CardHeading = styled.h1`
  margin: 0px;
  padding: 0rem 1rem;
  color: ${({ theme }) => theme.colors.stroke};
`;

const CardImg = styled.img`
  height: 400px;
  width: 100%;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.background};
  ${elevation[1]}
`;

Card.Heading = CardHeading;
Card.Img = CardImg;
