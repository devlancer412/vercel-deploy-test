type ConversionUnit = 'px' | 'rem'

const isPx = unit => unit === 'px'

export const viewportUnits = (
  target: number,
  { to, by = 1 }: { to?: number; by?: number } = { by: 1 },
  usingWidth = 1440
) => {
  const calculateViewportUnits = (unit: ConversionUnit): [number, number] => {
    const offset = to != null ? to : target * by
    const vw = (target - offset) / (usingWidth / (isPx(unit) ? 100 : 1000))
    return [vw, offset]
  }

  const asUnit = (unit: ConversionUnit) => {
    const [vw, offset] = calculateViewportUnits(unit)
    const fixedVw = `${vw.toFixed(3)}vw`
    return offset ? `calc(${offset}${unit} + ${fixedVw})` : fixedVw
  }

  return {
    fromPx: asUnit('px'),
    fromRem: asUnit('rem'),
    atScreenSize: (unit: ConversionUnit, screenWidth: number) => {
      const [vw, offset] = calculateViewportUnits(unit)
      const vwValue = Math.ceil(screenWidth / (isPx(unit) ? 100 : 1000))
      return offset + vwValue * vw
    },
  }
}

export const minus = calc => `calc(-1 * ${calc})`
