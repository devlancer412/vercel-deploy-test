import styled from 'styled-components'

import * as emphasise from '../../../lib/parse'

const Aside = styled.aside`
  font-family: 'Adieu Light';
  font-size: 40px;
  line-height: 40px;
  letter-spacing: 0.7px;
  grid-column: 2 / -2;
  margin: 68px -40px 78px -40px;
  text-transform: uppercase;
`

const Cite = styled.cite`
  font-family: 'Adieu Light';
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.18px;
  text-transform: uppercase;
  vertical-align: 17px;
  margin-right: 11px;
  font-style: normal;
`

const PullQuote = ({ quote }: { quote: string }) => {
  const segments = emphasise.highlightedText(quote, Cite)

  return (
    <Aside>
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
