import { gql } from 'apollo-boost'
import styled from 'styled-components'

import * as Block from './blocks'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 40px;
  grid-column: 1 / -1;
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
