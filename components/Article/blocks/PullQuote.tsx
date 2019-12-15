import styled from 'styled-components'

import * as emphasise from '../../../lib/parse'
import * as convert from '../../../lib/convert'
import * as animate from '../../../lib/animate'
import { generateGrid } from '../../../lib/grid'

import * as typography from '../../blocks/typography'

const grid = generateGrid()

const scaleDownBy = 0.4
const topMargin = convert.viewportUnits(6.8, { by: 0.625 }).fromRem
const bottomMargin = convert.viewportUnits(7.8, { by: 0.625 }).fromRem

const Aside = styled.aside<{ animation: string }>`
  ${grid.placeInColumns(1, { span: 12 })}
  font-family: 'Adieu Light';
  font-size: ${convert.viewportUnits(4, { by: scaleDownBy }).fromRem}; // 4rem
  line-height: 1;
  font-weight: 100;
  text-transform: uppercase;
  letter-spacing: ${convert.viewportUnits(0.07, { by: scaleDownBy })
    .fromRem}; // 0.07rem
  margin: ${topMargin} 0 ${bottomMargin} 0;

  ${({ animation }) => animation}

  @media (min-width: 550px) {
    ${grid.placeInColumns(1.5, { span: 11 })}
  }
`

const Cite = styled.cite`
  ${typography.detail}
  vertical-align: ${
    convert.viewportUnits(1.7, { by: scaleDownBy }).fromRem
  }; // 1.7rem
  margin-right: 1.1rem;
  font-style: normal;
`

const PullQuote = ({ quote }: { quote: string }) => {
  const [ref, animation] = animate.useDefaultAnimation()
  const segments = emphasise.highlightedText(quote, Cite)

  return (
    <Aside ref={ref} animation={animation}>
      <p>{segments}</p>
    </Aside>
  )
}

export function process(prevBlocks, current) {
  // Ignore any styles inside a pullquote
  const block = {
    type: 'pullquote',
    element: <PullQuote quote={current.text} />,
  }
  return [block, ...prevBlocks]
}
