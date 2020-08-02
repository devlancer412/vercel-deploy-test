import styled, { css } from 'styled-components'

import * as body from '../lib/body'
import * as animate from '../../../lib/animate'
import * as convert from '../../../lib/convert'
import { generateGrid } from '../../../lib/grid'

import * as typography from '../../blocks/typography'

const grid = generateGrid()

export const Wrapper = styled.p<{ animation: string }>`
  ${typography.bodyCopy}

  ${typography.textIndent}
  white-space: pre-wrap;
  margin-block-start: 0em;
  margin-block-end: 0em;

  ${({ animation }) => animation}

  ${body.placement}
`

export const Unstyled = ({ children }) => {
  const [ref, animation] = animate.useDefaultAnimation()

  return (
    <Wrapper ref={ref} animation={animation}>
      {children}
    </Wrapper>
  )
}
