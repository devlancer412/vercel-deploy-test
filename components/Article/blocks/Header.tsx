import styled, { css } from 'styled-components'

import * as emphasise from '../../../lib/parse'
import * as convert from '../../../lib/convert'
import * as animate from '../../../lib/animate'
import { generateGrid } from '../../../lib/grid'
import * as body from '../lib/body'

import * as Unstyled from './Unstyled'
import * as typography from '../../blocks/typography'

const grid = generateGrid()

const scaleDownBy = 0.4
const topMargin = convert.viewportUnits(6.8, { by: 0.625 }).fromRem
const bottomMargin = convert.viewportUnits(7.8, { by: 0.625 }).fromRem

const base = css<{ animation: string }>`
  ${body.placement}
  font-family: 'Adieu Light';
  text-transform: uppercase;
  ${({ animation }) => animation}

  & + *:not(${Unstyled.Paragraph}) {
    margin-top: ${convert.viewportUnits(2, { by: 0.625 }).fromRem};
  }
`

const H1 = styled.h1<{ animation: string }>`
  margin-top: ${convert.viewportUnits(4, { by: 0.625 }).fromRem};
  margin-bottom: ${convert.viewportUnits(3, { by: 0.625 }).fromRem};
  font-size: ${convert.viewportUnits(2.5, { by: 0.625 }).fromRem};

  ${base}
`

const H2 = styled.h2<{ animation: string }>`
  margin-top: ${convert.viewportUnits(3.5, { by: 0.625 }).fromRem};
  margin-bottom: ${convert.viewportUnits(2.5, { by: 0.625 }).fromRem};
  font-size: ${convert.viewportUnits(2, { by: 0.625 }).fromRem};

  ${base}
`

const H3 = styled.h3<{ animation: string }>`
  margin-top: ${convert.viewportUnits(3, { by: 0.625 }).fromRem};
  margin-bottom: ${convert.viewportUnits(2, { by: 0.625 }).fromRem};
  font-size: ${convert.viewportUnits(1.5, { by: 0.625 }).fromRem};

  ${base}
`

const components = {
  'header-one': H1,
  'header-two': H2,
  'header-three': H3,
}

const Header = ({ type, text }) => {
  const [ref, animation] = animate.useDefaultAnimation()

  const HeaderComponent = components[type]

  return (
    <HeaderComponent ref={ref} animation={animation}>
      {text}
    </HeaderComponent>
  )
}

export function process(prevBlocks, current) {
  // Ignore any styles inside a pullquote
  const block = {
    type: current.type,
    element: <Header text={current.text} type={current.type} />,
  }
  return [block, ...prevBlocks]
}
