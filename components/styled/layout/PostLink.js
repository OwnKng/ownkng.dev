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

const PostLink = ({ hover }) => (
  <div
    style={{
      position: "relative",
    }}
  >
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
        zIndex: -1,
        fontWeight: "bold",
        fontSize: "1.5rem",
      }}
    />
  </div>
);

export default PostLink;
