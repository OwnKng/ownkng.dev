import { LinkedinSquare, Github } from "@styled-icons/boxicons-logos";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useAppState } from "../../state";
import { useScrollFreeze } from "../../hooks";
import React from "react";
import Link from "next/link";

const StyledNav = styled(motion.div)`
width: 90%;
  max-width: 1400px;
  margin: 0px auto;
  text-align: right;

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

  a:hover {
    color: ${({ theme }) => theme.colors.tertiary};
  }

  a:hover svg {
    color: ${({ theme }) => theme.colors.tertiary};
  }
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

const NavWrapper = ({ className }) => {
  const { isMenuOpen, closeMenu } = useAppState();
  if (!isMenuOpen) return null;
  return (
    <div className={className}>
      <Nav isMenuOpen={isMenuOpen} closeMenu={closeMenu}></Nav>
    </div>
  );
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
          <li key={`link-${link.name}`}>
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
          <Link href='https://www.linkedin.com/in/owenrking/'>
            <a>
              <span style={{ fontSize: "1.2rem" }}>LinkedIn</span>
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
          <Link href='https://github.com/OwnKng'>
            <a>
              <span style={{ fontSize: "1.2rem" }}>GitHub</span>
              <Github size={30} style={{ paddingLeft: 10 }} />
            </a>
          </Link>
        </motion.li>
      </motion.ul>
    </StyledNav>
  );
};

export default styled(NavWrapper)`
  position: fixed;
  top: 4rem;
  height: 100vh;
  width: 100vw;
  z-index: 2;
  background: rgba(15, 14, 23, 0.4);
  backdrop-filter: blur(4px);
`;
