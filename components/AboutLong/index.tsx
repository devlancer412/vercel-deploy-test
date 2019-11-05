import React from 'react'
import { gql } from 'apollo-boost'
import styled from 'styled-components'

import * as parse from '../../lib/parse'

export const fragment = gql`
  fragment AboutLong on EmphasisedText {
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
  letter-spacing: 0.5px;
  text-align: left;
  white-space: pre-wrap;
  font-weight: 0;
  margin-bottom: 40px;
  margin-top: 3px;
  tab-size: 28px;

  p {
    margin-block-start: 20px;
    margin-block-end: 20px;
  }
`

const Highlighted = styled.span`
  border-bottom: 1px solid;
  line-height: 26px;
  display: inline-block;
  vertical-align: baseline;
`

export const AboutLong = ({ details }) => {
  const paragraphs = details.content
    .split('\n\n')
    .map((paragraph, i) => (
      <p key={`about-long-paragraph-${i}`}>
        {parse.highlightedText(paragraph, Highlighted)}
      </p>
    ))

  return <Wrapper>{paragraphs}</Wrapper>
}
