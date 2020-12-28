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
            <Image src={meta.img} layout='fill' objectFit='cover' />
          </Card.Image>
          <Card.Content>
            <h4>
              <span>{meta.date}</span>
            </h4>
            <Card.Heading>{meta.title}</Card.Heading>
            <p>{meta.description}</p>
            <PostLink hover={hover} />
          </Card.Content>
        </Card>
      </Link>
    </div>
  );
};
