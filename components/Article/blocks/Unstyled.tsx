import styled from 'styled-components'

import * as replace from '../lib/replace'
import * as animate from '../../../lib/animate'
import { generateGrid } from '../../../lib/grid'

import * as typography from '../../blocks/typography'

import * as segments from '../segments'

const grid = generateGrid()

const Paragraph = styled.p<{ animation: string }>`
  white-space: pre-wrap;

  ${typography.bodyCopy}

  margin-block-start: 0em;
  margin-block-end: 0em;

  ${({ animation }) => animation}

  ${grid.placeInColumns(1, { span: 12 })}

  @media (min-width: 650px) {
    ${grid.placeInColumns(1.5, { span: 11 })}
  }

  @media (min-width: 700) {
    ${grid.placeInColumns(2, { span: 10 })}
  }

  @media (min-width: 800px) {
    ${grid.placeInColumns(2.5, { span: 9 })}
  }

  @media (min-width: 900px) {
    ${grid.placeInColumns(3, { span: 8 })}
  }

  @media (min-width: 1000px) {
    ${grid.placeInColumns(3.5, { span: 7 })}
  }

  @media (min-width: 1100px) {
    ${grid.placeInColumns(3.5, { span: 7 })}
  }

  @media (min-width: 1200px) {
    ${grid.placeInColumns(4, { span: 6 })}
  }
`

const Unstyled = ({ children }) => {
  const [ref, animation] = animate.useDefaultAnimation()

  return (
    <Paragraph ref={ref} animation={animation}>
      {children}
    </Paragraph>
  )
}

export function process(entityMap) {
  return (prevBlocks, current) => {
    // Ignore empty lines. Purposeful empty lines can be rendered using a ' '
    if (current.text === '') return prevBlocks

    // Insert elements like links
    const withSegments = replace.entities(current, entityMap)

    // Parse inline styles segments
    const withInline = withSegments.segments.reduce((all, segment) => {
      if (segment.type !== 'unstyled') return [...all, segment]
      const parsedSegment = replace.inlineStyles(
        segment,
        current.inlineStyleRanges
      )
      return [...all, ...parsedSegment]
    }, [])

    // Insert components
    const wrappedText = withInline.map(data => {
      const renderSegment = segments.map[data.type]
      return renderSegment ? renderSegment(data) : data.text
    })

    const block = {
      type: 'unstyled',
      element: <Unstyled>{wrappedText}</Unstyled>,
    }

    return [block, ...prevBlocks]
  }
}
