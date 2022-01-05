//@ts-nocheck ts-ignore
import { ParentSize } from "@visx/responsive"
import { format, quantile, rollup } from "d3"
import { scaleBand, scaleLinear } from "@visx/scale"
import { BoxPlot } from "@visx/stats"
import { Axis, AxisLeft } from "@visx/axis"
import styled from "styled-components"
import { useTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip"
import { useCallback } from "react"
import { useColorScale, useSummary } from "../hooks"
import { useState } from "react"
import { Button } from "../../styled/element/Button"

const Boxplot = ({
  data,
  width,
  height,
  margin = { top: 40, left: 240, right: 20, bottom: 40 },
  x,
  y,
  color,
}: any) => {
  if (width < 400) margin.left = 170
  // set dimensions
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  // Accessors
  const getX = (d) => d[x]
  const getY = (d) => d[y]
  const getColor = (d) => d[color]

  const { summarise } = useSummary()

  const summary = Array.from(
    rollup(
      data,
      (v) => summarise(v, getX),
      (d) => d.cluster
    ),
    ([key, value]) => ({ cluster: key, boxplot: value })
  )

  const keysReorderd = summary
    .map((d) => {
      return { cluster: d.cluster, median: d.boxplot.median }
    })
    .sort((a, b) => b.median - a.median)
    .map((d) => d.cluster)

  // create scales
  const yScale = scaleBand({
    range: [margin.top, innerHeight + margin.top],
    domain: keysReorderd,
    padding: 0.5,
  })

  const boxWidth = yScale.bandwidth()

  const xScale = scaleLinear({
    range: [margin.left, innerWidth + margin.left],
    round: true,
    domain: [-2.5, 2.5],
    nice: true,
  })

  const { colorScale } = useColorScale([
    ...new Set(data.map((d) => getColor(d))),
  ])

  // Handle the tooltip
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipOpen,
    tooltipTop = 0,
    tooltipLeft = 0,
  } = useTooltip()

  let tooltipTimeout

  const handleMouseMove = useCallback(
    (cluster) => {
      if (tooltipTimeout) clearTimeout(tooltipTimeout)
      const hovered = summary.filter((d) => d.cluster === cluster)
      const { boxplot } = hovered[0]

      showTooltip({
        tooltipTop: yScale(cluster) ?? 0 + 40,
        tooltipLeft: xScale(boxplot.median) + boxWidth + 5,
        tooltipData: {
          cluster,
          ...boxplot,
        },
      })
    },
    [boxWidth, xScale, yScale, summary, showTooltip, tooltipTimeout]
  )

  const handleMouseLeave = useCallback(() => {
    tooltipTimeout = window.setTimeout(() => {
      hideTooltip()
    }, 1500)
  }, [hideTooltip])

  return (
    <div>
      <svg width={width} height={height}>
        <rect
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill='#0B1E31'
          stroke='#a7a9be'
        />
        {summary.map(({ cluster, boxplot }, i) => (
          <BoxPlot
            horizontal={true}
            key={`box-${i}`}
            min={boxplot.min}
            max={boxplot.max}
            boxWidth={boxWidth}
            top={yScale(cluster)}
            firstQuartile={boxplot.q1}
            thirdQuartile={boxplot.q3}
            median={boxplot.median}
            valueScale={xScale}
            fill={colorScale(cluster)}
            fillOpacity={0.2}
            stroke={colorScale(cluster)}
            strokeWidth={2}
            outliers={boxplot.outliers}
            boxProps={{
              onMouseOver: () => {
                handleMouseMove(cluster)
              },
              onMouseLeave: () => {
                handleMouseLeave()
              },
            }}
          />
        ))}
        {data.map((d, i) => (
          <line
            key={`rug-${i}`}
            x1={xScale(getX(d))}
            y1={yScale(getY(d)) + boxWidth}
            x2={xScale(getX(d))}
            y2={yScale(getY(d)) + boxWidth + 10}
            opacity={0.5}
            stroke={colorScale(getColor(d))}
            strokeWidth={1}
          />
        ))}
        <Axis
          orientation='bottom'
          scale={xScale}
          top={innerHeight + margin.top}
          tickStroke='#a7a9be'
          stroke='#a7a9be'
          numTicks={4}
        />
        <AxisLeft
          scale={yScale}
          left={margin.left}
          tickStroke='#a7a9be'
          stroke='#a7a9be'
        />
      </svg>
      {tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (
        <TooltipWithBounds
          left={tooltipLeft}
          top={tooltipTop}
          style={defaultStyles}
        >
          <div className='tooltip-information'>
            <span
              style={{
                color: colorScale(tooltipData.cluster),
              }}
            >
              {tooltipData.cluster}
            </span>
            <div className='tooltip-row'>
              <span>Median</span>
              <span style={{ textAlign: "right" }}>
                {format(".2")(tooltipData.median)}
              </span>
            </div>
          </div>
        </TooltipWithBounds>
      )}
    </div>
  )
}

const BoxplotWrapper = ({ data, y, color, className }: any) => {
  // State
  const [x, setX] = useState("rule_of_law")

  const setTitle = (selected) => {
    let title
    switch (selected) {
      case "rule_of_law":
        title = "Rule of law"
        break
      case "government_effectiveness":
        title = "Government effectiveness"
        break
      default:
        title = "Regulatory quality"
    }

    return title
  }

  return (
    <div className={className}>
      <div>
        <h3>{`Worldwide governance indicators: ${setTitle(x)}`}</h3>
        <span>Select indicator</span>
        <Button
          style={{
            color: x === "rule_of_law" ? `#00A7E1` : `#a7a9be`,
          }}
          onClick={() => setX("rule_of_law")}
        >
          Rule of Law
        </Button>
        <Button
          style={{
            color: x === "government_effectiveness" ? `#00A7E1` : `#a7a9be`,
          }}
          onClick={() => setX("government_effectiveness")}
        >
          Government Effectiveness
        </Button>
        <Button
          style={{
            color: x === "regulatory_quality" ? `#00A7E1` : `#a7a9be`,
          }}
          onClick={() => setX("regulatory_quality")}
        >
          Regulatory Quality
        </Button>
        <div className='viz'>
          <ParentSize>
            {({ width, height }) => (
              <Boxplot
                data={data}
                x={x}
                y={y}
                color={color}
                width={width}
                height={height}
              />
            )}
          </ParentSize>
        </div>
      </div>
    </div>
  )
}

export default styled(BoxplotWrapper)`
  left: calc(-35vw + 50%);
  width: 70vw;
  overflow: hidden;

  position: relative;
  color: #a7a9be;
  font-size: 0.8rem;
  margin: 10px 10px 50px 10px;

  .viz {
    height: 550px;
    position: relative;
  }

  .legend-title {
    align-self: flex-start;
  }

  .tooltip-information {
    display: flex;
    flex-direction: column;
  }

  .tooltip-row {
    display: grid;
    max-width: 200px;
    grid-template-columns: 4fr 1fr;
    grid-template-rows: 1fr;
  }

  svg text {
    fill: #a7a9be;
    font-size: 0.8rem;
  }

  .legend {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-around;
    gap: 2px;
  }

  @media only screen and (max-width: 1000px) {
    width: 100%;
    left: 0px;

    .viz {
      height: 500px;
    }

    .legend {
      grid-template-columns: 1fr 1fr;
    }
  }
`
