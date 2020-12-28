import { useState } from "react";
import Link from "next/link";
import { Card } from "../element/Card";
import { PostWrapper } from "../element/PostWrapper";
import Image from "next/image";
import { motion } from "framer-motion";

const variants = {
  noHover: {
    opacity: 0,
    width: 0,
  },
  hover: {
    opacity: 1,
    width: "60%",
  },
};

export const Post = ({ post }) => {
  const [hover, setHover] = useState(false);

  const {
    link,
    module: { meta },
  } = post;

  return (
    <PostWrapper
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
            <div
              style={{
                position: "relative",
              }}
            >
              <a>Read more &rarr;</a>
              <motion.div
                variants={variants}
                inital='noHover'
                animate={hover ? "hover" : "noHover"}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  background: "#fffffe",
                  zIndex: -1,
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              />
            </div>
          </Card.Content>
        </Card>
      </Link>
    </PostWrapper>
  );
};
