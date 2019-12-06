import styled from 'styled-components'

import { generateGrid } from '../../lib/grid'

import * as Header from '../blocks/Typography/Header'
import * as Detail from '../blocks/Typography/Detail'
import * as Image from '../blocks/Image'
import * as List from '../blocks/List'

const grid = generateGrid()

// Feature Image

export const FeatureImage = styled.div`
  ${grid.placeInColumns(1, { span: 6 })}
  width: 100%;
  margin-bottom: 58px;
`

export const Heading = styled.div`
  ${grid.placeInColumns(7, { span: 6 })}
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 58px;
`

// Category & time

export const Category = styled(Detail.Detail)`
  margin-right: 40px;
`

export const Time = Detail.Time

// Article Header

export const H1 = styled(Header.H1)`
  margin: 18px 0;
`

// Attribution

export const Attributions = styled(List.Ul)`
  display: inline-flex;
`

export const Attribution = styled.li``

export const Contributed = styled(Detail.Detail)`
  margin-right: 8px;
  display: inline;
`

export const Person = styled.span`
  font-family: 'Editorial New Ultralight';
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0.18px;
  display: inline;
  margin-right: 18px;
  margin-left: 0;
  text-transform: uppercase;
`

// Subheading

export const SubHeading = styled.h2`
  ${grid.placeInColumns(1, { span: 12 })}
  font-family: 'Editorial New Ultralight';
  font-size: 40px;
  line-height: 50px;
  letter-spacing: 1px;
  font-weight: 100;
  text-transform: uppercase;
  margin-bottom: 46px;
`

// Intro

export const Intro = styled.div`
  ${grid.placeInColumns(4, { span: 9 })}
  font-family: 'Editorial New Ultralight';
  font-size: 28px;
  line-height: 36px;
  letter-spacing: 0.5px;
  white-space: pre-wrap;
  tab-size: 28px;
  -moz-tab-size: 28px;
`
