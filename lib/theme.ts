import * as convert from './convert'

const theme = {
  breakpoint: {
    wide: 900,
    home: 650,
  },
  home: {
    rowGap: convert.viewportUnits(9, { to: 4 }).fromRem,
  },
  animate: {
    transition: (properties: string, speed: string) =>
      `transition: ${properties} ${speed} cubic-bezier(0.23, 1, 0.32, 1);`,
  },
  grid: {
    gap: convert.viewportUnits(40, { to: 16 }).fromPx,
    padding: convert.viewportUnits(50, { to: 10 }).fromPx,
  },
}

export default theme
