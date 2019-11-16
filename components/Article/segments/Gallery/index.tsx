import React from 'react'
import styled from 'styled-components'

import * as Img from '../../../blocks/Image/Fetch'
import * as Arrow from './Arrow'
import * as PositionBar from './PositionBar'

const Wrapper = styled.div<any>`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 40px;
  margin-bottom: 121px;
  margin-top: 112px;
`

const Images = styled.div`
  display: flex;
  overflow: hidden;
  grid-column: 3 / -3;
  z-index: 2;
`

const InternalWrapper = styled.div<any>`
  transform: translate(-${({ x }) => x}px, 0);
  transition: 0.4s ease-out transform, 0.4s ease-out height;
  will-change: transform;
  display: flex;
  width: 100%;
  height: ${({ height }) => height}px;
`

const Caption = styled.div`
  flex-shrink: 0;
  flex-basis: 100%;
  text-align: center;
  margin: 23px auto 0 auto;
  font-family: 'Adieu Light';
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.18px;
  text-transform: uppercase;
`

const StabiliseWidth = styled.div`
  flex-basis: 100%;
  flex-shrink: 0;
`

const renderImage = (imageRefs, loaded) => (image, i) => (
  <StabiliseWidth
    key={`image-${image.id}-${i}`}
    ref={instance =>
      instance === null
        ? imageRefs.delete(`${image.id}-${i}`)
        : imageRefs.set(`${image.id}-${i}`, instance)
    }
  >
    <Img.Image details={image} hideCaption cache onLoad={loaded} />
  </StabiliseWidth>
)

export const Gallery = ({ images }) => {
  const [index, setIndex] = React.useState(0)
  const [height, setHeight] = React.useState(0)

  // Use to reference carousel x position
  const imageWrapper = React.useRef(null)

  // Use to reference carousel height
  let imageRefs = React.useRef(new Map()).current
  const imageRef = id => imageRefs.get(`${id}-${index}`)

  // Change carousel height when focus changes
  React.useEffect(() => {
    updateHeight()
  }, [index])

  const nextImage = () => setIndex(i => i + 1)
  const previousImage = () => setIndex(i => i - 1)

  const x = imageWrapper.current ? index * imageWrapper.current.clientWidth : 0

  const updateHeight = () => {
    const focus = imageRef(images[index].id)
    focus && setHeight(focus.lastChild.clientHeight)
  }

  const renderedImages = images.map(renderImage(imageRefs, updateHeight))

  return (
    <Wrapper>
      <Arrow.Arrow facing="left" visible={!!index} onClick={previousImage} />

      <Images ref={imageWrapper}>
        <InternalWrapper x={x} height={height}>
          {renderedImages}
        </InternalWrapper>
      </Images>

      <Arrow.Arrow
        facing="right"
        visible={index < images.length - 1}
        onClick={nextImage}
      />

      <Images>
        <InternalWrapper x={x}>
          {images.map(image =>
            image.caption.blocks.map(({ text }, i) => (
              <Caption key={`caption-${text}-${i}`}>{text}</Caption>
            ))
          )}
        </InternalWrapper>
      </Images>

      <PositionBar.Bar length={images.length} current={index} />
    </Wrapper>
  )
}
