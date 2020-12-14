import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";
import { above, below } from "../components/styled/utilities";

export const GlobalStyles = createGlobalStyle`
${normalize()}

@import url('https://fonts.googleapis.com/css?family=Archivo+Black|Saira:400');

html {
    box-sizing: border-box;
    font-size: 100%;
  }
  
  *, *:before, *:after {
    box-sizing: inherit; 
  }

body {
  margin: 0;
  background-color: #0f0e17;
  font-family: 'Saira', sans-serif;
  font-weight: 400;
  line-height: 1.8;
}

p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

h1, h2, h3, h4, h5 {
  font-family: sans-serif;
  font-weight: 400;
  line-height: 1.2;
}

small, .text_small {font-size: 0.8rem;}

@media screen and (max-width: 600px) {
    html {
        font-size: 80%;
    }
  }
`;
