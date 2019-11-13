import React from 'react'
import styled from 'styled-components'

import * as Img from '../../../blocks/Image'
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

const renderImage = imageRefs => (image, i) => (
  <StabiliseWidth
    key={`image-${image.id}-${i}`}
    ref={instance =>
      instance === null
        ? imageRefs.delete(`${image.id}-${i}`)
        : imageRefs.set(`${image.id}-${i}`, instance)
    }
  >
    <Img.FromApi details={image} noCaption cache />
  </StabiliseWidth>
)

export const Gallery = ({ images }) => {
  const [current, setCurrent] = React.useState(0)
  const [rendered, setRendered] = React.useState(false)

  // Use to set carousel x position
  const imageWrapper = React.useRef(null)

  // Use to set carousel height
  let imageRefs = React.useRef(new Map()).current
  const imageRef = id => imageRefs.get(`${id}-${current}`)

  const length = images.length

  const goForwards = () => setCurrent(c => c + 1)
  const goBackwards = () => setCurrent(c => c - 1)

  const x = imageWrapper.current
    ? current * imageWrapper.current.clientWidth
    : 0

  const currentImage = imageRef(images[current].id) || {
    lastChild: { clientHeight: 0 },
  }
  const currentHeight = currentImage.lastChild.clientHeight

  // Ugly hack to get the height updated on page load
  React.useEffect(() => {
    setRendered(true)
  }, [])

  const renderedImages = images.map(renderImage(imageRefs))

  return (
    <Wrapper>
      <Arrow.Arrow facing="left" visible={!!current} onClick={goBackwards} />

      <Images ref={imageWrapper}>
        <InternalWrapper x={x} height={currentHeight}>
          {renderedImages}
        </InternalWrapper>
      </Images>

      <Arrow.Arrow
        facing="right"
        visible={current < length - 1}
        onClick={goForwards}
      />

      <Images>
        <InternalWrapper x={x}>
          {images.map(image =>
            image.caption.blocks.map(({ text }) => <Caption>{text}</Caption>)
          )}
        </InternalWrapper>
      </Images>

      <PositionBar.Bar length={length} current={current} />
    </Wrapper>
  )
}
