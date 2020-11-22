import React from 'react'
import { getImageUrl } from 'takeshape-routing'

import { ImageType } from './Image.data'
import * as Styled from './Image.styles'

type ImageProps = {
  image: ImageType
  imageAlt?: string
  hideCaption?: boolean
  cache?: boolean
  onLoad?: () => void
  imgix?: Record<any, string | number>
  objectFit?: string
  objectPosition?: string
  height?: string
  heightPercentage?: number
  inColumns?: number
  overrideClip?: string
}

type ImageComponent = (props: ImageProps) => React.ReactElement
export const Image = ({
  image,
  imageAlt,
  hideCaption,
  cache,
  onLoad,
  imgix,
  objectFit,
  objectPosition,
  height,
  heightPercentage,
  inColumns,
  overrideClip,
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

  const genImageDetails = (imageSize: number) => {
    return {
      url: getImageUrl(image.path, {
        q: 50,
        auto: 'format',
        w: imageSize,
        ...imgix,
      }),
      size: imageSize,
    }
  }

  const xxs = genImageDetails(300)
  const xs = genImageDetails(500)
  const small = genImageDetails(900)
  const medium = genImageDetails(1200)
  const large = genImageDetails(1600)
  const xl = genImageDetails(2000)

  // Optionally preload images in an attempt to stop page jump
  React.useEffect(() => {
    if (!cache || !window) return
    let cachedImage = new window.Image()
    cachedImage.src = lazyUrl
  }, [])

  const caption =
    image.caption &&
    image.caption.blocks.reduce((c, b) => (b.text ? [...c, b.text] : c), [])

  const imageVw = inColumns ? Math.ceil((inColumns * 100) / 12) : 100

  return (
    <>
      <Styled.Clip setPadding={heightPercentage} overrideClip={overrideClip}>
        <Styled.Img
          alt={imageAlt}
          className="blur-up lazyload"
          data-src={large.url}
          src={lazyUrl}
          onLoad={onLoad}
          objectFit={objectFit}
          objectPosition={objectPosition}
          height={height}
          setPosition={heightPercentage ? 'absolute' : null}
          data-srcset={`
            ${xxs.url} ${xxs.size}w,
            ${xs.url} ${xs.size}w,
            ${small.url} ${small.size}w,
            ${medium.url} ${medium.size}w,
            ${large.url} ${large.size}w,
            ${xl.url} ${xl.size}w
          `}
          sizes={`${imageVw}vw`}
        />
      </Styled.Clip>

      {caption && caption.length > 0 && !hideCaption && (
        <Styled.Caption>{caption}</Styled.Caption>
      )}
    </>
  )
}
