const mean = (values, valueof) => {
  let count = 0
  let sum = 0
  let index = -1

  for (let value of values) {
    if (
      (value = valueof(value, ++index, values)) != null &&
      (value = +value) >= value
    ) {
      ++count
      sum += value
    }
  }

  if (count) return sum / count
}

const kde = (kernel, thresholds, data) => {
  return thresholds.map((t) => [t, mean(data, (d) => kernel(t - d))])
}

const epanechnikov = (bandwidth) => {
  return (x) =>
    Math.abs((x /= bandwidth)) <= 1 ? (0.75 * (1 - x * x)) / bandwidth : 0
}

const density = (data, bandwidth, x, xScale) => {
  const thresholds = xScale.ticks(30)

  return kde(epanechnikov(bandwidth), thresholds, data.map(x))
}

export const useDensity = () => {
  return { density }
}
