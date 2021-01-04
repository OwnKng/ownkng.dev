import styled from "styled-components";

const Tech = ({ className }) => (
  <div className={className}>
    <h3>The technologies I frequently use are</h3>
    <div className='grid'>
      <div className='web'>
        <h4>Web dev</h4>
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
            <a href='https://nodejs.org/en/'>Node.js</a>
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
            <a href='https://www.tidymodels.org/'>Tidymodels</a>
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
            <a href='https://www.mongodb.com/'>MongoDB</a>
          </li>
          <li>
            <a href=''>SQL</a>
          </li>
          <li>
            <a href='https://www.apollographql.com/'>Apollo</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default styled(Tech)`
  .grid {
    display: grid;
    grid-template-areas:
      "web analysis"
      "viz databases";
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr;
  }

  a {
    color: ${({ theme }) => theme.colors.paragraph};
    padding: 2px 0px 0px 0px;
    font-size: 1.2rem;

    :hover {
      color: ${({ theme }) => theme.colors.tertiary};
    }

    :visited {
      color: ${({ theme }) => theme.colors.stroke};
    }
  }

  h3 {
    padding-top: 0px;
  }

  h4 {
    font-size: 1.2rem;
    margin-bottom: 2px;
    color: ${({ theme }) => theme.colors.paragraph};
  }

  ul {
    list-style: none;
    padding: 0;
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
`;
