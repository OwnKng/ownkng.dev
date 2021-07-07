import { useCallback } from "react"
import { ParentSize } from "@visx/responsive"
import { Mercator } from "@visx/geo"
import { world } from "../data/world-map"
import { LegendOrdinal, LegendItem, LegendLabel } from "@visx/legend"
import { useTooltip, TooltipWithBounds } from "@visx/tooltip"
import { localPoint } from "@visx/event"
import { useColorScale } from "../hooks"
import styled from "styled-components"

// Accessor functions
const getClusters = (d) => d.cluster

// Scales
const colors = [
  ...new Set(world.features.map((d) => getClusters(d.properties))),
]
const { colorScale } = useColorScale(colors)

const Map = ({ width, height }) => {
  console.log(width)
  // Set dimensions
  const centerX = width / 2
  const centerY = height / 2
  const factor = width < 500 ? 100 : 80
  const scale = (width / 630) * factor

  // Tooltips
  const {
    showTooltip = false,
    hideTooltip,
    tooltipData = { country_name: null, cluster: null },
    tooltipTop = 0,
    tooltipLeft = 0,
  } = useTooltip()

  const handleTooltip = useCallback(
    (event, { country_name, cluster }) => {
      const { x, y } = localPoint(event) || { x: 0, y: 0 }

      showTooltip({
        tooltipData: country_name
          ? { country_name, cluster }
          : { country_name: null, cluster: null },
        tooltipLeft: x,
        tooltipTop: y,
      })
    },
    [showTooltip]
  )

  // Return the plot
  return (
    <>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill='#0B1E31' />
        <Mercator
          data={world.features}
          translate={[centerX, centerY + 60]}
          scale={scale}
        >
          {(mercator) => (
            <g>
              {mercator.features.map(({ feature, path }, i) => (
                <path
                  key={`map-features-${i}`}
                  d={path || ""}
                  stroke='white'
                  opacity={
                    tooltipData.country_name === feature.properties.country_name
                      ? 0.8
                      : 1.0
                  }
                  strokeWidth={1}
                  fill={colorScale(feature.properties.cluster)}
                  onMouseMove={(event) =>
                    handleTooltip(event, feature.properties)
                  }
                  onMouseLeave={hideTooltip}
                />
              ))}
            </g>
          )}
        </Mercator>
      </svg>
      {showTooltip && tooltipData.country_name && (
        <TooltipWithBounds left={tooltipLeft + 10} top={tooltipTop}>
          <div className='tooltip'>
            <span>{tooltipData.country_name}</span>
            <span style={{ color: colorScale(tooltipData.cluster) }}>
              {tooltipData.cluster}
            </span>
          </div>
        </TooltipWithBounds>
      )}
    </>
  )
}

const Legend = () => (
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

const MapWrapper = ({ className }) => (
  <>
    <h3>How to describe a country...</h3>
    <div className={className}>
      <div className='viz'>
        <ParentSize>
          {({ width, height }) => <Map width={width} height={height} />}
        </ParentSize>
      </div>
      <Legend />
    </div>
  </>
)

export default styled(MapWrapper)`
  position: relative;
  overflow: hidden;

  display: grid;
  grid-template-areas:
    "legend"
    "viz";

  left: calc(-50vw + 50%);
  width: 100vw;

  .viz {
    height: 700px;
    grid-area: viz;
  }

  .legend {
    display: grid;
    grid-area: legend;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-flow: rows;
    justify-content: space-around;
  }

  @media only screen and (max-width: 1000px) {
    grid-template-areas:
      "viz"
      "legend";

    .viz {
      height: 500px;
      width: 100vw;
    }

    .legend {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin: 0px 0px 0px 5px;
      width: calc(100% - 5px);
    }
  }

  .visx-legend-item {
    gap: 5px;
    padding: 0px;
  }

  .tooltip {
    display: flex;
    flex-direction: column;
  }
`
