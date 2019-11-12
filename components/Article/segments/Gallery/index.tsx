import React from 'react'
import styled from 'styled-components'

import * as Image from '../Image'
import * as Arrow from './Arrow'
import * as PositionBar from './PositionBar'

const Wrapper = styled.div<any>`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 40px;
  margin-bottom: 120px;
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
  transition: 0.4s ease-out transform;
  will-change: transform;
  display: flex;
  margin: -112px 0 -120px 0;
`

const renderImage = image => <Image.Image image={image} />

export const Gallery = ({ images }) => {
  const renderedImages = images.map(renderImage)
  const length = images.length

  const imageWrapper = React.useRef(null)
  const [current, setCurrent] = React.useState(0)

  const goForwards = () => setCurrent(c => c + 1)
  const goBackwards = () => setCurrent(c => c - 1)

  const x = imageWrapper.current
    ? current * imageWrapper.current.clientWidth
    : 0

  return (
    <Wrapper>
      <Arrow.Arrow facing="left" visible={!!current} onClick={goBackwards} />

      <Images ref={imageWrapper}>
        <InternalWrapper x={x}>{renderedImages}</InternalWrapper>
      </Images>

      <Arrow.Arrow
        facing="right"
        visible={current < length - 1}
        onClick={goForwards}
      />
      <PositionBar.Bar length={length} current={current} />
    </Wrapper>
  )
}
