import Link from "next/link";
import { Card } from "../components/styled/element/Card";
import { PostWrapper } from "../components/styled/element/PostWrapper";

export const Post = ({ post }) => {
  const {
    link,
    module: { meta },
  } = post;

  return (
    <PostWrapper>
      <Link href={"/blog" + link}>
        <Card>
          <Card.Img src={meta.img} />
          <Card.Content>
            <h4>
              <span>{meta.date}</span>
            </h4>
            <Card.Heading>{meta.title}</Card.Heading>
            <p>{meta.description}</p>
            <a>Read more &rarr;</a>
          </Card.Content>
        </Card>
      </Link>
    </PostWrapper>
  );
};
