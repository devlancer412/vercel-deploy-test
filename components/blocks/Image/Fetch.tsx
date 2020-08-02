import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import * as takeshape from '../../../lib/takeshape'

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

const fetchImage = async imageId => {
  try {
    const data = await takeshape.request(ASSET_QUERY, {
      _id: imageId,
    })
    return { data }
  } catch (e) {
    return { error: 'Error fetching image' }
  }
}

export const useImage = details => {
  const [result, setResult] = React.useState<any>({ loading: true })

  React.useEffect(() => {
    const fetch = async () => {
      const image = await fetchImage(details.id)
      setResult(image)
    }

    fetch()
  }, [])

  if (result.loading || result.error) return result
  return { image: { ...result.data.getAsset, ...details } }
}

export const Image = ({ details, ...imageProps }) => {
  const { loading, error, image } = useImage(details)

  if (loading) return <Loading.Loading />
  if (error || !image) return <span />

  return <Img.Image image={image} {...imageProps} />
}
