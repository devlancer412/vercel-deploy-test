import styled from 'styled-components'

import * as replace from '../lib/replace'
import * as segments from '../segments'

const Unstyled = styled.p`
  grid-column: 4 / -4;
  white-space: pre-wrap;
  font-family: 'Editorial New Ultralight';
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0.36px;
  margin-block-start: 0em;
  margin-block-end: 0em;
  tab-size: 28px;
`

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
