import React from 'react'
import { gql } from 'apollo-boost'
import styled from 'styled-components'

import * as randomlyPlace from '../../../lib/randomlyPlace'
import * as convert from '../../../lib/convert'

export const fragment = gql`
  fragment LandingGallery on LandingGallery {
    headings {
      text
      images {
        image {
          _id
          path
        }
      }
    }
  }
`

const Heading = styled.span`
  pointer-events: none;
  position: relative;
`

const Image = styled.img`
  transition: opacity 0.4s;
  opacity: 0;
  position: absolute;
  pointer-events: none;
  z-index: 3;
  max-width: ${convert.viewportUnits(40, { to: 8 }).fromRem};
  max-height: ${convert.viewportUnits(40, { to: 8 }).fromRem};
`

const Row = styled.div`
  -webkit-font-smoothing: subpixel-antialiased;
  margin: ${convert.viewportUnits(0, { to: 8 }).fromRem} auto;

  &:hover {
    ${Image} {
      opacity: 2;
      transition: opacity 0.4s;
    }

    ${Heading} {
      z-index: 3;
      color: #000000;
    }
  }
`

const Wrapper = styled.div`
  grid-column: 1 / -1;

  font-size: ${convert.viewportUnits(16, { to: 0 }).fromRem};
  font-family: 'Adieu Light';
  text-align: center;
  text-transform: uppercase;
  line-height: 0.825; // 132px
  letter-spacing: ${convert.viewportUnits(-0.4, { to: 0 }).fromRem};
  font-weight: 100;

  padding-top: ${convert.viewportUnits(15, { to: 4 }).fromRem};
  padding-bottom: ${convert.viewportUnits(16, { to: 2 }).fromRem};
  margin-top: ${convert.viewportUnits(1.2, { to: 0.6 }).fromRem};
  margin-bottom: ${convert.viewportUnits(4, { to: 2 }).fromRem};
  position: relative;
`

const HoverTarget = styled.div`
  &:hover {
    color: #e9e9e9;
  }
`

const renderGalleryItem = ({ text, images }) => {
  const { quadrants, positions } = randomlyPlace.get()

  const placedImages = images.map(({ image }, i) => {
    const [x, y] = quadrants[i]
    const position = positions[`${x}-${y}`]

    const imagePosition = {
      [x]: `${position.x}%`,
      [y]: `${position.y}%`,
    }

    return (
      <Image
        key={`landing-gallery-image-${image._id}`}
        src={'https://images.takeshape.io/' + image.path}
        style={imagePosition}
      />
    )
  })

  return (
    <Row key={text}>
      {placedImages}
      <Heading>{text}</Heading>
    </Row>
  )
}

export const Gallery = ({ content }) => {
  const headers = React.useMemo(() => content.headings.map(renderGalleryItem), [
    content,
  ])

  return (
    <Wrapper>
      <HoverTarget>{headers}</HoverTarget>
    </Wrapper>
  )
}
