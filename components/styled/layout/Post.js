import { useState } from "react";
import Link from "next/link";
import { Card } from "../element/Card";
import Image from "next/image";
import styled from "styled-components";

const StyledPost = styled.div`
  padding: 70px 50px 70px 50px;

  @media screen and (max-width: 767px) {
    padding: 30px 20px 30px 20px;
  }
`;

export const Post = ({ post }) => {
  const [hover, setHover] = useState(false);

  const {
    link,
    module: { meta },
  } = post;

  return (
    <StyledPost
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href={"/blog" + link}>
        <Card>
          <Card.Image>
            <Image src={meta.img} layout='fill' objectFit='fill' />
          </Card.Image>
          <Card.Content>
            <Card.Heading>{meta.title}</Card.Heading>
            {meta.tags.includes("Stared") ? (
              <Card.Star>&#9734;</Card.Star>
            ) : (
              <Card.Star></Card.Star>
            )}
            <Card.Desc>{meta.description}</Card.Desc>
            <Card.Tags>
              {meta.tags.map((tag) => (
                <Card.Tag>{tag}</Card.Tag>
              ))}
            </Card.Tags>
            <Card.Link hover={hover} />
          </Card.Content>
        </Card>
      </Link>
    </StyledPost>
  );
};
