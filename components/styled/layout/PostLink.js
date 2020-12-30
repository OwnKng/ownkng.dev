import { motion } from "framer-motion";
import { Link } from "../element/Link";

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

const PostLink = ({ className, hover }) => (
  <div className={className}>
    <Link>Read more &rarr;</Link>
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
      }}
    />
  </div>
);

export default PostLink;
