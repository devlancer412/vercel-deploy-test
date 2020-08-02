import styled from 'styled-components'

import { generateGrid } from '../../../lib/grid'
import * as convert from '../../../lib/convert'

import * as Img from '../../blocks/Image/Fetch'

const breakpoint = 600

const grid = generateGrid()

const gridColumn = (start: number, span: number) =>
  grid.placeInColumns(start, { span })

const sizeMap = {
  large: 12,
  medium: 8,
  small: 6,
  default: 4,
}

const alignMap = {
  large: { left: 1, right: 1, center: 1 },
  medium: { left: 1, right: 5, center: 3 },
  small: { left: 1, right: 7, center: 4 },
  default: { left: 3, right: 7, center: 5 },
}

export const Wrapper = styled.div<any>`
  ${grid.placeInColumns(1, { span: 12 })}

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${breakpoint}px) {
    ${({ start, span }) => gridColumn(start, span)};
  }
`

export const Image = ({ image }) => {
  const { size, alignment, caption } = image

  const span = sizeMap[size] || sizeMap.default
  const start = alignMap[size] || alignMap.default

  return (
    <Wrapper start={start[alignment || 'center']} span={span}>
      <Img.Image details={image} height={'intrinsic'} />
    </Wrapper>
  )
}
