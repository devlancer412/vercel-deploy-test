import { gql } from 'apollo-boost'
import styled from 'styled-components'

import { generateGrid } from '../../lib/grid'

import * as Block from './blocks'

const grid = generateGrid()

const Wrapper = styled.div`
  ${grid.placeInColumns(1, { span: 12 })}
  ${grid.placeInRows(5)}
  ${grid.display}
  ${grid.columns}
  ${grid.rows}
`

export const Content = ({ content }) => {
  const { blocks, entityMap } = content

  const processedBlocks = blocks
    .reduce((prevBlocks, block) => {
      const process = Block.process(entityMap)[block.type]
      if (!process) return prevBlocks
      return process(prevBlocks, block)
    }, [])
    .reverse()

  return <Wrapper>{processedBlocks.map(({ element }) => element)}</Wrapper>
}
