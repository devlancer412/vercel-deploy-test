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
  setRatio?: [number, number]
  inColumns?: number
}

type ImageComponent = (props: ImageProps) => React.ReactElement
export const Image = ({
  image,
  hideCaption,
  cache,
  onLoad,
  imgix,
  objectFit,
  setRatio,
  inColumns,
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
        q: 75,
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

  const caption = image.caption && image.caption.blocks.map(b => b.text)
  const padding = setRatio && (setRatio[1] * 100) / setRatio[0]
  const imageVw = inColumns ? Math.ceil((inColumns * 100) / 12) : 100

  return (
    <>
      <Styled.Clip setPadding={padding}>
        <Styled.Img
          className="blur-up lazyload"
          data-src={large.url}
          src={lazyUrl}
          onLoad={onLoad}
          objectFit={objectFit}
          setPosition={padding ? 'absolute' : null}
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

      {caption && !hideCaption && <Styled.Caption>{caption}</Styled.Caption>}
    </>
  )
}
