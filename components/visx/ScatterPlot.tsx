// @ts-nocheck
import React, { useEffect, useCallback, useRef, useMemo } from "react"
import { scaleLinear, scaleLog, scaleSqrt, scaleOrdinal } from "@visx/scale"
import { extent, format } from "d3"
import { LegendOrdinal, LegendItem, LegendLabel } from "@visx/legend"
import { Group } from "@visx/group"
import { Circle } from "@visx/shape"
import { Axis, AxisLeft } from "@visx/axis"
import { GridColumns } from "@visx/grid"
import { useTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip"
import { localPoint } from "@visx/event"
import { voronoi } from "@visx/voronoi"
import styled from "styled-components"
import { data } from "../data/gdpPerCap"
import { Text } from "@visx/text"

const Graph = styled.div`
  color: #a7a9be;

  svg {
    text {
      fill: #a7a9be;
      font-size: 1rem;
    }
  }
`

const StyledTooltip = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
`

const tooltipStyles = {
  ...defaultStyles,
  background: `rgba(255, 255, 255, 0.8)`,
  border: "1px solid #5f6c7b",
  color: "#5f6c7b",
  fontSize: "1rem",
  padding: "0.5rem",
}

const ScatterPlot = ({
  width,
  height,
  margin = { top: 30, left: 60, right: 10, bottom: 50 },
}) => {
  // set the dimensions of the plot
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const legendGlyphSize = 10

  // accessors
  const x = (d) => d.gdpPerCap
  const y = (d) => d.lifeExpectancy
  const radius = (d) => d.population
  const color = (d) => d.region

  // scales
  const xScale = scaleLog({
    range: [margin.left, innerWidth + margin.left],
    domain: extent(data, x),
  })

  const yScale = scaleLinear({
    range: [innerHeight + margin.top, margin.top],
    domain: extent(data, y),
    nice: true,
  })

  const colorScale = scaleOrdinal({
    range: ["#ff8906", "#3da9fc", "#ef4565", "#7f5af0", "#2cb67d"],
    domain: [...new Set(data.map(color))],
  })

  const rScale = scaleSqrt({
    range: [3, 30],
    domain: extent(data, radius),
  })

  // Event handlers for tooltips
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipOpen,
    tooltipTop = 0,
    tooltipLeft = 0,
  } = useTooltip()

  const voronoiLayout = useMemo(
    () =>
      voronoi({
        x: (d) => xScale(x(d)) ?? 0,
        y: (d) => yScale(y(d)) ?? 0,
        width,
        height,
      })(data),
    [data, width, height, xScale, yScale]
  )

  let tooltipTimeout
  const svgRef = useRef(null)

  const handleMouseMove = useCallback(
    (event) => {
      if (tooltipTimeout) clearTimeout(tooltipTimeout)
      if (!svgRef.current) return

      // find the nearest polygon to the current mouse position
      const point = localPoint(svgRef.current, event)
      if (!point) return
      const neighborRadius = 100
      const closest = voronoiLayout.find(point.x, point.y, neighborRadius)
      if (closest) {
        showTooltip({
          tooltipLeft: xScale(x(closest.data)),
          tooltipTop: yScale(y(closest.data)),
          tooltipData: closest.data,
        })
      }
    },
    [xScale, yScale, showTooltip, voronoiLayout, tooltipTimeout]
  )

  const handleMouseLeave = useCallback(() => {
    tooltipTimeout = window.setTimeout(() => {
      hideTooltip()
    }, 1500)
  }, [hideTooltip])

  // Sort the data so that the largest populations are plotted first
  useEffect(() => {
    data.sort((a, b) => b.population - a.population)
  }, [data])

  return (
    <Graph>
      <LegendOrdinal scale={colorScale} labelFormat={(label) => `${label}`}>
        {(labels) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "0.5rem",
              justifyContent: "space-around",
            }}
          >
            {labels.map((label, i) => (
              <LegendItem key={i} margin='0 10px'>
                <svg width={legendGlyphSize} height={legendGlyphSize}>
                  <rect
                    fill={label.value}
                    width={legendGlyphSize}
                    height={legendGlyphSize}
                    rx={5}
                  />
                </svg>
                <LegendLabel style={{ margin: `0 0 0 10px` }} align='left'>
                  {label.text}
                </LegendLabel>
              </LegendItem>
            ))}
          </div>
        )}
      </LegendOrdinal>
      <svg width={width} height={height} ref={svgRef}>
        <rect
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill='#111E2D'
          stroke='#a7a9be'
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseLeave}
        />
        <AxisLeft
          scale={yScale}
          left={margin.left}
          tickStroke='#a7a9be'
          stroke='#a7a9be'
          label='Life expectancy'
        />
        <Axis
          orientation='top'
          scale={xScale}
          top={margin.top}
          tickFormat={format("$~s")}
          numTicks={2}
          tickStroke='transparent'
          stroke='transparent'
        />
        <Axis
          orientation='bottom'
          scale={xScale}
          top={innerHeight + margin.top}
          tickFormat={format("$~s")}
          numTicks={2}
          tickStroke='#a7a9be'
          stroke='#a7a9be'
          label='GDP per cap'
        />
        <GridColumns
          top={margin.top}
          scale={xScale}
          height={innerHeight}
          stroke='#a7a9be'
          strokeOpacity={0.3}
          pointerEvents='none'
          numTicks={2}
        />
        <Text
          x={width * 0.75}
          width={width}
          textAnchor='middle'
          y={yScale(51)}
          style={{ fontSize: "1.4rem" }}
        >
          Rich &rarr;
        </Text>
        <Text
          x={width / 2}
          width={width}
          textAnchor='middle'
          y={yScale(51)}
          style={{ fontSize: "2rem" }}
        >
          INCOME
        </Text>
        <Text
          x={width * 0.25}
          width={width}
          textAnchor='middle'
          y={yScale(51)}
          style={{ fontSize: "1.2rem" }}
        >
          &larr; Poor
        </Text>
        <Text
          x={xScale(400)}
          width={height}
          textAnchor='middle'
          angle={270}
          y={height * 0.2}
          style={{ fontSize: "1.2rem" }}
        >
          Healthy &rarr;
        </Text>
        <Text
          x={xScale(400)}
          width={height}
          angle={270}
          textAnchor='middle'
          y={height / 2}
          style={{ fontSize: "2rem" }}
        >
          HEALTH
        </Text>
        <Text
          x={xScale(400)}
          width={height}
          textAnchor='middle'
          angle={270}
          y={height * 0.8}
          style={{ fontSize: "1.2rem" }}
        >
          &larr; Sick
        </Text>
        <Group pointerEvents='none'>
          {data.map((point, i) => (
            <Circle
              key={i}
              cx={xScale(x(point))}
              cy={yScale(y(point))}
              r={rScale(radius(point))}
              fill={colorScale(color(point))}
              fillOpacity={0.8}
              stroke={
                tooltipData === point ? "white" : colorScale(color(point))
              }
            />
          ))}
        </Group>
      </svg>
      {tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (
        <TooltipWithBounds
          left={tooltipLeft + 10}
          top={tooltipTop + 10}
          style={tooltipStyles}
        >
          <h3
            style={{
              color: colorScale(color(tooltipData)),
              paddding: 0,
              margin: 0,
            }}
          >
            {tooltipData.country}
          </h3>
          <StyledTooltip>
            <div>GDP per cap</div>
            <div style={{ textAlign: "right" }}>{`${format("$.2~s")(
              x(tooltipData)
            )}`}</div>
            <div>Life Expectancy</div>
            <div style={{ textAlign: "right" }}>
              {Math.round(y(tooltipData))}
            </div>
            <div>Population</div>
            <div style={{ textAlign: "right" }}>{`${Math.round(
              radius(tooltipData)
            )}m`}</div>
          </StyledTooltip>
        </TooltipWithBounds>
      )}
    </Graph>
  )
}

export default ScatterPlot
