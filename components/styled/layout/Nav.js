import { LinkedinSquare, Github } from "@styled-icons/boxicons-logos";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useAppState } from "../../state";
import Link from "next/link";

const StyledNav = styled(motion.div)`
  position: fixed;
  left: 0px;
  top: 4rem;
  height: 100vh;
  width: 100vw;
  margin: 0px auto;
  text-align: center;
  z-index: 1;
  color: ${({ theme }) => theme.colors.buttonText};

  background: rgba(15, 14, 23, 0.4);
  backdrop-filter: blur(4px);

  li {
    list-style-type: none;
    font-size: 2em;
    margin: 2rem;
    font-weight: bold;
    overflow: hidden;
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }

  a:visited {
    color: ${({ theme }) => theme.colors.buttonText};
  }

  svg {
    font-size: 1rem;
  }
`;

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const ulVariants = {
  open: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  closed: {},
};

const NavWrapper = () => {
  const { isMenuOpen } = useAppState();
  if (!isMenuOpen) return null;
  return <Nav isMenuOpen={isMenuOpen}></Nav>;
};

const Nav = ({ isMenuOpen }) => {
  const liVariants = {
    open: {
      y: 0,
      opacity: 1,
    },
    closed: { y: 20, opacity: 0 },
  };

  const links = [
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: "Bio", url: "/bio" },
  ];

  return (
    <StyledNav
      variant={variants}
      initial='closed'
      animate={isMenuOpen ? "open" : "closed"}
      transition={{ damping: 300 }}
    >
      <motion.ul variants={ulVariants}>
        {links.map((link) => (
          <motion.li variants={liVariants} key={link.name}>
            <Link href='/'>{link.name}</Link>
          </motion.li>
        ))}
        <motion.li variants={liVariants} style={{ paddingTop: "1rem" }}>
          <Link href='/'>
            <a>
              <span style={{ color: "rgb(30, 116, 179)", fontSize: "1rem" }}>
                LinkedIn
              </span>
              <LinkedinSquare
                size={30}
                style={{
                  paddingLeft: 10,
                  color: "rgb(30, 116, 179)",
                }}
              />
            </a>
          </Link>
        </motion.li>
        <motion.li variants={liVariants}>
          <Link href=''>
            <a>
              <span style={{ fontSize: "1rem" }}>GitHub</span>
              <Github size={30} style={{ paddingLeft: 10 }} />
            </a>
          </Link>
        </motion.li>
      </motion.ul>
    </StyledNav>
  );
};

export default NavWrapper;
