import { css, FlattenSimpleInterpolation } from 'styled-components'

import theme from './theme'

export const display = css`
  display: grid;
  display: -ms-grid;
`

const create = createType => ({ repeat = null, exact = null }, gutter) => {
  const repeatCss = () => {
    const gutterString = Array.isArray(gutter) ? gutter.join('') : gutter
    const joinWith = gutter ? ` ${gutterString} ` : ' '
    const [repeatFor, fillWith] = repeat
    return Array(repeatFor)
      .fill(fillWith)
      .join(joinWith)
  }

  const tracksCss = exact ? exact : repeatCss()

  return `
    grid-template-${createType}: ${tracksCss};
    -ms-grid-${createType}: ${tracksCss};
  `
}

export const columns = create('columns')
export const rows = create('rows')

type PlaceInOpts = {
  span?: number
  to?: number
}

const placeIn = placementType => gutter => (from, opts: PlaceInOpts = {}) => {
  const { to = null, span = null } = opts
  // If span exists, else if to exists, else only span 1
  const withoutGap = num => (num ? (gutter ? num * 2 - 1 : num) : null)
  const start = withoutGap(from)
  const spanning = span
    ? withoutGap(span)
    : to
    ? withoutGap(to) - (start || 0)
    : 1

  return `
    ${start ? `-ms-grid-${placementType}: ${start};` : ''}
    -ms-grid-${placementType}-span: ${spanning};
    grid-${placementType}: ${start ? `${start} /` : ''} span ${spanning};
  `
}

export const placeInColumns = placeIn('column')
export const placeInRows = placeIn('row')

type GutterType = string | FlattenSimpleInterpolation
type CRConfig = { repeat?: [number, string]; exact?: string }

type GridProps = {
  columnGap?: GutterType
  rowGap?: GutterType
  columns?: CRConfig
  rows?: CRConfig
}

export function generateGrid(opts: GridProps = {}) {
  const columnGap =
    opts.columnGap !== undefined ? opts.columnGap : theme.grid.gap
  const rowGap = opts.rowGap !== undefined ? opts.rowGap : null
  const columnsConfig = opts.columns || { repeat: [12, '1fr'] }
  const rowsConfig = opts.rows || { exact: '1fr' }

  return {
    display,
    columns: columns(columnsConfig, columnGap),
    rows: rows(rowsConfig, rowGap),
    placeInColumns: placeInColumns(columnGap),
    placeInRows: placeInRows(rowGap),
  }
}
