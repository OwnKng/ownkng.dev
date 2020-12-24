import { useCallback } from "react";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Text } from "@visx/text";
import { GridRows } from "@visx/grid";
import { scaleLinear } from "@visx/scale";
import { LinePath, AreaClosed } from "@visx/shape";
import { curveLinear } from "@visx/curve";
import { format, max } from "d3";
import { localPoint } from "@visx/event";
import { withTooltip, TooltipWithBounds } from "@visx/tooltip";

const Line = ({
  width,
  height,
  data,
  dataKey,
  x,
  y,
  margin = { left: 30, right: 20, top: 40, bottom: 25 },
  showTooltip,
  hideTooltip,
  tooltipData,
  tooltipLeft = 0,
  tooltipTop = 0,
}) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // create accessor functions
  const xAccessor = (d) => d[x];
  const yAccessor = (d) => d[y];

  // create scales
  const xScale = scaleLinear({
    range: [margin.left, innerWidth + margin.left],
    domain: [1960, 2019],
    nice: true,
  });

  const yScale = scaleLinear({
    range: [innerHeight + margin.top, margin.top],
    domain: [0, 60000],
    nice: true,
  });

  // Handle the tooltip
  const handleTooltip = useCallback(
    (event) => {
      const { x } = localPoint(event) || { x: 0 };
      let x0 = xScale.invert(x);
      x0 = Math.round(x0);
      if (x0 === 2020) x0 = 2019;
      let d = data.filter((row) => row.year === x0);
      let yMax = max(d, yAccessor);

      showTooltip({
        tooltipData: d,
        tooltipLeft: xScale(x0),
        tooltipTop: yScale(yMax),
      });
    },
    [data, yAccessor, showTooltip, yScale, xScale]
  );

  return (
    <>
      <svg width={width} height={height}>
        <Text
          x={width / 2}
          width={width}
          textAnchor='middle'
          y={margin.top / 2}
          style={{ fontSize: "1rem" }}
        >
          {dataKey}
        </Text>
        <rect
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill='#f4f7f9'
        />
        <GridRows
          scale={yScale}
          width={innerWidth}
          height={height - margin.top - margin.bottom}
          left={margin.left}
          stroke='white'
          numTicks={6}
        />
        <AxisBottom
          scale={xScale}
          top={innerHeight + margin.top}
          tickFormat={format("d")}
          tickStroke='#a7a9be'
          stroke='#a7a9be'
          numTicks={innerWidth < 100 ? 1 : 4}
        />
        <AreaClosed
          data={data}
          x={(d) => xScale(xAccessor(d))}
          y={(d) => yScale(yAccessor(d))}
          yScale={yScale}
          strokeWidth={2}
          curve={curveLinear}
          fill='#9bbce0'
        />
        <LinePath
          data={data}
          x={(d) => xScale(xAccessor(d))}
          y={(d) => yScale(yAccessor(d))}
          stroke='#061E39'
          strokeWidth={2}
          curve={curveLinear}
        />
        <AxisLeft
          scale={yScale}
          left={margin.left + 10}
          numTicks={5}
          top={-2}
          tickLabelProps={() => ({ fill: "#292f31", fontSize: 10 })}
          hideAxisLine={true}
          hideTicks={true}
          tickFormat={(v, t) => (t === 6 ? "" : format("~s")(v))}
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
        {tooltipData &&
          tooltipData.map((row) => (
            <circle
              cx={xScale(xAccessor(row))}
              cy={yScale(yAccessor(row))}
              r={5}
              stroke='#FFFFFE'
              fill='black'
              strokeWidth={1}
              pointerEvents='none'
            />
          ))}
      </svg>
      {tooltipData && (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop - 12}
          left={tooltipLeft + 12}
        >
          {tooltipData.map((row) => format("$.2~s")(row[y]))}
        </TooltipWithBounds>
      )}
    </>
  );
};

export default withTooltip(Line);
