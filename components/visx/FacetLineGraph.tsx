// @ts-nocheck
import { economicsData } from "../data/gdpPerCapLifeExp"
import { group } from "d3"
import ParentSize from "@visx/responsive/lib/components/ParentSize"
import styled from "styled-components"
import LineChart from "./LineChart"

const Graph = styled.div`
  color: #a7a9be;

  svg {
    text {
      fill: #a7a9be;
      font-size: 0.7rem;
    }
  }
`

const StyledGrid = styled.div`
  display: grid;
  height: 600px;
  width: 100%;
  row-gap: 10px;
  grid-template-columns: repeat(5, minmax(100px, 1fr));
  grid-template-rows: repeat(2, minmax(100px, 1fr));

  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(100px, 1fr));
    grid-template-rows: repeat(5, minmax(100px, 1fr));
    height: 800px;
  }

  div {
    position: relative;
  }
`

const FacetLineGraph = () => {
  let data = economicsData

  const order = data
    .filter((row) => row.year === 2019)
    .sort((a, b) => a.gdpPerCap - b.gdpPerCap)
    .map((row) => row.country)

  data = data.sort(
    (a, b) => order.indexOf(b.country) - order.indexOf(a.country)
  )

  const dataGrouped = Array.from(
    group(data, (d) => d.country),
    ([key, value]) => ({ key, value })
  )

  return (
    <Graph style={{ width: "100%" }}>
      <h3>GDP Per Capita ($)</h3>
      <StyledGrid>
        {dataGrouped.map((data, i) => (
          <ParentSize key={i}>
            {({ width, height }) => (
              <LineChart
                dataKey={data.key}
                data={data.value}
                width={width}
                height={height}
                x='year'
                y='gdpPerCap'
              />
            )}
          </ParentSize>
        ))}
      </StyledGrid>
    </Graph>
  )
}

export default FacetLineGraph
