import styled from "styled-components";
import { motion } from "framer-motion";
import Voronoi from "../../visx/Voronoi";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

const Hero = ({ className }) => {
  return (
    <div className={className}>
      <NameCard />
      <ParentSize>
        {({ width, height }) => <Voronoi width={width} height={height} />}
      </ParentSize>
    </div>
  );
};

export default styled(Hero)`
  height: 80vh;
  width: 100%;
  border: 1px solid black;
  position: relative;
`;

const StyledNameCard = styled(motion.div)`
    position: absolute;
    top: 40%;
    width: 100%;

    h1 {
        margin: 0px 10px;
        font-size: 4rem;
      }

      h2 {
        margin: 10px 10px;
        font-size: 2rem;
      }

    .title {
        overflow: hidden;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
    }

    .subtitle {
      overflow: hidden;
      border-bottom: 1px solid black;
    }
  }`;

const divVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const NameCard = () => {
  const titleVariants = {
    initial: { y: 100 },
    animate: { y: 0 },
    transition: { type: "easeIn" },
  };
  return (
    <StyledNameCard variants={divVariants} initial='initial' animate='animate'>
      <div className='title'>
        <motion.h1 variants={titleVariants} transition='transition'>
          OWEN KING
        </motion.h1>
      </div>
      <div className='subtitle'>
        <motion.h2 variants={titleVariants} transition='transition'>
          I USE MODERN TECH TO ANALYSE, VISUALISE AND MODEL DATA
        </motion.h2>
      </div>
    </StyledNameCard>
  );
};
