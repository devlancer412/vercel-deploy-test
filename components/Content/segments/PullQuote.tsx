import styled from 'styled-components'

import * as emphasise from '../../../lib/parse'
import * as convert from '../../../lib/convert'
import * as animate from '../../../lib/animate'
import { generateGrid } from '../../../lib/grid'

import * as typography from '../../blocks/typography'

const grid = generateGrid()

const topMargin = convert.viewportUnits(6.8, { by: 0.625 }).fromRem
const bottomMargin = convert.viewportUnits(7.8, { by: 0.625 }).fromRem

export const Wrapper = styled.aside<{ animation: string }>`
  ${grid.placeInColumns(1, { span: 12 })}
  ${typography.pullquote}
  // margin: ${topMargin} 0 ${bottomMargin} 0;

  ${({ animation }) => animation}

  @media (min-width: 550px) {
    ${grid.placeInColumns(1.5, { span: 11 })}
  }
`

const Cite = styled.cite`
  display: block;
  margin-bottom: 1.5rem;

  ${typography.detail}
  vertical-align: ${convert.viewportUnits(1.7, { by: 0.4 }).fromRem}; // 1.7rem
  margin-right: 1.1rem;
  font-style: normal;

  @media (min-width: 550px) {
    display: inline;
    margin-bottom: 0;
  }
`

export const PullQuote = ({ quote }: { quote: string }) => {
  const [ref, animation] = animate.useDefaultAnimation()
  const segments = emphasise.highlightedText(quote, Cite)

  return (
    <Wrapper ref={ref} animation={animation}>
      <p>{segments}</p>
    </Wrapper>
  )
}
