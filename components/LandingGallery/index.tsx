import React from 'react'
import { gql } from 'apollo-boost'
import styled from 'styled-components'

import * as randomlyPlace from '../../lib/randomlyPlace'

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

const GalleryHeading = styled.span`
  pointer-events: none;
  position: relative;
`

const GalleryImage = styled.img`
  transition: opacity 0.4s;
  opacity: 0;
  position: absolute;
  pointer-events: none;
  z-index: 3;
  max-width: 400px;
  max-height: 400px;
`

const GalleryLine = styled.div`
  text-align: center;
  text-transform: uppercase;
  line-height: 132px;
  letter-spacing: -4px;
  font-weight: 100;
  -webkit-font-smoothing: subpixel-antialiased;

  &:hover {
    ${GalleryImage} {
      opacity: 2;
      transition: opacity 0.4s;
    }

    ${GalleryHeading} {
      z-index: 3;
      color: #000000;
    }
  }
`

const Wrapper = styled.div`
  grid-column: 1 / -1;
  font-size: 160px;
  font-family: 'Adieu Light';
  padding: 150px 0 160px 0;
  margin: 12px 0 40px 0;
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
      <GalleryImage
        key={`landing-gallery-image-${image._id}`}
        src={'https://images.takeshape.io/' + image.path}
        style={imagePosition}
      />
    )
  })

  return (
    <GalleryLine key={text}>
      {placedImages}
      <GalleryHeading>{text}</GalleryHeading>
    </GalleryLine>
  )
}

export const LandingGallery = ({ content }) => {
  const headers = React.useMemo(() => content.headings.map(renderGalleryItem), [
    content,
  ])

  return (
    <Wrapper>
      <HoverTarget>{headers}</HoverTarget>
    </Wrapper>
  )
}
