import styled from "styled-components";
import { DiagonalArrowRightUp } from "@styled-icons/evaicons-solid/DiagonalArrowRightUp";

const Tech = ({ className }) => (
  <div className={className}>
    <div className='title'>
      <h3>My prefered tech stack</h3>
    </div>
    <div className='web'>
      <h4>Web Dev</h4>
      <ul>
        <li>
          <a href='https://reactjs.org/'>React</a>
        </li>
        <li>
          <a href='https://nextjs.org/'>Next.js</a>
        </li>
        <li>
          <a href='https://www.netlify.com/'>Netlify</a>
        </li>
        <li>
          <a href='https://vercel.com/'>Vercel</a>
        </li>
        <li>
          <a href='https://shiny.rstudio.com/'>R Shiny</a>
        </li>
      </ul>
    </div>
    <div className='analysis'>
      <h4>Analysis</h4>
      <ul>
        <li>
          <a href='https://www.r-project.org/'>R</a>
        </li>
        <li>
          <a href='https://www.tidyverse.org/'>Tidyverse</a>
        </li>
        <li>
          <a href='https://r-spatial.github.io/sf/'>sf</a>
        </li>
      </ul>
    </div>
    <div className='viz'>
      <h4>Visualisation</h4>
      <ul>
        <li>
          <a href='https://ggplot2.tidyverse.org/index.html'>ggplot</a>
        </li>
        <li>
          <a href='https://gganimate.com/index.html'>gganimate</a>
        </li>
        <li>
          <a href='https://airbnb.io/visx/'>visx</a>
        </li>
        <li>
          <a href='https://d3js.org/'>D3</a>
        </li>
      </ul>
    </div>
    <div className='databases'>
      <h4>Databases and APIs</h4>
      <ul>
        <li>
          <a href='https://reactjs.org/'>MongoDB</a>
        </li>
        <li>
          <a href='https://reactjs.org/'>SQL</a>
        </li>
        <li>
          <a href='https://reactjs.org/'>Apollo</a>
        </li>
      </ul>
    </div>
  </div>
);

export default styled(Tech)`
  display: grid;
  grid-template-areas:
    "title title title title"
    "web analysis viz databases";
  grid-template-rows: auto 2fr;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.boxShadow};

  a {
    color: ${({ theme }) => theme.colors.paragraph};
    padding: 2px 0px 0px 0px;
    font-size: 1.2rem;
  }

  a:hover {
    color: white;
  }

  h3 {
    padding-top: 0px;
  }

  h4 {
    font-size: 1.2rem;
    margin-bottom: 2px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      color: ${({ theme }) => theme.colors.stroke};
    }
  }

  .title {
    width: 100%;
    grid-area: title;
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.boxShadow};
  }

  .web {
    grid-area: web;
  }

  .analysis {
    grid-area: analysis;
  }

  .viz {
    grid-area: viz;
  }

  .databases {
    grid-area: databases;
  }

  @media only screen and (max-width: 600px) {
    grid-template-areas:
      "title"
      "web"
      "analysis"
      "viz"
      "databases";
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    justify-items: start;

    ul,
    h4 {
      padding: 0px 50px;
    }
  }
`;
