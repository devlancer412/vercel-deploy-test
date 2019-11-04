import React from 'react'
import { gql } from 'apollo-boost'
import styled from 'styled-components'

import * as parse from '../../lib/parse'

export const fragment = gql`
  fragment AboutLong on AboutLong {
    content
  }
`

const Wrapper = styled.div`
  font-family: 'Editorial New Ultralight';
  margin-left: -40px;
  margin-right: -40px;

  grid-column: 2 / span 10;

  font-size: 28px;
  line-height: 36px;
  letter-spacing: 1px;
  text-align: left;
  white-space: pre-wrap;
`

const Highlighted = styled.span`
  text-decoration: underline;
`

export const AboutLong = ({ details }) => {
  const { content } = details
  const fancyContent = parse.highlightedText(content, Highlighted)

  return (
    <Wrapper>
      <p>{fancyContent}</p>
    </Wrapper>
  )
}
