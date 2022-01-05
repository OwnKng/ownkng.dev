import { quantile } from "d3"

const summarise = (data, accessor) => {
  const values = data.map((d) => accessor(d))

  const interQuantileRange = quantile(values, 0.75) - quantile(values, 0.25)

  let max = values.filter(
    (v) =>
      v > quantile(values, 0.75) &&
      v < quantile(values, 0.75) + 1.5 * interQuantileRange
  )
  max = Math.max(...max)

  let min = values.filter(
    (v) =>
      v < quantile(values, 0.25) &&
      v > quantile(values, 0.25) - 1.5 * interQuantileRange
  )

  min = Math.min(...min)

  const outliers = values.filter((v) => v > max || v < min)

  return {
    q1: quantile(values, 0.25),
    median: quantile(values, 0.5),
    q3: quantile(values, 0.75),
    min: min,
    max: max,
    outliers: outliers,
  }
}

export const useSummary = () => {
  return { summarise }
}
