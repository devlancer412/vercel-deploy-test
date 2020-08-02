import React from 'react'
import styled from 'styled-components'
import { useSwipeable } from 'react-swipeable'

import { generateGrid } from '../../../../lib/grid'
import * as convert from '../../../../lib/convert'

import * as typography from '../../../blocks/typography'

import * as Img from '../../../blocks/Image/Fetch'
import * as PositionBar from './PositionBar'

const grid = generateGrid({ rows: { repeat: [3, 'auto'] } })

const breakpoint = 700

export const Wrapper = styled.div<any>`
  ${grid.placeInColumns(1, { span: 12 })}
  ${grid.display}
  ${grid.columns}
  ${grid.rows}

  margin-bottom: ${convert.viewportUnits(12.1, { by: 0.625 }).fromRem}; // 121px
  margin-top: ${convert.viewportUnits(11.2, { by: 0.625 }).fromRem}; // 112px
`

const compassDirection = (arrow: 'left' | 'right') =>
  arrow === 'left' ? 'w' : 'e'

const LeftTarget = styled.div<{ arrow: 'left' | 'right' }>`
  ${grid.placeInColumns(1, { span: 5.5 })}

  @media (min-width: 750px) {
    ${grid.placeInColumns(1, { span: 6 })}
  }

  ${grid.placeInRows(1)}
  width: 100%;
  height: 100%;
  z-index: 3;

  cursor: url(/images/${p => p.arrow}-arrow.svg),
    ${p => compassDirection(p.arrow)}-resize;
`
const RightTarget = styled.div<{ arrow: 'left' | 'right' }>`
  ${grid.placeInColumns(6, { span: 7 })}

  @media (min-width: 750px) {
    ${grid.placeInColumns(6.5, { span: 6.5 })}
  }

  ${grid.placeInRows(1)}
  width: 100%;
  height: 100%;
  z-index: 3;

  cursor: url(/images/${p => p.arrow}-arrow.svg),
    ${p => compassDirection(p.arrow)}-resize;
`

const Images = styled.div<any>`
  ${grid.placeInColumns(1, { span: 12 })}
  ${p => grid.placeInRows(p.row)}

  display: flex;
  overflow: hidden;
  z-index: 2;

  @media (min-width: ${breakpoint}px) {
    ${grid.placeInColumns(3, { span: 8 })}
  }
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

  const length = images.length
  const isFirst = !index
  const isLast = index === length - 1

  // Use to reference carousel x position
  const imageWrapper = React.useRef(null)

  // Use to reference image dimensions
  let imageRefs = React.useRef(new Map()).current
  const imageRef = id => imageRefs.get(`${id}-${index}`)

  const nextImage = () => setIndex(i => Math.min(i + 1, length - 1))
  const previousImage = () => setIndex(i => Math.max(0, i - 1))
  const scroll = () => (isLast ? setIndex(0) : nextImage())
  const scrollBack = () => (isFirst ? setIndex(length - 1) : previousImage())

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: previousImage,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  React.useEffect(() => {
    const timeout = setTimeout(scroll, 6000)
    return () => clearTimeout(timeout)
  }, [index])

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
    <Wrapper {...handlers}>
      <LeftTarget onClick={scrollBack} arrow={'left'} />
      <RightTarget onClick={scroll} arrow={'right'} />

      <Images ref={imageWrapper} row={1}>
        <InternalWrapper transformX={transformX} maxHeight={initialHeight}>
          {renderedImages}
        </InternalWrapper>
      </Images>

      <Images row={2}>
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
