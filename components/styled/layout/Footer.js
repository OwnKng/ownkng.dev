import React from "react";
import styled from "styled-components";
import { theme } from "../utilities";

const Footer = ({ className }) => (
  <footer className={className}>
    <p>&#169; 2020 Owen King</p>
  </footer>
);

export default styled(Footer)`
  margin: 0 5%;
  padding-top: 50px;
  text-align: center;
  color: ${({ theme }) => theme.colors.paragraph};
  border-top: 1px solid ${({ theme }) => theme.colors.boxShadow};
  border-left: 1px solid ${({ theme }) => theme.colors.boxShadow};
  border-right: 1px solid ${({ theme }) => theme.colors.boxShadow};

  p {
    font-size: 0.8rem;
    margin-bottom: 0px;
  }
`;
