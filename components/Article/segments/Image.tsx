import { gql } from 'apollo-boost'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { getImageUrl } from 'takeshape-routing'

import { generateGrid } from '../../../lib/grid'
import * as convert from '../../../lib/convert'

import * as Loading from '../../Loading'
import * as Img from '../../blocks/Image/Fetch'

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

const topMargin = convert.viewportUnits(11.2, { by: 0.625 }).fromRem
const bottomMargin = convert.viewportUnits(12, { by: 0.625 }).fromRem

export const Wrapper = styled.div<any>`
  ${({ start, span }) => gridColumn(start, span)};
  margin: ${topMargin} 0 ${bottomMargin} 0;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Image = ({ image }) => {
  const { size, alignment, caption } = image

  const span = sizeMap[size] || sizeMap.default
  const start = alignMap[size] || alignMap.default

  return (
    <Wrapper start={start[alignment || 'center']} span={span}>
      <Img.Image details={image} intrinsicHeight />
    </Wrapper>
  )
}
