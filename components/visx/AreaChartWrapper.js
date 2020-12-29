import { useState } from "react";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import AreaChart from "./AreaChart";
import { demographics } from "../data/demographics";
import { Button } from "../styled/element/Button";

let keys = demographics.map((row) => row.country);
keys = [...new Set(keys)];

const AreaChartWrapper = () => {
  const [active, setActive] = useState("Japan");

  return (
    <div style={{ marginBottom: 100, width: "100%" }}>
      <h2>Share of population by age</h2>
      <h4>Select a country</h4>
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
              background: key === active ? "#2C8CBE" : "",
              color: key === active ? "#FFFFFE" : "",
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
  );
};

export default AreaChartWrapper;
