import React from 'react'
import { gql } from 'apollo-boost'
import styled from 'styled-components'

import * as parse from '../../lib/parse'

export const fragment = gql`
  fragment AboutShort on EmphasisedText {
    content
  }
`

const Wrapper = styled.div`
  font-family: 'Editorial New Ultralight';
  margin-left: -40px;
  margin-right: -40px;

  grid-column: 2 / span 10;

  font-size: 40px;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 50px;
  text-align: center;

  display: flex;
  align-items: center;
`

const Highlighted = styled.span`
  font-size: 24px;
  letter-spacing: 1.2px;
  vertical-align: baseline;
  line-height: unset;
  white-space: nowrap;
`

export const AboutShort = ({ details }) => {
  const { content } = details
  const fancyContent = parse.highlightedText(content, Highlighted)

  return (
    <Wrapper>
      <p>{fancyContent}</p>
    </Wrapper>
  )
}
