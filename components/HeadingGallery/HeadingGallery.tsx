import React from 'react'
import { gql } from 'apollo-boost'
import styled from 'styled-components'
import sampleSize from 'lodash.samplesize'

export const fragment = gql`
  fragment HeadingGallery on HeadingGallery {
    line {
      heading
      images {
        image {
          sourceUrl
          path
          filename
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
`

const GalleryLine = styled.div`
  text-align: center;
  text-transform: uppercase;
  line-height: 132px;
  letter-spacing: -4;

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
  padding: 200px 0;
  position: relative;
`

const HoverTarget = styled.div`
  &:hover {
    color: #e9e9e9;
  }
`

// Divide into 4 quadrants:
// bottom-left, bottom-right, top-left, top-right
const quadrants = [
  ['bottom', 'left'],
  ['bottom', 'right'],
  ['top', 'left'],
  ['top', 'right'],
]
const randomPosition = ([x, y]: [string, string]) => {
  const randomPercent = () => {
    const x = Math.random() + 1
    const y = 0.02 * (50 ^ x)
    console.log({ x, y })
    return `${Math.round(y)}%`
  }

  return {
    [x]: randomPercent(),
    [y]: randomPercent(),
    maxWidth: '400px',
    maxHeight: '400px',
  }
}

const GalleryItem = ({ heading, images }) => {
  const shuffledQuadrants: ([string, string])[] = sampleSize(
    [...quadrants],
    images.length
  )

  const showImages = images.map(({ image }, i) => {
    const position = randomPosition(shuffledQuadrants[i])
    return (
      <GalleryImage
        style={position}
        src={'https://images.takeshape.io/' + image.path}
      />
    )
  })

  return (
    <GalleryLine key={heading}>
      {showImages}

      <GalleryHeading>{heading}</GalleryHeading>
    </GalleryLine>
  )
}

export const HeadingGallery = ({ content }) => {
  console.log(content)
  const headers = content.line.map(GalleryItem)
  return (
    <Wrapper>
      <HoverTarget>{headers}</HoverTarget>
    </Wrapper>
  )
}
