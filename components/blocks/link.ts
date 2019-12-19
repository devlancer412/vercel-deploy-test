import { css } from 'styled-components'

import * as animate from '../../lib/animate'

export const gray = css`
  color: #000000;
  ${animate.defaultTransition}
  transition-property: color;
  transition-speed: 0.4s;

  &:hover {
    color: #e9e9e9;
    ${animate.defaultTransition}
    transition-property: color;
    transition-speed: 0.4s;
  }
`

export const backslant = css`
  &:hover {
    font-family: 'Adieu Backslant';
  }
`
