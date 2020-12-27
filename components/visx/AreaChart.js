import React, { useCallback } from "react";
import { AreaStack, Line, Bar } from "@visx/shape";
import { scaleLinear, scaleOrdinal } from "@visx/scale";
import { AxisBottom, AxisLeft, Axis } from "@visx/axis";
import { extent, format } from "d3";
import { LegendOrdinal, LegendLabel, LegendItem } from "@visx/legend";
import { localPoint } from "@visx/event";
import { useTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import styled from "styled-components";
import { motion } from "framer-motion";

const tooltipStyles = {
  ...defaultStyles,
  border: "1px solid #a7a9be",
  color: "#a7a9be",
  fontSize: "1rem",
  margin: 0,
  padding: "0 0.5rem 0.5rem 0.5rem",
};

const StyledTooltip = styled.div`
  h5 {
    color: black;
    margin: 0px;
    padding: 0px;
    text-align: center;
  }

  .row {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr;
    grid-auto-flow: rows;
    padding-bottom: 2px;
  }
`;

export const AreaChart = ({
  data,
  width,
  height,
  margin = { top: 40, bottom: 30, left: 40, right: 30 },
}) => {
  // create dimensions
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const legendGlyphSize = 10;

  // create accessor functions
  const x = (d) => d.year;
  const y0 = (d) => d[0];
  const y1 = (d) => d[1];

  const keys = Object.keys(data[0]).filter(
    (k) => k !== "iso2c" && k !== "country" && k !== "year"
  );

  // create scales
  const xScale = scaleLinear({
    range: [margin.left, innerWidth + margin.left],
    domain: extent(data, x),
  });

  const yScale = scaleLinear({
    range: [innerHeight + margin.top, margin.top],
  });

  const fillScale = scaleOrdinal({
    domain: keys,
    range: ["#045A8D", "#2B8CBE", "#74A9CF", "#BDC9E1", "#F1EEF6"],
  });

  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  } = useTooltip();

  // event handler
  const handleTooltip = useCallback(
    (event) => {
      const { x } = localPoint(event) || { x: 0 };
      let x0 = xScale.invert(x);
      x0 = Math.round(x0);
      let d = data.filter((row) => row.year === x0);

      const { y } = localPoint(event) || { y: 0 };

      showTooltip({
        tooltipData: d,
        tooltipLeft: xScale(x0),
        tooltipTop: y,
      });
    },
    [data, showTooltip, xScale]
  );

  return (
    <>
      <LegendOrdinal scale={fillScale} direction='row' labelMargin='0 15px 0 0'>
        {(labels) => (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                gridAutoFlow: "column",
              }}
            >
              <h4>Age</h4>
              {labels.map((label, i) => (
                <LegendItem key={i} margin='0 10px'>
                  <svg width={legendGlyphSize} height={legendGlyphSize}>
                    <rect
                      fill={label.value}
                      width={legendGlyphSize}
                      height={legendGlyphSize}
                    />
                  </svg>
                  <LegendLabel
                    style={{ color: "#5f6c7b", margin: `0 0 0 2px` }}
                    align='left'
                  >
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              ))}
            </div>
          </>
        )}
      </LegendOrdinal>
      <svg height={height} width={width}>
        <AreaStack
          top={margin.top}
          left={margin.left}
          data={data}
          keys={keys}
          x={(d) => xScale(x(d.data))}
          y0={(d) => yScale(y0(d))}
          y1={(d) => yScale(y1(d))}
        >
          {({ stacks, path }) =>
            stacks.map((stack) => (
              <motion.path
                initial={false}
                animate={{ d: path(stack) }}
                key={`stack-${stack.key}`}
                stroke={fillScale(stack.key)}
                strokeWidth={0.5}
                fill={fillScale(stack.key)}
              />
            ))
          }
        </AreaStack>
        <AxisLeft
          scale={yScale}
          left={margin.left}
          tickStroke='black'
          stroke='black'
          tickFormat={format(".0%")}
        />
        <Axis
          orientation='top'
          scale={xScale}
          top={margin.top}
          tickFormat={format("d")}
          tickStroke='black'
          stroke='black'
          numTicks={innerWidth > 500 ? 10 : 5}
        />
        <AxisBottom
          scale={xScale}
          top={innerHeight + margin.top}
          tickFormat={format("d")}
          tickStroke='black'
          stroke='black'
          numTicks={innerWidth > 500 ? 10 : 5}
        />
        <Bar
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill='transparent'
          rx={14}
          onTouchStart={handleTooltip}
          onTouchMove={handleTooltip}
          onMouseMove={handleTooltip}
          onMouseLeave={() => hideTooltip()}
        />
        {tooltipData && (
          <g>
            <Line
              from={{ x: tooltipLeft, y: margin.top }}
              to={{ x: tooltipLeft, y: innerHeight + margin.top }}
              stroke='black'
              opacity={0.5}
              strokeWidth={1}
              pointerEvents='none'
            />
          </g>
        )}
      </svg>
      {tooltipData && (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop - 12}
          left={tooltipLeft + 12}
          style={tooltipStyles}
        >
          <StyledTooltip>
            <h5>{tooltipData[0].year}</h5>
            {[...keys].reverse().map((key, i) => (
              <div className='row' key={`tooltip${i}`}>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    background: fillScale(key),
                  }}
                />
                <div>{key}</div>
                <div style={{ textAlign: "right" }}>
                  {format(".0%")(tooltipData[0][key])}
                </div>
              </div>
            ))}
          </StyledTooltip>
        </TooltipWithBounds>
      )}
    </>
  );
};

export default AreaChart;
