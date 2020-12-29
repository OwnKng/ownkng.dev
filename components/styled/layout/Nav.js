import { LinkedinSquare, Github } from "@styled-icons/boxicons-logos";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useAppState } from "../../state";
import { useScrollFreeze } from "../../hooks";
import React from "react";
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
    color: ${({ theme }) => theme.colors.buttonText};
  }

  a:visited {
    color: ${({ theme }) => theme.colors.buttonText};
  }

  svg {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.buttonText};
  }
`;

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
  transition: { type: "ease" },
};

const ulVariants = {
  open: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  closed: {},
};

const NavItem = React.forwardRef(({ onClick, href, linkName }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      {linkName}
    </a>
  );
});

const NavWrapper = () => {
  const { isMenuOpen, closeMenu } = useAppState();
  if (!isMenuOpen) return null;
  return <Nav isMenuOpen={isMenuOpen} closeMenu={closeMenu}></Nav>;
};

const Nav = ({ isMenuOpen, closeMenu }) => {
  useScrollFreeze();
  const liVariants = {
    open: {
      y: 0,
      opacity: 1,
    },
    closed: { y: 50, opacity: 0 },
  };

  const links = [
    { name: "Home", url: "/" },
    { name: "Thoughts", url: "/#thoughts" },
    { name: "About me", url: "/#about" },
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
          <li>
            <motion.div
              variants={liVariants}
              key={link.name}
              transition='transition'
            >
              <Link href={link.url} passHref>
                <NavItem linkName={link.name} onClick={() => closeMenu()} />
              </Link>
            </motion.div>
          </li>
        ))}
        <motion.li
          variants={liVariants}
          transition='transition'
          style={{ paddingTop: "1rem" }}
        >
          <Link href='/'>
            <a>
              <span style={{ fontSize: "1rem" }}>LinkedIn</span>
              <LinkedinSquare
                size={30}
                style={{
                  paddingLeft: 10,
                }}
              />
            </a>
          </Link>
        </motion.li>
        <motion.li variants={liVariants} transition='transition'>
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
