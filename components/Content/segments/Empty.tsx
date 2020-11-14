import styled from 'styled-components'

import { generateGrid } from '../../../lib/grid'

const grid = generateGrid()

export const Wrapper = styled.div`
  ${grid.placeInColumns(1, { span: 12 })}
`

export const Empty = () => <Wrapper />
