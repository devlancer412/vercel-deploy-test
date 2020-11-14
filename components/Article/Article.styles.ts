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
  ${grid.placeInRows(2)}

  width: 100%;
  margin-bottom: 4rem;

  ${`@media (min-width: ${breakpoint}px)`} {
    ${grid.placeInColumns(1, { span: 6 })}
    ${grid.placeInRows(1)}
    margin-bottom: 5.8rem;
  }
`

export const Heading = styled.div`
  ${grid.placeInColumns(1, { span: 12 })}
  ${grid.placeInRows(1)}

  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 5.8rem;

  ${`@media (min-width: ${breakpoint}px)`} {
    ${grid.placeInColumns(7, { span: 6 })}
    ${grid.placeInRows(1)}
    align-items: flex-start;
  }
`

// Category & time

export const Category = styled(Detail.Detail)<WithAnimation>`
  margin-right: 4rem;
  ${({ animation }) => animation}
`

export const Time = styled(Detail.Time)<WithAnimation>`
  ${({ animation }) => animation}
`

// Article Header

export const H1 = styled(Header.H1)<WithAnimation>`
  margin: ${convert.viewportUnits(1.8, { to: 3.8 }).fromRem} 0; // desktop: 1.8rem
  text-align: center;
  ${({ animation }) => animation}

  ${`@media (min-width: ${breakpoint}px)`} {
    text-align: left;
  }
`

// Attribution

export const Attributions = styled(List.Ul)<WithAnimation>`
  display: block;
  text-align: center;
  ${({ animation }) => animation}

  ${`@media (min-width: ${breakpoint}px)`} {
    display: inline-flex;
  }
`

export const Attribution = styled.li``

export const Contributed = styled(Detail.Detail)`
  margin-right: 0.8rem;
  display: inline;
`

export const Person = styled.span`
  ${typography.editorialDetail}
  display: inline;
  margin-right: 1.8rem;
  margin-left: 0;
`

// Subheading

export const SubHeading = styled.h2<WithAnimation>`
  ${grid.placeInColumns(1, { span: 12 })}
  ${grid.placeInRows(3)}
  ${typography.subHeading}
  margin-bottom: 4.6rem;
  ${({ animation }) => animation}
`

// Intro

export const Intro = styled.div<WithAnimation>`
  ${grid.placeInColumns(1, { span: 12 })}
  ${grid.placeInRows(4)}
  ${typography.intro}
  white-space: pre-wrap;
  ${typography.textIndent}
  ${({ animation }) => animation}
  margin-bottom: 5rem;

  @media (min-width: 500px) {
    ${grid.placeInColumns(4, { span: 9 })}
  }
`
