import Link from "next/link";
import { Card } from "../components/styled/element/Card";

export const Post = ({ post }) => {
  const {
    link,
    module: { meta },
  } = post;

  return (
    <Card>
      <article>
        <Card.Img src={meta.img} />
        <Card.Heading>{meta.title}</Card.Heading>
        <p>{meta.description}</p>
        <p>{meta.date}</p>
        <Link href={"/blog" + link}>
          <a>Read more &rarr;</a>
        </Link>
      </article>
    </Card>
  );
};
