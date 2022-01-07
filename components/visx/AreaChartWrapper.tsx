// @ts-nocheck
import { useState } from "react"
import ParentSize from "@visx/responsive/lib/components/ParentSize"
import AreaChart from "./AreaChart"
import { demographics } from "../data/demographics"
import { Button } from "../styled/element/Button"

let keys = demographics.map((row) => row.country)
keys = [...new Set(keys)]

const AreaChartWrapper = () => {
  const [active, setActive] = useState("Japan")

  return (
    <div style={{ marginBottom: 80, width: "100%" }}>
      <h2>Share of population by age group</h2>
      <h4 style={{ margin: "10px 0px" }}>Select a country</h4>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {keys.map((key) => (
          <Button
            key={key}
            style={{
              color: key === active ? "var(--colors-button)" : "",
            }}
            onClick={() => setActive(key)}
          >
            {key}
          </Button>
        ))}
      </div>
      <div style={{ height: 500, position: "relative" }}>
        <ParentSize>
          {({ width, height }) => (
            <AreaChart
              data={demographics.filter((row) => row.country === active)}
              width={width}
              height={height}
            />
          )}
        </ParentSize>
      </div>
    </div>
  )
}

export default AreaChartWrapper
