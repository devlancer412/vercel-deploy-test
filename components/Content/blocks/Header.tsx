export function process(segmentMap) {
  return (prevBlocks, current) => {
    const segment = segmentMap[current.type]
      ? segmentMap[current.type]
      : segmentMap.unstyled

    const block = {
      type: current.type,
      element: segment(current.text),
    }
    return [block, ...prevBlocks]
  }
}
