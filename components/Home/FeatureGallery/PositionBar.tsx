import React from 'react'
import styled from 'styled-components'

import { generateGrid } from '../../../lib/grid'
import * as convert from '../../../lib/convert'
import * as animate from '../../../lib/animate'

const Wrapper = styled.div<any>`
  ${({ grid }) => `
    ${grid.display}
    ${grid.columns}
    ${grid.placeInColumns(1, { span: 12 })}
    ${grid.placeInRows(3)}
  `}
  height: 1px;
  background-color: #bebebe;
  width: 100%;
  margin-top: ${convert.viewportUnits(7.5, { by: 0.625 }).fromRem}; // 7.5rem
`

const Current = styled.div<any>`
  ${({ grid }) => grid.placeInColumns(1)}
  width: 100%;
  height: 1px;
  background-color: #000000;
  ${animate.defaultTransition}
  transition-property: transform;
`

export const Bar = ({ length, current }) => {
  const bar = React.useRef(null)
  const x = bar.current ? (bar.current.clientWidth / length) * current : 0
  const grid = generateGrid({
    columns: { repeat: [length, '1fr'] },
    columnGap: '0',
  })

  return (
    <Wrapper grid={grid} length={length} ref={bar}>
      <Current grid={grid} style={{ transform: `translate(${x}px, 0)` }} />
    </Wrapper>
  )
}
