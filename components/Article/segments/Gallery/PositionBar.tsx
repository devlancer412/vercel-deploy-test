import React from 'react'
import styled from 'styled-components'

import { generateGrid } from '../../../../lib/grid'
import * as convert from '../../../../lib/convert'

const positionBarGrid = (length: number) =>
  generateGrid({
    columns: { repeat: [length, '1fr'] },
    columnGap: null,
  })

const grid = generateGrid()

const Wrapper = styled.div<any>`
  ${grid.placeInColumns(4, { span: 6 })}
  ${grid.placeInRows(3)}
  ${grid.display}
  ${({ length }) => positionBarGrid(length).columns}

  height: 1px;
  background-color: #bebebe;
  width: 100%;
  margin-top: ${convert.viewportUnits(6.2, { by: 0.625 }).fromRem};
`

const Current = styled.div<any>`
  ${grid.placeInColumns(1)}
  width: 100%;
  height: 1px;
  background-color: #000000;
  transition: 0.4s ease-in transform;
`

export const Bar = ({ length, current }) => {
  const bar = React.useRef(null)
  const x = bar.current ? (bar.current.clientWidth / length) * current : 0

  return (
    <Wrapper length={length} ref={bar}>
      <Current style={{ transform: `translate(${x}px, 0)` }} />
    </Wrapper>
  )
}
