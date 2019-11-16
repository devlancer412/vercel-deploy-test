import styled from 'styled-components'

import * as Header from '../blocks/Typography/Header'
import * as Detail from '../blocks/Typography/Detail'
import * as Image from '../blocks/Image'

// Article Wrapper

export const Wrapper = styled.article`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 40px;
  grid-template-rows:
    [header] fit-content
    [subheading] fit-content
    [intro] fit-content;
    [content] fit-content;
`

// Feature Image

export const FeatureImage = styled.div`
  grid-column: 1 / span 6;
  width: 100%;
  margin-bottom: 58px;
`

export const Heading = styled.div`
  grid-column: 7 / span 6;
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

export const Dl = styled.dl``

export const Dt = styled(Detail.Dt)`
  margin-right: 8px;
  display: inline;
`

export const Dd = styled.dd`
  font-family: 'Editorial New Ultralight';
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0.18px;
  display: inline;
  margin-right: 18px;
  text-transform: uppercase;
`

// Subheading

export const SubHeading = styled.h2`
  grid-column: 1 / -1;
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
  grid-column: 4 / -1;
  font-family: 'Editorial New Ultralight';
  font-size: 28px;
  line-height: 36px;
  letter-spacing: 0.5px;
  white-space: pre-wrap;
  tab-size: 28px;
`
