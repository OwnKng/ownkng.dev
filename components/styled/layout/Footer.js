import React from "react";
import styled from "styled-components";
import { theme } from "../utilities";

const Footer = ({ className }) => (
  <footer className={className}>
    <p>&#169; 2020 Owen King</p>
  </footer>
);

export default styled(Footer)`
  padding-top: 50px;
  text-align: center;
  color: ${({ theme }) => theme.colors.paragraph};

  p {
    font-size: 0.8rem;
  }
`;
