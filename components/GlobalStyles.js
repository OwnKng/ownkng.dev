import { createGlobalStyle } from "styled-components"
import { normalize } from "polished"

export const GlobalStyles = createGlobalStyle`
${normalize()}

:root {
  --z-index-low: ${({ theme }) => theme.levels.low};
  --z-index-med: ${({ theme }) => theme.levels.medium};
  --z-index-high: ${({ theme }) => theme.levels.high};
  --z-index-highest: ${({ theme }) => theme.levels.highest};
}

html {
    box-sizing: border-box;
    font-size: 100%;
  }
  
  *, *:before, *:after {
    box-sizing: inherit; 
  }

body {
  margin: 0;
  background-color: #020A12;
  font-family: 'Saira', sans-serif;
  font-weight: 400;
  line-height: 1.8;
}

p {
    font-size: 1.4rem;
    margin-bottom: 1rem;
}

h1, h2 {
  font-family: 'Saira', sans-serif;
}

h3, h4, h5 {
  font-family: 'Saira', sans-serif;
}

h1, h2, h3, h4, h5 {
  font-weight: 400;
  line-height: 1.2;
  color: #fffffe;
}



small, .text_small {font-size: 0.8rem;}

@media screen and (max-width: 600px) {
    html {
        font-size: 80%;
    }
  }
`
