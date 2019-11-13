import { gql } from 'apollo-boost'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { getImageUrl } from 'takeshape-routing'

import * as Loading from '../../Loading'
import * as Img from '../../blocks/Image'

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
  grid-column: ${({ column }) => column};
  margin: 112px 0 120px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Image = ({ image }) => {
  const { size, alignment, caption } = image

  const span = sizeMap[size] || sizeMap.default
  const start = alignMap[size] || alignMap.default

  return (
    <Wrapper column={`${start[alignment || 'center']} / span ${span}`}>
      <Img.FromApi details={image} />
    </Wrapper>
  )
}
