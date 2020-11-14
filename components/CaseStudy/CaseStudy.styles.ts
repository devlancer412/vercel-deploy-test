import styled from 'styled-components'

import { generateGrid } from '../../lib/grid'
import * as convert from '../../lib/convert'

import * as typography from '../blocks/typography'

import * as Header from '../blocks/Typography/Header'
import * as Detail from '../blocks/Typography/Detail'
import * as Image from '../blocks/Image'
import * as List from '../blocks/List'

export const breakpoint = 950

const grid = generateGrid()

type WithAnimation = { animation: string }

// Feature Image

export const FeatureImage = styled.div`
  ${grid.placeInColumns(1, { span: 12 })}
  ${grid.placeInRows(1)}

  margin-left: calc(-1 * ${({ theme }) => theme.grid.padding});

  width: 100vw;
  height: 100vh;
  margin-bottom: 2.3rem;
`

export const Heading = styled.div`
  ${grid.placeInColumns(1, { span: 12 })}
  ${grid.placeInRows(2)}

  @media (min-width: ${breakpoint}px) {
    ${grid.placeInColumns(1.5, { span: 11 })}
  }
`

export const Scopes = styled.div<WithAnimation>`
  margin-bottom: 4.5rem;
  ${({ animation }) => animation}
`

export const ScopeListHeader = styled.span`
  display: inline;
  ${typography.detail}
  margin-right: 0.4rem;
`

export const ScopeList = styled(List.Ul)`
  display: inline;
`

export const Scope = styled.li`
  display: inline;
  ${typography.editorialDetail}
  margin-left: 2.5rem;
`

export const H1 = styled(Header.H1)<WithAnimation>`
  margin: ${convert.viewportUnits(1.8, { to: 3.8 }).fromRem} 0; // desktop: 1.8rem
  text-align: left;
  margin-bottom: 5.2rem;
  ${({ animation }) => animation}
`

export const Intro = styled.div<WithAnimation>`
  ${typography.intro}
  white-space: pre-wrap;
  ${typography.textIndent}
  ${({ animation }) => animation}
  margin-bottom: 4.9rem;
`
