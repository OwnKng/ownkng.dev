import styled from "styled-components";
import { motion } from "framer-motion";
import Voronoi from "../../visx/Voronoi";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { DownArrowAlt } from "@styled-icons/boxicons-regular/DownArrowAlt";
import { elevation } from "../utilities";

const divVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.4,
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
        <DownArrowAlt size={50} color={"#a7a9be"} />
        <DownArrowAlt size={50} color={"#a7a9be"} />
      </motion.div>
    </div>
  </motion.div>
);

export default styled(Hero)`
  width: 100%;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors.boxShadow};

  .heroPlot {
    height: 80vh;
  }

  .scrollPrompt {
    align-items: top;
    width: 100%;
    height: 9vh;
    display: flex;
    color: white;
    justify-content: space-between;
  }

  @media only screen and (max-width: 480px) {
    .heroPlot {
      height: 600px;
    }
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
        color:  ${({ theme }) => theme.colors.paragraph};
        font-family: 'Saira', sans-serif;
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
        I analyse, visualise and model data using modern tech
      </motion.h2>
    </div>
  </StyledNameCard>
);
