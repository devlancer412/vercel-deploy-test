import React from 'react'
import { gql } from 'apollo-boost'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { getImageUrl } from 'takeshape-routing'

import * as Loading from '../../Loading'

const ASSET_QUERY = gql`
  query GetAsset($_id: ID!) {
    getAsset(_id: $_id) {
      _id
      path
    }
  }
`

const Img = styled.img<any>`
  width: 100%;
  display: block;

  &.blur-up {
    filter: blur(25px);
    transition: 0.4s ease-in filter;
  }

  &.blur-up.lazyloaded {
    filter: blur(0px);
    transition: 0.4s ease-in filter;
  }
`

const Caption = styled.div`
  margin: 20px auto 0 auto;
  font-family: 'Adieu Light';
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.18px;
  text-transform: uppercase;
`

const Clip = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`

// Clean this up
export const FromApi = ({ details, ...rest }) => {
  const { id } = details

  const { loading, error, data } = useQuery(ASSET_QUERY, {
    variables: { _id: id },
  })

  if (loading) return <Loading.Loading />
  if (error || !data) return <span />

  const { getAsset: imageDetails } = data
  const combined = { ...imageDetails, ...details }

  return <Asset image={combined} {...rest} />
}

export const Asset = ({ image, noCaption = false, cache = false, ...rest }) => {
  const { path, caption } = image

  const lazyUrl = getImageUrl(path, {
    fit: 'clip',
    w: 50,
    h: 50,
    q: 50,
    auto: 'format',
  })
  const qualityUrl = getImageUrl(path)

  // Optionally preload images in an attempt to stop page jump
  React.useEffect(() => {
    if (cache && window) {
      let cachedImage = new window.Image()
      cachedImage.src = lazyUrl
    }
  }, [])

  // 1. Extract Caption into own component

  return (
    <Clip>
      <Img
        className="blur-up lazyload"
        data-src={qualityUrl}
        src={lazyUrl}
        {...rest}
      />
      {caption && !noCaption && (
        <Caption>{caption.blocks.map(({ text }) => text)}</Caption>
      )}
    </Clip>
  )
}
