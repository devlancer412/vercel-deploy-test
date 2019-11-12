export const entities: any = (block, entityMap) => {
  const replaced = block.entityRanges.reduce(
    ({ offset, current }, range, i) => {
      const entityStart = range.offset - offset
      const entityEnd = entityStart + range.length

      const [remaining, ...parsed] = current
      const subStr = remaining.text.substring(entityStart, entityEnd)
      const after = remaining.text.substring(entityEnd) || null
      const before = remaining.text.substring(0, entityStart) || null

      const beforeBlock = before
        ? { type: 'unstyled', text: before, offset }
        : null
      const afterBlock = after
        ? { type: 'unstyled', text: after, offset: range.offset + range.length }
        : null
      const entity = entityMap[range.key]
      const currentBlock = {
        type: entity.type,
        text: subStr,
        entity: entity,
        offset: range.offset,
      }

      const chain = [afterBlock, currentBlock, beforeBlock].filter(b => b)

      return {
        offset: entityEnd,
        current: [...chain, ...parsed],
      }
    },
    { offset: 0, current: [{ type: 'unstyled', text: block.text, offset: 0 }] }
  )

  const segments = replaced.current.reverse()

  return { type: block.type, segments }
}

export const inlineStyles: any = (segment, inlineStyleRanges) => {
  const replaced = inlineStyleRanges.reduce(
    ({ offset, current }, inlineStyle, i) => {
      const entityStart = inlineStyle.offset - offset
      const entityEnd = entityStart + inlineStyle.length

      if (entityStart < 0) return { offset, current }

      const [remaining, ...parsed] = current
      const subStr = remaining.text.substring(entityStart, entityEnd)
      const after = remaining.text.substring(entityEnd) || null
      const before = remaining.text.substring(0, entityStart) || null

      const beforeBlock = before ? { type: 'unstyled', text: before } : null
      const afterBlock = after ? { type: 'unstyled', text: after } : null
      const currentBlock = { type: inlineStyle.style, text: subStr }

      const chain = [afterBlock, currentBlock, beforeBlock].filter(b => b)

      return {
        offset: entityEnd,
        current: [...chain, ...parsed],
      }
    },
    {
      offset: segment.offset,
      current: [{ type: 'unstyled', text: segment.text }],
    }
  )

  return replaced.current.reverse()
}
