import { Decimal } from 'decimal.js'
import shuffle from 'lodash.shuffle'

// Divide into 4 quadrants:
// bottom-left, bottom-right, top-left, top-right
const quadrants = [
  ['left', 'bottom'],
  ['left', 'top'],
  ['right', 'bottom'],
  ['right', 'top'],
]

const other = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
}

const positions = () =>
  quadrants.reduce((acc, [xPlacement, yPlacement]) => {
    const randomPercent = (): number => {
      const percent = new Decimal(30).pow(Math.random() + 1).times(0.02)
      return parseFloat(percent.toFixed(1))
    }

    const offset = (against: number): number => {
      const percent = randomPercent()
      const difference = Math.round(Math.abs(percent - against) * 10) / 10

      if (difference > 5) return percent
      if (percent > 10 && percent < 40 && against < percent) return percent + 10
      if (percent > 10 && percent < 40 && against > percent) return percent - 10

      if (percent > 40 && against < percent) return against - 10
      if (percent > 40 && against > percent) return percent - 10

      if (percent < 10 && against < percent) return percent + 10
      if (percent < 10 && against > percent) return against + 10
    }

    const onXAxis = acc[`${other[xPlacement]}-${yPlacement}`]
    const onYAxis = acc[`${xPlacement}-${other[yPlacement]}`]

    const x = onYAxis ? offset(onYAxis.x) : randomPercent()
    const y = onXAxis ? offset(onXAxis.y) : randomPercent()

    // console.log({ current: `${xPlacement}-${yPlacement}`, x, y })
    // console.log({ xAxis: `${other[xPlacement]}-${yPlacement}`, ...(onXAxis || {}) })
    // console.log({ yAxis: `${xPlacement}-${other[yPlacement]}`, ...(onYAxis || {}) })

    return { ...acc, [`${xPlacement}-${yPlacement}`]: { x, y } }
  }, {})

export const get = () => ({
  quadrants: shuffle(quadrants),
  positions: positions(),
})
