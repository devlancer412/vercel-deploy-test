import React from 'react'
import { getImageUrl } from 'takeshape-routing'

import { ImageType } from './Image.data'
import * as Styled from './Image.styles'

type ImageProps = {
  image: ImageType
  hideCaption?: boolean
  cache?: boolean
  onLoad?: () => void
  imgix?: Record<any, string | number>
  objectFit?: string
}

type ImageComponent = (props: ImageProps) => React.ReactElement
export const Image = ({
  image,
  hideCaption,
  cache,
  onLoad,
  imgix,
  objectFit,
}: ImageProps) => {
  const lazyOptions = {
    fit: 'clip',
    w: 50,
    h: 50,
    q: 50,
    auto: 'format',
    ...imgix,
  }
  const lazyUrl = getImageUrl(image.path, lazyOptions)
  const qualityUrl = getImageUrl(image.path, imgix)

  // Optionally preload images in an attempt to stop page jump
  React.useEffect(() => {
    if (!cache || !window) return
    let cachedImage = new window.Image()
    cachedImage.src = lazyUrl
  }, [])

  const caption = image.caption && image.caption.blocks.map(b => b.text)

  return (
    <>
      <Styled.Clip>
        <Styled.Img
          className="blur-up lazyload"
          data-src={qualityUrl}
          src={lazyUrl}
          onLoad={onLoad}
          objectFit={objectFit}
        />
      </Styled.Clip>

      {caption && !hideCaption && <Styled.Caption>{caption}</Styled.Caption>}
    </>
  )
}
