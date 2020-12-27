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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {keys.map((key) => (
          <Button
            key={key}
            style={{
              background: key === active ? "#094067" : "",
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
