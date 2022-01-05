import { scaleOrdinal } from "@visx/scale"

export const useColorScale = (array) => {
  let colorScale

  // check if null values exist in the color array
  if (array.includes("Insufficient data")) {
    colorScale = scaleOrdinal({
      domain: [
        "Rich, well governed and free",
        "(mostly) big and developing",
        "Small, (mostly) free and developing",
        "Poor, but young",
        "Insufficient data",
      ],
      range: ["#98A6D4", "#E4B363", "#00C49A", "#EF6461", "#C7C7C7"],
    })

    return { colorScale }
  }

  colorScale = scaleOrdinal({
    domain: [
      "Rich, well governed and free",
      "(mostly) big and developing",
      "Small, (mostly) free and developing",
      "Poor, but young",
    ],
    range: ["#98A6D4", "#E4B363", "#00C49A", "#EF6461"],
  })

  return { colorScale }
}
