import React from 'react'
import { gql } from 'apollo-boost'
import styled, { css } from 'styled-components'

import * as parse from '../../lib/parse'
import * as convert from '../../lib/convert'

import * as typography from '../blocks/typography'

export const fragment = gql`
  fragment AboutLong on EmphasisedText {
    content
  }
`

const column = (start, span) => css`${start} / span ${span}`

const Wrapper = styled.div`
  ${typography.intro}
  text-align: left;

  grid-column: ${column(1, 12)};
  margin: 3px 0 40px 0;

  @media (min-width: 550px) {
    grid-column: ${column(2, 10)};
    margin-left: ${({ theme }) => convert.minus(theme.grid.gap)};
    margin-right: ${({ theme }) => convert.minus(theme.grid.gap)};
  }

  p {
    white-space: pre-wrap;
    tab-size: ${convert.viewportUnits(2.8, { by: 0.625 }).fromRem}; // 2.8rem
    margin-block-start: 20px;
    margin-block-end: 20px;
  }
`

const HighlightedWord = styled.span`
  border-bottom: 1px solid;
  line-height: 0.928571; // 2.6rem
  display: inline-block;
  vertical-align: baseline;
`

const Highlighted = ({ children }) => {
  // https://stackoverflow.com/questions/24503827/split-string-into-array-without-deleting-delimiter
  const words = children.match(/ |[^ ]+/g)
  return words.map((word, i) => (
    <HighlightedWord key={`${children}-${word}-${i}`}>{word}</HighlightedWord>
  ))
}

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
