import styled from "styled-components";
import { motion } from "framer-motion";

const Hero = ({ className }) => {
  return (
    <div className={className}>
      <div>
        <motion.h1
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "linear" }}
        >
          Owen King
        </motion.h1>
      </div>
    </div>
  );
};

export default styled(Hero)`
  height: 60vh;
  width: 100%;
  border: 1px solid black;
  position: relative;

  div {
    position: absolute;
    top: 40%;
    width: 100%;
    text-align: center;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    overflow: hidden;

    h1 {
      margin: 0px;
      font-size: 4rem;
    }
  }
`;
