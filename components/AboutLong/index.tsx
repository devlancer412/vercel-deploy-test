import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'

import * as parse from '../../lib/parse'
import * as convert from '../../lib/convert'
import { useDefaultAnimation } from '../../lib/animate'
import * as grid from '../../lib/grid'

import * as typography from '../blocks/typography'

export const fragment = gql`
  fragment AboutLong on EmphasisedText {
    content
  }
`

export const Wrapper = styled.div<any>`
  ${typography.intro}
  text-align: left;

  ${grid.placeInColumns(true)(1, { span: 12 })}
  margin: 3px 0 40px 0;

  ${({ animationStyle }) => animationStyle}

  @media (min-width: 550px) {
    ${grid.placeInColumns(true)(1.5, { span: 11 })}
  }

  p {
    white-space: pre-wrap;
    tab-size: ${convert.viewportUnits(2.8, { by: 0.625 }).fromRem}; // 2.8rem
    -moz-tab-size: ${convert.viewportUnits(2.8, { by: 0.625 })
      .fromRem}; // 2.8rem
    margin-block-start: 20px;
    margin-block-end: 20px;
  }
`

const HighlightedWord = styled.span`
  ${typography.underlined}
`

const Highlighted = ({ children }) => {
  // https://stackoverflow.com/questions/24503827/split-string-into-array-without-deleting-delimiter
  const words = children.match(/ |[^ ]+/g)
  return words.map((word, i) => (
    <HighlightedWord key={`${children}-${word}-${i}`}>{word}</HighlightedWord>
  ))
}

type AboutLongProps = {
  details: any
  className?: any
}

export const AboutLong = ({ details, className }: AboutLongProps) => {
  const [ref, animationStyle] = useDefaultAnimation()

  const paragraphs = details.content
    .split('\n\n')
    .map((paragraph, i) => (
      <p key={`about-long-paragraph-${i}`}>
        {parse.highlightedText(paragraph, Highlighted)}
      </p>
    ))

  return (
    <Wrapper className={className} ref={ref} animationStyle={animationStyle}>
      {paragraphs}
    </Wrapper>
  )
}

export const Selector = styled(AboutLong)
