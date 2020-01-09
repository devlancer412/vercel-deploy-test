import { css } from 'styled-components'

import { generateGrid } from '../../../lib/grid'

const grid = generateGrid()

export const placement = css`
  ${grid.placeInColumns(1, { span: 12 })}

  @media (min-width: 650px) {
    ${grid.placeInColumns(1.5, { span: 11 })}
  }

  @media (min-width: 700) {
    ${grid.placeInColumns(2, { span: 10 })}
  }

  @media (min-width: 800px) {
    ${grid.placeInColumns(2.5, { span: 9 })}
  }

  @media (min-width: 900px) {
    ${grid.placeInColumns(3, { span: 8 })}
  }

  @media (min-width: 1000px) {
    ${grid.placeInColumns(3.5, { span: 7 })}
  }

  @media (min-width: 1100px) {
    ${grid.placeInColumns(3.5, { span: 7 })}
  }

  @media (min-width: 1200px) {
    ${grid.placeInColumns(4, { span: 6 })}
  }
`
