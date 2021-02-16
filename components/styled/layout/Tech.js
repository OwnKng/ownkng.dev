import styled from "styled-components"
import StyledExternalLink from "../element/StyledExternalLink"

const Tech = ({ className }) => (
  <div className={className}>
    <h3>The technologies I frequently use are</h3>
    <div className='flex'>
      <div>
        <div className='web'>
          <h4>Web dev</h4>
          <ul>
            <li>
              <StyledExternalLink href='https://reactjs.org/'>
                React
              </StyledExternalLink>
            </li>
            <li>
              <StyledExternalLink href='https://nextjs.org/'>
                Next.js
              </StyledExternalLink>
            </li>
            <li>
              <StyledExternalLink href='https://www.netlify.com/'>
                Netlify
              </StyledExternalLink>
            </li>
            <li>
              <StyledExternalLink href='https://vercel.com/'>
                Vercel
              </StyledExternalLink>
            </li>
            <li>
              <StyledExternalLink href='https://nodejs.org/en/'>
                Node.js
              </StyledExternalLink>
            </li>
            <li>
              <StyledExternalLink href='https://shiny.rstudio.com/'>
                R Shiny
              </StyledExternalLink>
            </li>
          </ul>
        </div>
        <div className='analysis'>
          <h4>Analysis</h4>
          <ul>
            <li>
              <StyledExternalLink href='https://www.r-project.org/'>
                R
              </StyledExternalLink>
            </li>
            <li>
              <StyledExternalLink href='https://www.tidyverse.org/'>
                Tidyverse
              </StyledExternalLink>
            </li>
            <li>
              <StyledExternalLink href='https://www.tidymodels.org/'>
                Tidymodels
              </StyledExternalLink>
            </li>
            <li>
              <StyledExternalLink href='https://r-spatial.github.io/sf/'>
                sf
              </StyledExternalLink>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className='viz'>
          <h4>Visualisation</h4>
          <ul>
            <li>
              <StyledExternalLink href='https://ggplot2.tidyverse.org/index.html'>
                ggplot
              </StyledExternalLink>
            </li>
            <li>
              <StyledExternalLink href='https://gganimate.com/index.html'>
                gganimate
              </StyledExternalLink>
            </li>
            <li>
              <StyledExternalLink href='https://airbnb.io/visx/'>
                visx
              </StyledExternalLink>
            </li>
            <li>
              <StyledExternalLink href='https://d3js.org/'>
                D3
              </StyledExternalLink>
            </li>
          </ul>
        </div>
        <div className='databases'>
          <h4>Databases and APIs</h4>
          <ul>
            <li>
              <StyledExternalLink href='https://www.mongodb.com/'>
                MongoDB
              </StyledExternalLink>
            </li>
            <li>
              <StyledExternalLink href=''>SQL</StyledExternalLink>
            </li>
            <li>
              <StyledExternalLink href='https://www.apollographql.com/'>
                Apollo
              </StyledExternalLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)

export default styled(Tech)`
  .flex {
    display: flex;
    justify-content: space-between;
  }

  h3 {
    padding-top: 20px;
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
`
