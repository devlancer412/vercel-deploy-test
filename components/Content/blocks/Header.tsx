export function process(segmentMap) {
  return (prevBlocks, current, i) => {
    const segment = segmentMap[current.type]
      ? segmentMap[current.type]
      : segmentMap.unstyled

    const block = {
      type: current.type,
      element: segment(current.text, i),
    }
    return [block, ...prevBlocks]
  }
}
