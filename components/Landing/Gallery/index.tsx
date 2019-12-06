import React from 'react'
import { gql } from 'apollo-boost'
import styled from 'styled-components'
import { getImageUrl } from 'takeshape-routing'

import * as randomlyPlace from '../../../lib/randomlyPlace'
import * as convert from '../../../lib/convert'
import * as animation from '../../../lib/animate'
import { generateGrid } from '../../../lib/grid'

const grid = generateGrid()

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

const Heading = styled.div<any>`
  pointer-events: none;
  position: relative;
  ${({ animate }) => animate}
  mix-blend-mode: darken;

  font-size: ${convert.viewportUnits(16, { to: 0 }).fromRem};
  font-family: 'Adieu Light';
  text-align: center;
  text-transform: uppercase;
  line-height: 0.825; // 132px
  letter-spacing: ${convert.viewportUnits(-0.4, { to: 0 }).fromRem};
  font-weight: 100;
`

const maxImageSize = convert.viewportUnits(40, { to: 8 })

const Image = styled.img<any>`
  ${animation.defaultTransition}
  opacity: 0;
  position: absolute;
  pointer-events: none;
  max-width: ${maxImageSize.fromRem};
  max-height: ${maxImageSize.fromRem};
`

const Row = styled.div<any>`
  -webkit-font-smoothing: subpixel-antialiased;
  margin: 0 auto;
  padding: ${convert.viewportUnits(0, { to: 4 }).fromRem} 0;

  &:hover {
    ${Image} {
      opacity: 2;
      ${animation.defaultTransition}
    }

    ${Heading} {
      color: #000000;
      ${animation.defaultTransition}
    }
  }
`

export const Wrapper = styled.div`
  ${grid.placeInColumns(1, { span: 12 })}

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

const GalleryRow = ({ text, images, pageJumped, rowIndex, placement }) => {
  const [ref, animate] = animation.useDefaultAnimation({
    ignore: pageJumped,
  })

  const { quadrants, positions } = placement

  const placedImages = React.useMemo(
    () =>
      images.map(({ image }, i) => {
        const [x, y] = quadrants[(i + rowIndex) % 4]
        const position = positions[`${x}-${y}`]

        const imagePosition = {
          [x]: `${position.x}%`,
          [y]: `${position.y}%`,
        }

        const genImageDetails = (screenSize: number) => {
          const imageSize = maxImageSize.atScreenSize('rem', screenSize) * 10

          return {
            url: getImageUrl(image.path, {
              q: 100,
              w: imageSize,
              h: imageSize,
              fit: 'clip',
            }),
            size: imageSize,
          }
        }

        const small = genImageDetails(500)
        const medium = genImageDetails(1000)
        const large = genImageDetails(1500)
        const xl = genImageDetails(2000)

        return (
          <Image
            animate={animate}
            key={`gallery-image-${image._id}-${text}-${i}`}
            src={large.url}
            srcSet={`
          ${small.url} ${small.size}w,
          ${medium.url} ${medium.size}w,
          ${large.url} ${large.size}w
          ${xl.url} ${xl.size}w
        `}
            sizes={`
          (max-width: 500px) ${small.size}px,
          (max-width: 1000px) ${medium.size}px,
          (max-width: 1500px) ${large.size}px
          ${xl.size}px
        `}
            style={imagePosition}
          />
        )
      }),
    []
  )

  return (
    <Row key={text} ref={ref}>
      {placedImages}
      <Heading animate={animate}>{text}</Heading>
    </Row>
  )
}

type GalleryProps = {
  content: any
  pageJumped: any
  className?: any
  placements: [any]
}

export const Gallery = ({
  content,
  pageJumped,
  className,
  placements,
}: GalleryProps) => {
  const headers = content.headings.map((heading, i) => (
    <GalleryRow
      key={`gallery-heading-${heading.text}`}
      {...heading}
      rowIndex={i}
      placement={placements[i]}
      pageJumped={pageJumped}
    />
  ))

  return (
    <Wrapper className={className}>
      <HoverTarget>{headers}</HoverTarget>
    </Wrapper>
  )
}
