import { useState } from "react";
import Link from "next/link";
import { Card } from "../element/Card";
import Image from "next/image";
import PostLink from "./PostLink";

export const Post = ({ post }) => {
  const [hover, setHover] = useState(false);

  const {
    link,
    module: { meta },
  } = post;

  return (
    <div
      style={{
        padding: "70px 50px 70px 50px",
      }}
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
            {meta.tags.includes("Stared") && <Card.Star>Stared</Card.Star>}
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
    </div>
  );
};
