import { ParentSize } from "@visx/responsive"
import styled from "styled-components"
import { useDensity, useSummary } from "../hooks"
import { scaleLinear } from "@visx/scale"
import { area, curveBasis } from "d3-shape"
import { group, max } from "d3"
import { AxisLeft, Axis } from "@visx/Axis"
import { GridRows } from "@visx/grid"
import { useColorScale } from "../hooks"
import { useTooltip, TooltipWithBounds } from "@visx/tooltip"
import { useCallback } from "react"
import { Text } from "@visx/text"

const Density = ({
  data,
  x,
  xScale,
  color,
  width,
  height,
  margin = { top: 20, left: 5, right: 20, bottom: 20 },
}) => {
  // Set dimensions
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  // Accessors
  const getX = (d) => d[x]

  xScale.range([margin.left, innerWidth + margin.left])

  const yScale = scaleLinear({
    range: [innerHeight + margin.top, margin.top],
    domain: [0, 0.15],
  })

  const lineGenerator = area()
    .x((d) => xScale(d[0]) ?? 0)
    .y0(yScale(0))
    .y1((d) => yScale(d[1]) ?? 0)
    .curve(curveBasis)

  const { density } = useDensity()
  const { summarise } = useSummary()

  const datum = density(data, 5, getX, xScale)
  const summary = summarise(data, getX)

  // Handle the tooltip
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip()

  const handleTooltip = useCallback(
    (event) => {
      const { median } = summary

      showTooltip({
        tooltipData: median,
        tooltipLeft: xScale(median),
        tooltipTop: innerHeight + margin.top,
      })
    },
    [datum, xScale]
  )

  return (
    <>
      <svg width={width} height={height}>
        <rect
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill='#0B1E31'
          strokeOpacity={1}
        />
        <GridRows
          left={margin.left}
          scale={yScale}
          width={innerWidth}
          stroke='#08121C'
          strokeWidth={2}
          pointerEvents='none'
          numTicks={3}
        />
        <path
          d={lineGenerator(datum)}
          key={color}
          stroke={color}
          fill={color}
          fillOpacity={0.6}
          strokeWidth={2}
        />
        {data.map((d, i) => (
          <line
            key={`density-rug-line-${i}`}
            x1={xScale(getX(d))}
            x2={xScale(getX(d))}
            y1={innerHeight + margin.top}
            y2={innerHeight + margin.top - 10}
            stroke={color}
            strokeWidth={1}
          />
        ))}
        <AxisLeft
          scale={yScale}
          left={margin.left + 10}
          numTicks={3}
          top={-2}
          tickLabelProps={() => ({ fill: "#292f31", fontSize: 10 })}
          hideAxisLine={true}
          hideTicks={true}
        />
        <Axis
          orientation='bottom'
          numTicks={4}
          top={innerHeight + margin.top}
          scale={xScale}
          tickStroke='#a7a9be'
          stroke='#a7a9be'
        />
        <rect
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill='transparent'
          onTouchStart={handleTooltip}
          onTouchMove={handleTooltip}
          onMouseMove={handleTooltip}
          onMouseLeave={() => hideTooltip()}
        />
      </svg>
      {tooltipData && (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft}>
          Median: {tooltipData}
        </TooltipWithBounds>
      )}
    </>
  )
}

const DensityWrapper = ({ className, data, x, color }) => {
  const dataGrouped = Array.from(
    group(data, (d) => d.cluster),
    ([key, value]) => ({ cluster: key, data: value })
  )

  const { colorScale } = useColorScale(data.map((d) => d[color]))

  const xScale = scaleLinear({
    domain: [0, max(data, (d) => d[x])],
  })

  return (
    <div className={className}>
      <h3>{`Density of ${
        x === "cl_rating" ? "civil liberties" : "political rights"
      } scores`}</h3>
      <div className='grid'>
        {dataGrouped.map((d, i) => (
          <div key={`density-group-${i}`}>
            <h5
              style={{
                color: colorScale(d.cluster),
              }}
            >
              {d.cluster}
            </h5>
            <div className='panel'>
              <ParentSize>
                {({ width, height }) => (
                  <Density
                    data={d.data}
                    color={colorScale(d.cluster)}
                    width={width}
                    height={height}
                    x={x}
                    xScale={xScale}
                  />
                )}
              </ParentSize>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default styled(DensityWrapper)`
  position: relative;
  left: calc(-35vw + 50%);
  width: 70vw;

  h4 {
    margin: 5px 0px 10px 5px;
  }

  h5 {
    margin-left: 5px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .panel {
    height: 500px;
    position: relative;
  }

  svg text {
    fill: #a7a9be;
    font-size: 0.8rem;
  }

  @media only screen and (max-width: 1000px) {
    width: 100%;
    left: 0px;

    .grid {
      grid-template-columns: 1fr 1fr;
      grid-auto-flow: rows;
    }

    gap: 20px;

    .panel {
      height: 250px;
    }
  }
`
