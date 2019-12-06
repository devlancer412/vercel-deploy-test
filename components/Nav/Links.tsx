import styled from 'styled-components'

import * as Detail from '../blocks/Typography/Detail'

import { generateGrid } from '../../lib/grid'
const grid = generateGrid()

const Link = styled(Detail.Link)`
  font-size: 1.2rem;
  margin-left: 6.5rem;

  &:hover {
    color: #000000;
    font-family: 'Adieu Backslant';
    margin-left: 6.55rem;

    &:first-child {
      margin-left: 0.05rem;
    }
  }

  &:first-child {
    margin-left: 0;
  }
`

type LinksType = { align: 'left' | 'right' }

const Wrapper = styled.div<LinksType>`
  ${({ align }) => grid.placeInColumns(align === 'left' ? 1 : 8, { span: 5 })}
  ${grid.placeInRows(1)}

  text-align: ${({ align }) => align};
`

export const Left = () => {
  return (
    <Wrapper align="left">
      <Link href="/case-studies">Case Studies</Link>
      <Link href="/about">About</Link>
    </Wrapper>
  )
}

export const Right = () => {
  return (
    <Wrapper align="right">
      <Link href="/news">News</Link>
      <Link href="/features">Features</Link>
      <Link href="/opinions">Opinions</Link>
    </Wrapper>
  )
}
