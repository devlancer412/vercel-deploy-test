import { gql } from 'apollo-boost'
import styled from 'styled-components'

import { generateGrid } from '../../lib/grid'

import * as Segment from './segments'
import * as Block from './blocks'

const grid = generateGrid()

export const Wrapper = styled.div<{ config: Segment.Config }>`
  ${grid.placeInColumns(1, { span: 12 })}
  ${grid.display}
  ${grid.columns}
  ${grid.rows}

  ${({ config }) => Segment.interactions(config)}
`

export const Content = ({ content, config = {} }) => {
  const { blocks, entityMap } = content
  const segmentMap = Segment.map(config)
  const blockProcessor = Block.process(segmentMap, entityMap)

  const processedBlocks = blocks
    .reduce((prevBlocks, block) => {
      const process = blockProcessor[block.type]
      if (!process) return prevBlocks
      return process(prevBlocks, block)
    }, [])
    .reverse()

  return (
    <Wrapper config={config}>
      {processedBlocks.map(({ element }) => element)}
    </Wrapper>
  )
}
