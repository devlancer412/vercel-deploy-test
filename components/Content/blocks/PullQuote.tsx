export function process(segmentMap) {
  return (prevBlocks, current) => {
    // Ignore any styles inside a pullquote
    const block = {
      type: 'pullquote',
      element: segmentMap.pullquote(current.text),
    }
    return [block, ...prevBlocks]
  }
}
