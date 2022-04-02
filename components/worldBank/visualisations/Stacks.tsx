// @ts-nocheck
import { withParentSize } from "@visx/responsive"
import { Axis } from "@visx/axis"
import { demographics } from "../data/demographics"
import { format, group } from "d3"
import { scaleLinear, scaleBand } from "@visx/scale"
import styled from "styled-components"
import { useTooltip, TooltipWithBounds } from "@visx/tooltip"
import { useCallback } from "react"
import { Text } from "@visx/text"
import { useColorScale } from "../hooks"
import { LegendOrdinal, LegendItem, LegendLabel } from "@visx/legend"

const Stack = ({
  data,
  parentHeight,
  parentWidth,
  x,
  y,
  color,
  colorScale,
  margin = { top: 20, bottom: 60, left: 40, right: 20 },
}) => {
  if (parentWidth < 100) return null

  const innerWidth = parentWidth - margin.left - margin.right
  const innerHeight = parentHeight - margin.top - margin.bottom

  // Scales
  const xScale = scaleBand({
    domain: [...new Set(data.map((d) => x(d)))],
    range: [margin.left, innerWidth + margin.left],
    padding: 0.25,
  })

  const bandwidth = xScale.bandwidth()

  const yScale = scaleLinear({
    domain: [0, 35],
    range: [innerHeight + margin.top, margin.top],
    nice: true,
  })

  const stacks = Array.from(
    group(data, (d) => d.cut),
    ([, value]) => value.sort((a, b) => b.n - a.n)
  )

  // Tooltip
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipOpen,
    tooltipTop = 0,
    tooltipLeft = 0,
  } = useTooltip()

  let tooltipTimeout

  const handleMouseEnter = useCallback(
    (stack) => {
      if (stack) {
        showTooltip({
          tooltipLeft: xScale(x(stack)) + 5,
          tooltipTop: yScale(y(stack)),
          tooltipData: stack,
        })
      }
    },
    [x, y, xScale, yScale, showTooltip, tooltipTimeout]
  )

  const handleMouseLeave = useCallback(() => {
    tooltipTimeout = window.setTimeout(() => {
      hideTooltip()
    }, 5000)
  }, [hideTooltip])

  const siFormat = format(".2~s")

  const formatBigNumber = (number) =>
    siFormat(number).replace("G", "B").replace("k", "K")

  return (
    <div>
      <svg width={parentWidth} height={parentHeight}>
        <rect
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill='#0B1E31'
          stroke='#a7a9be'
          onMouseLeave={() => handleMouseLeave()}
          onTouchEnd={() => handleMouseLeave()}
        />
        {stacks.map((stacks) =>
          stacks.map((stack, i) => (
            <rect
              key={`barStack-${i}`}
              x={xScale(x(stack))}
              y={yScale(y(stack))}
              width={bandwidth}
              height={yScale(y(stack) - 1) - yScale(y(stack))}
              stroke={"#111E2D"}
              strokeWidth={0.4}
              opacity={tooltipData === stack ? 1.0 : 0.8}
              fill={colorScale(color(stack))}
              onMouseMove={() => handleMouseEnter(stack)}
              onTouchMove={() => handleMouseEnter(stack)}
            />
          ))
        )}
        <Axis
          orientation='bottom'
          scale={xScale}
          top={innerHeight + margin.top}
          tickStroke='#a7a9be'
          stroke='#a7a9be'
          tickLabelProps={(value) => ({
            textAnchor: parentWidth > 400 ? "middle" : "start",
            transform:
              parentWidth > 400
                ? ""
                : `rotate(90 ${xScale(value) + bandwidth / 2}, 15)`,
          })}
        />
        <Axis
          orientation='left'
          numTicks={5}
          left={margin.left}
          scale={yScale}
          tickStroke='#a7a9be'
          stroke='#a7a9be'
          label='Number of countries'
        />
        <Text
          x={xScale("15 - 20%")}
          y={margin.top + 30}
          style={{ fontSize: "0.9rem" }}
          verticalAnchor='start'
          width={100}
        >
          &larr; More young people
        </Text>
        <Text
          x={xScale("60 - 65%")}
          y={margin.top + 30}
          style={{ fontSize: "0.9rem" }}
          textAnchor='end'
          verticalAnchor='start'
          width={100}
        >
          More old people &rarr;
        </Text>
      </svg>
      {tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (
        <TooltipWithBounds left={tooltipLeft} top={tooltipTop}>
          <span
            style={{
              color: `${colorScale(color(tooltipData))}`,
              size: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {tooltipData.country_name}
          </span>
          <div className='tooltip-row'>
            <span>Population</span>
            <span>{formatBigNumber(tooltipData["Population, total"])}</span>
          </div>
          <div className='tooltip-row'>
            <span>Over 40</span>
            <span>{format(".01%")(tooltipData.population_aged_over_40)}</span>
          </div>
          <div
            className='grid'
            style={{
              gridTemplateColumns: `calc(100% * ${tooltipData.population_aged_over_40}) auto`,
            }}
          >
            <div style={{ background: `${colorScale(color(tooltipData))}` }} />
            <div style={{ background: "#a7a9be" }} />
          </div>
        </TooltipWithBounds>
      )}
    </div>
  )
}

const Legend = ({ colorScale }) => (
  <div className='legend'>
    <LegendOrdinal scale={colorScale}>
      {(labels) =>
        labels.map((label) => {
          if (label.text === "null") return
          return (
            <LegendItem key={`legend-${label.text}-${label.index}`}>
              <svg width={10 * 2} height={10 * 2}>
                <circle fill={colorScale(label.text)} r={10} cx={10} cy={10} />
              </svg>
              <LegendLabel>{label.text}</LegendLabel>
            </LegendItem>
          )
        })
      }
    </LegendOrdinal>
  </div>
)

const ResponsiveStack = withParentSize(Stack)

const StackWrapper = ({ className }) => {
  const x = (d) => d["cut"]
  const y = (d) => d["n"]
  const color = (d) => d["cluster_label"]

  const { colorScale } = useColorScale([
    ...new Set(demographics.map((d) => color(d))),
  ])

  return (
    <div className={className}>
      <h3>Population over 40, % of total</h3>
      <span>Each rectangle represents a country</span>
      <Legend colorScale={colorScale} />
      <div className='viz'>
        <ResponsiveStack
          data={demographics}
          x={x}
          y={y}
          color={color}
          colorScale={colorScale}
        />
      </div>
    </div>
  )
}

export default styled(StackWrapper)`
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

  .tooltip-row {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }

  .grid {
    display: grid;
    width: 100%;
    grid-template-areas: "bar background";
    height: 5px;
  }
`
