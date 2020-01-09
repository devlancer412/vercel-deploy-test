import styled, { css } from 'styled-components'

import * as replace from '../lib/replace'
import * as body from '../lib/body'
import * as animate from '../../../lib/animate'
import * as convert from '../../../lib/convert'
import { generateGrid } from '../../../lib/grid'

import * as typography from '../../blocks/typography'

import * as segments from '../segments'

const grid = generateGrid()

export const Paragraph = styled.p<{ animation: string }>`
  ${typography.bodyCopy}

  ${typography.textIndent}
  white-space: pre-wrap;
  margin-block-start: 0em;
  margin-block-end: 0em;

  ${({ animation }) => animation}

  ${body.placement}
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
