import styled from "styled-components";
import { motion } from "framer-motion";
import Voronoi from "../../visx/Voronoi";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { DownArrowAlt } from "@styled-icons/boxicons-regular/DownArrowAlt";

const divVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const titleVariants = {
  initial: { y: 100 },
  animate: { y: 0 },
  transition: { type: "easeIn" },
};

const scrollVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { type: "easeIn" },
};

const Hero = ({ className }) => (
  <motion.div
    className={className}
    variants={divVariants}
    initial='initial'
    animate='animate'
  >
    <div className='heroPlot'>
      <NameCard />
      <ParentSize>
        {({ width, height }) => <Voronoi width={width} height={height} />}
      </ParentSize>
    </div>
    <div style={{ overflow: "hidden" }}>
      <motion.div
        className='scrollPrompt'
        variants={scrollVariants}
        transition='transition'
      >
        <DownArrowAlt size={50} color={"white"} />
        <h3>Scroll</h3>
        <DownArrowAlt size={50} color={"white"} />
      </motion.div>
    </div>
  </motion.div>
);

export default styled(Hero)`
  height: 85vh;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.background};
  position: relative;

  .heroPlot {
    height: 90%;
  }

  .scrollPrompt {
    align-items: top;
    width: 100%;
    height: 10%;
    display: flex;
    color: white;
    justify-content: space-between;
  }
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
      background: ${({ theme }) => theme.colors.background};
        overflow: hidden;
        border-top: 2px solid ${({ theme }) => theme.colors.background};
        border-bottom: 2px solid ${({ theme }) => theme.colors.background};
    }

    .subtitle {
      overflow: hidden;
      margin-top: 10px;
      background: ${({ theme }) => theme.colors.background};
      border-bottom: 2px solid ${({ theme }) => theme.colors.background};
    }
  }`;

const NameCard = () => (
  <StyledNameCard>
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
