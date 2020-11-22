export function process(segmentMap) {
  return (prevBlocks, current, i) => {
    // Ignore any styles inside a pullquote
    const block = {
      type: 'pullquote',
      element: segmentMap.pullquote(current.text, i),
    }
    return [block, ...prevBlocks]
  }
}
