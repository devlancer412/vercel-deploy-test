import * as replace from '../lib/replace'
import * as body from '../lib/body'

export function process(segmentMap, entityMap) {
  return (prevBlocks, current, i) => {
    // Ignore empty lines. Purposeful empty lines can be rendered using a ' '
    if (current.text === '') return prevBlocks
    if (current.text.trim() === '')
      return [
        {
          type: 'empty',
          element: segmentMap.empty(i),
        },
        ...prevBlocks,
      ]

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
      if (data.type === 'unstyled') return data.text
      const renderSegment = segmentMap[data.type]
      return renderSegment ? renderSegment(data, i) : data.text
    })

    const block = {
      type: 'unstyled',
      element: segmentMap.unstyled(wrappedText, i),
    }

    return [block, ...prevBlocks]
  }
}
