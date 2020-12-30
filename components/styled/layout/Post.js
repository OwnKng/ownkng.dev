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
        margin: 0,
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
            <p>{meta.description}</p>
            <div style={{ display: "flex", marginBottom: 5 }}>
              {meta.tags.map((tag) => (
                <Card.Tag>{tag}</Card.Tag>
              ))}
            </div>
            <PostLink hover={hover} />
          </Card.Content>
        </Card>
      </Link>
    </div>
  );
};
