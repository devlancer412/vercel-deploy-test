import { css } from 'styled-components'

export const viewportUnits = (
  target: number,
  { to, by = 1 }: { to?: number; by?: number } = { by: 1 },
  usingWidth = 1440
) => {
  const result = unit => {
    const offset = to != null ? to : target * by
    const vw = (
      (target - offset) /
      (usingWidth / (unit === 'px' ? 100 : 1000))
    ).toFixed(3)
    return offset
      ? css`calc(${offset}${unit} + ${vw}vw)`
      : css`
          ${vw}vw
        `
  }

  return {
    fromPx: result('px'),
    fromRem: result('rem'),
  }
}

export const minus = calc => css`calc(-1 * ${calc})`
