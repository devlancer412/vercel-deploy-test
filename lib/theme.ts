import * as convert from './convert'

const theme = {
  breakpoint: {
    wide: 900,
  },
  grid: {
    gap: convert.viewportUnits(40, { to: 16 }).fromPx,
    padding: convert.viewportUnits(50, { to: 18 }).fromPx,
  },
}

export default theme
