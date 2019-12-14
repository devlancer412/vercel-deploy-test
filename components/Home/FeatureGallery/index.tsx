import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { generateGrid } from '../../../lib/grid'
import * as convert from '../../../lib/convert'
import * as animate from '../../../lib/animate'

import * as PositionBar from './PositionBar'
import * as Preview from './Preview'
import * as Arrow from './Arrow'
import * as Img from '../../blocks/Image/Fetch'

const grid = generateGrid({
  columns: { repeat: [11, '1fr'] },
  rows: { repeat: [2, 'auto'] },
})

export const Wrapper = styled.article`
  ${grid.placeInColumns(1.5, { span: 11 })}
  ${grid.display}
  ${grid.columns}
  margin-bottom: ${convert.viewportUnits(12, { by: 0.4 }).fromRem}; // 12rem
`

const Previews = styled.div`
  ${grid.placeInColumns(1, { span: 12 })}
  display: flex;
  overflow: hidden;
  width: 100%;
  z-index: 2;
  position: relative;
`

const PreviewBodies = styled(Previews)`
  ${grid.placeInRows(1)}
`

const PreviewHeadings = styled(Previews)`
  ${grid.placeInRows(2)}
`

const HoverTarget = styled.div`
  ${grid.placeInColumns(1, { span: 11 })}
  ${grid.display}
  ${grid.columns}
  ${grid.rows}

  &:hover {
    a { color: #e9e9e9; }
  }
`

const Arrows = styled.div`
  ${grid.placeInColumns(10, { span: 2 })}
  ${grid.placeInRows(2)}
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 3;

  &:hover {
    // hahhahahahahahahaha
    ~ * {
      a,
      h2 {
        color: #000000 !important;
      }
    }
  }
`

const InternalWrapper = styled.div<any>`
  transform: translate(-${({ transformX }) => transformX}px, 0);
  ${animate.defaultTransition}
  transition-property: transform;
  display: flex;
  width: 100%;
`

export const FeatureGallery = ({ featured }) => {
  const [index, setIndex] = React.useState(0)

  // Use to reference carousel x position
  const previewsWrapper = React.useRef(null)

  const nextPreview = () => setIndex(i => i + 1)
  const previousPreview = () => setIndex(i => i - 1)

  const transformX = previewsWrapper.current
    ? index * previewsWrapper.current.clientWidth
    : 0

  // animations
  const [headingsRef, headingsAnimation] = animate.useDefaultAnimation()

  const renderedPreviews = featured.map((article, i) => (
    <Preview.Body
      key={`preview-body-${article._id}-${i}`}
      article={article}
      i={i}
    />
  ))

  const renderedHeadings = featured.map((article, i) => (
    <Preview.Heading
      animation={headingsAnimation}
      key={`preview-header-${article._id}-${i}`}
      article={article}
      i={i}
    />
  ))

  return (
    <Wrapper>
      <HoverTarget>
        <Arrows>
          <Arrow.Arrow
            facing="left"
            visible={!!index}
            onClick={previousPreview}
          />

          <Arrow.Arrow
            facing="right"
            visible={index < featured.length - 1}
            onClick={nextPreview}
          />
        </Arrows>

        <PreviewBodies ref={previewsWrapper}>
          <InternalWrapper transformX={transformX}>
            {renderedPreviews}
          </InternalWrapper>
        </PreviewBodies>

        <PreviewHeadings>
          <InternalWrapper ref={headingsRef} transformX={transformX}>
            {renderedHeadings}
          </InternalWrapper>
        </PreviewHeadings>
      </HoverTarget>

      <PositionBar.Bar length={featured.length} current={index} />
    </Wrapper>
  )
}
