import * as replace from '../lib/replace'

const render = (segmentMap, segment, i) => {
  const renderSegment = segmentMap[segment.type]
  if (!renderSegment) return null
  return renderSegment(segment, i)
}

const isGalleryImage = block => {
  if (!isImage(block)) return false
  const { size, alignment } = block.segment.entity.data
  return !size && !alignment
}

const isImage = block => block && block.type === 'image'
const isGallery = block => block.type === 'gallery'

const createGalleryBlock = (segmentMap, segments, i) => ({
  type: 'gallery',
  segments,
  element: segmentMap.gallery(segments, i),
})

export function process(segmentMap, entityMap) {
  return (prevBlocks, current, i) => {
    // Process the atomic entity
    const block = replace.entities(current, entityMap)
    const [firstSegment] = block.segments
    // Don't know what to do with multiples yet
    if (block.segments.length > 1 || !firstSegment) return prevBlocks

    const atomic = {
      type: firstSegment.type,
      segment: firstSegment,
      element: render(segmentMap, firstSegment, i),
    }

    // The following logic is about condensing 3 or more back to back images
    // into a gallery.
    const [firstBlock, secondBlock, ...restBlocks] = prevBlocks

    // Definitely can't be a gallery
    if (!firstBlock || !isGalleryImage(atomic)) return [atomic, ...prevBlocks]

    // If the last element was a gallery, add the current image to that
    if (isGallery(firstBlock)) {
      const segments = [atomic.segment, ...firstBlock.segments]
      const galleryBlock = createGalleryBlock(segmentMap, segments, i)
      return [galleryBlock, secondBlock, ...restBlocks]
    }

    // If one of two preceding blocks aren't images, can't turn into gallery
    if (!isGalleryImage(firstBlock) || !isGalleryImage(secondBlock)) {
      return [atomic, ...prevBlocks]
    }

    // If both preceding blocks are images, condense them into a gallery
    const segments = [atomic.segment, firstBlock.segment, secondBlock.segment]

    const galleryBlock = createGalleryBlock(segmentMap, segments, i)
    return [galleryBlock, ...restBlocks]
  }
}
