import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

import * as Loading from '../../Loading'

import * as Img from './'

// This is for images where only the ID is supplied, so their details
// have to be retrieved from TakeShape.

const ASSET_QUERY = gql`
  query GetAsset($_id: ID!) {
    getAsset(_id: $_id) {
      _id
      path
    }
  }
`

export const useImage = details => {
  const { loading, error, data } = useQuery(ASSET_QUERY, {
    variables: { _id: details.id },
  })

  if (loading || error || !data) return { loading, error, image: null }

  const asset = data.getAsset
  return { loading, error, image: { ...asset, ...details } }
}

export const Image = ({ details, ...imageProps }) => {
  const { loading, error, image } = useImage(details)

  if (loading) return <Loading.Loading />
  if (error || !image) return <span />

  return <Img.Image image={image} {...imageProps} />
}
