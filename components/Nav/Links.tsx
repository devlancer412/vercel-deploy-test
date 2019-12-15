import styled from 'styled-components'

import * as convert from '../../lib/convert'
import * as animate from '../../lib/animate'

import * as Detail from '../blocks/Typography/Detail'

import { generateGrid } from '../../lib/grid'
const grid = generateGrid()

const breakpoint = 800

const Link = styled(Detail.Link)`
  font-size: ${convert.viewportUnits(1.2, { to: 1 }).fromRem}; // 1.2rem

  margin-bottom: ${convert.viewportUnits(3, { by: 0.15 }).fromRem};
  margin-left: 0;

  ${`@media (min-width: ${breakpoint}px)`} {
    margin-left: ${convert.viewportUnits(6.5, { by: 0.15 }).fromRem}; // 6.5rem
    margin-bottom 0;

    &:hover {
      &:first-child {
        margin-left: 0.05rem;
      }
    }
  }

  &:hover {
    color: #000000;
    font-family: 'Adieu Backslant';
  }

  &:first-child {
    margin-left: 0;
  }
`

type LinksType = { align: 'left' | 'right' }

const Wrapper = styled.div<LinksType>`
  ${({ align }) => grid.placeInColumns(align === 'left' ? 1 : 8, { span: 5 })}
  ${grid.placeInRows(1)}

  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${`@media (min-width: ${breakpoint}px)`} {
    text-align: ${({ align }) => align};
    display: block;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`

const expandedStyle = `
  opacity: 1;
  pointer-events: all;
`

const hiddenStyle = `
  opacity: 0;
  pointer-events: none;
`

const AllWrapper = styled.nav<any>`
  ${grid.placeInColumns(1, { span: 12 })}
  ${grid.placeInRows(1)}
  ${grid.display}
  ${grid.columns}

  ${animate.defaultTransition}

  position: fixed;
  height: 100vh;
  width: 100vw;
  top: -3.1rem; // same as parent padding
  left: calc(-1 * ${({ theme }) => theme.grid.padding});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  overflow: hidden;
  opacity: 1;
  ${({ expanded }) => (expanded ? expandedStyle : hiddenStyle)}

  ${`@media (min-width: ${breakpoint}px)`} {
    position: static;
    height: auto;
    width: auto;
    top: auto;
    left: auto;
    display: grid;
    background-color: transparent;
    z-index: 0;
    opacity: 1;
  }
`

export const All = ({ expanded = false }) => {
  return (
    <AllWrapper expanded={expanded}>
      <Left />
      <Right />
    </AllWrapper>
  )
}

export const Left = () => {
  return (
    <Wrapper align="left">
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
