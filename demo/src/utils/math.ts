export function round(value: number, precision = 3) {
  return parseFloat(value.toFixed(precision))
}

export function adjust(
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
) {
  return round(
    toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin)
  )
}
