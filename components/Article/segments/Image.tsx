import { gql } from 'apollo-boost'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { getImageUrl } from 'takeshape-routing'

import * as Loading from '../../Loading'
import * as Img from '../../blocks/Image'

const ASSET_QUERY = gql`
  query GetAsset($_id: ID!) {
    getAsset(_id: $_id) {
      _id
      path
    }
  }
`

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

const Wrapper = styled.div<any>`
  grid-column: ${({ column }) => column};
  flex-basis: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 112px 0 120px 0;
`

export const Image = ({ image }) => {
  const { id, size, alignment, caption } = image

  const { loading, error, data } = useQuery(ASSET_QUERY, {
    variables: { _id: id },
  })

  if (loading) return <Loading.Loading />
  if (error || !data) return <span />

  const { getAsset: imageDetails } = data

  const span = sizeMap[size] || sizeMap.default
  const start = alignMap[size] || alignMap.default

  const combined = { ...imageDetails, ...image }

  return (
    <Wrapper column={`${start[alignment || 'center']} / span ${span}`}>
      <Img.Image image={combined} />
    </Wrapper>
  )
}
