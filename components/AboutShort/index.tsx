import React from 'react'
import { gql } from 'apollo-boost'
import styled from 'styled-components'

import { useDefaultAnimation } from '../../lib/animate'

import * as parse from '../../lib/parse'
import * as convert from '../../lib/convert'
import * as grid from '../../lib/grid'

export const fragment = gql`
  fragment AboutShort on EmphasisedText {
    content
  }
`

const gridColumn = (start, span) =>
  grid.placeInColumns(true)(start, { span: span })

const Wrapper = styled.div<any>`
  font-family: 'Editorial New Ultralight';

  font-size: ${convert.viewportUnits(4, { to: 1.2 }).fromRem}; // 4rem
  letter-spacing: ${convert.viewportUnits(0.1, { to: 0.03 }).fromRem}; // 0.1rem
  text-transform: uppercase;
  line-height: 1.25; // 5rem
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;

  ${gridColumn(1, 12)}
  margin: 0;

  ${({ animate }) => animate}

  @media (min-width: 550px) {
    ${gridColumn(1.5, 11)}
    margin-left: -${({ theme }) => theme.grid.gap};
    margin-right: -${({ theme }) => theme.grid.gap};
  }
`

const Highlighted = styled.span`
  font-size: ${convert.viewportUnits(2.4, { to: 1 }).fromRem}; // 2.4rem
  letter-spacing: ${convert.viewportUnits(0.12, { to: 0.05 })
    .fromRem}; // 0.12rem
  vertical-align: baseline;
  line-height: unset;
  white-space: nowrap;
`

const CenteredParagraph = styled.p`
  margin: auto 0;
`

export const AboutShort = ({ details }) => {
  const { content } = details
  const fancyContent = parse.highlightedText(content, Highlighted)
  const [ref, animate] = useDefaultAnimation({
    speed: '2s',
    y: '40px',
  })

  return (
    <Wrapper ref={ref} animate={animate}>
      <CenteredParagraph>{fancyContent}</CenteredParagraph>
    </Wrapper>
  )
}
