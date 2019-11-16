import styled from 'styled-components'

import * as Detail from '../blocks/Typography/Detail'

export const Heading = styled.h2`
  font-family: 'Adieu Light';
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.36px;
  text-transform: uppercase;
  font-weight: 100;
  grid-column: 1 / span 4;
  margin-top: 19px;
  margin-bottom: 3px;
  transition: color 0.2s;
`

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 40px;
  padding-top: 7px;
  color: #000;
  text-decoration: none;

  &:hover {
    ${Heading} {
      color: #e9e9e9;
    }
  }
`

export const Category = styled(Detail.Detail)`
  margin-right: 20px;
`

export const Time = styled(Detail.Time)``

export const Details = styled(Detail.Block)`
  grid-column: 1 / -1;
  padding-left: 2px;

  span {
    margin-right: 38px;
  }
`

export const Intro = styled.p`
  font-family: 'Editorial New Ultralight';
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0.36px;
  grid-column: 1 / -1;
  text-indent: 56px;
  padding-left: 3px;

  overflow: hidden;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`

export const FeatureImage = styled.div`
  margin-bottom: 12px;
  grid-column: 1 / -1;
`
