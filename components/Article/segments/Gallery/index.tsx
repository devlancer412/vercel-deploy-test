import React from 'react'
import styled from 'styled-components'

import { generateGrid } from '../../../../lib/grid'
import * as convert from '../../../../lib/convert'

import * as typography from '../../../blocks/typography'

import * as Img from '../../../blocks/Image/Fetch'
import * as Arrow from './Arrow'
import * as PositionBar from './PositionBar'

const grid = generateGrid()

const breakpoint = 950

const Wrapper = styled.div<any>`
  ${grid.placeInColumns(1, { span: 12 })}
  ${grid.display}
  ${grid.columns}

  margin-bottom: ${convert.viewportUnits(12.1, { by: 0.625 }).fromRem}; // 121px
  margin-top: ${convert.viewportUnits(11.2, { by: 0.625 }).fromRem}; // 112px
`

const Images = styled.div`
  ${grid.placeInColumns(3, { span: 8 })}

  display: flex;
  overflow: hidden;
  z-index: 2;
`

const InternalWrapper = styled.div<any>`
  transform: translate(-${({ transformX }) => transformX}px, 0);
  transition: 0.4s ease-out transform;
  display: flex;
  width: 100%;
  height: ${({ maxHeight }) => maxHeight}px;
`

const Caption = styled.div`
  flex-shrink: 0;
  flex-basis: 100%;
  text-align: center;
  margin: ${convert.viewportUnits(2.3, { by: 0.625 }).fromRem} auto 0 auto;

  ${typography.detail}
`

const StabiliseImage = styled.div<any>`
  flex-basis: 100%;
  flex-shrink: 0;
  display: flex;
  height: ${({ heightNum }) => heightNum}px;
`

export const Gallery = ({ images }) => {
  const [index, setIndex] = React.useState(0)
  const [initialHeight, setInitialHeight] = React.useState(0)

  // Use to reference carousel x position
  const imageWrapper = React.useRef(null)

  // Use to reference image dimensions
  let imageRefs = React.useRef(new Map()).current
  const imageRef = id => imageRefs.get(`${id}-${index}`)

  const nextImage = () => setIndex(i => i + 1)
  const previousImage = () => setIndex(i => i - 1)

  const transformX = imageWrapper.current
    ? index * imageWrapper.current.clientWidth
    : 0

  const updateHeight = () => {
    const focus = imageRef(images[0].id)
    const focusedImage = focus.lastChild.lastChild
    const widthRatio = focusedImage.clientWidth / focusedImage.naturalWidth
    const height = focusedImage.naturalHeight * widthRatio
    focus && setInitialHeight(height)
  }

  const renderedImages = images.map((image, i) => (
    <StabiliseImage
      heightNum={initialHeight}
      key={`image-${image.id}-${i}`}
      ref={instance =>
        instance === null
          ? imageRefs.delete(`${image.id}-${i}`)
          : imageRefs.set(`${image.id}-${i}`, instance)
      }
    >
      <Img.Image
        details={image}
        hideCaption
        cache
        onLoad={updateHeight}
        objectFit="contain"
      />
    </StabiliseImage>
  ))

  return (
    <Wrapper>
      <Arrow.Arrow facing="left" visible={!!index} onClick={previousImage} />

      <Images ref={imageWrapper}>
        <InternalWrapper transformX={transformX} maxHeight={initialHeight}>
          {renderedImages}
        </InternalWrapper>
      </Images>

      <Arrow.Arrow
        facing="right"
        visible={index < images.length - 1}
        onClick={nextImage}
      />

      <Images>
        <InternalWrapper transformX={transformX}>
          {images.map(image =>
            (image.caption.blocks || []).map(({ text }, i) => (
              <Caption key={`caption-${text}-${i}`}>{text}</Caption>
            ))
          )}
        </InternalWrapper>
      </Images>

      <PositionBar.Bar length={images.length} current={index} />
    </Wrapper>
  )
}
