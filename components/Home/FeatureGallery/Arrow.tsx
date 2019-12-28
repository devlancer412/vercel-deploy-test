import styled, { css } from 'styled-components'

import * as convert from '../../../lib/convert'
import * as animate from '../../../lib/animate'

const otherDirection = ({ facing }) => (facing === 'left' ? 'right' : 'left')

const direction = ({ facing }) => facing

const arrowColour = ({ visible }) => (visible ? `#000000;` : `#e9e9e9;`)

const rotated = ({ facing }) => (facing === 'left' ? 135 : -45)

const onFocus = `
  outline: none;
  border: 0;

  &:before, &:after {
    color: #000;
    outline-width: 1px;
    outline-style: dotted;
    outline-offset: 1px;
  }
`

const arrowButtonSide = (width, height) => css`
  width: ${width};
  height: ${height};
  background-color: ${arrowColour};
  position: absolute;
  content: '';
  bottom: 0;
  right: 0;
`

const ArrowButton = styled.button<any>`
  height: ${convert.viewportUnits(1.7, { by: 1.3 }).fromRem}; // 1.7rem
  width: ${convert.viewportUnits(1.7, { by: 1.3 }).fromRem}; // 1.7rem
  background-color: transparent;
  border: none;
  z-index: 2;
  margin: 0 0.2rem;

  padding: 0;
  position: relative;
  transform: rotate(${rotated}deg);
  pointer-events: ${({ visible }) => (visible ? 'all' : 'none')};

  cursor: pointer;

  ${animate.defaultTransition}
  transition-property: color;
  transition-delay: 1s;

  &:before {
    ${arrowButtonSide('100%', '1px')}
  }

  &:after {
    ${arrowButtonSide('1px', '100%')}
  }

  &::-moz-focus-inner {
    ${onFocus}
  }

  &:focus {
    ${onFocus}
  }
`

type Direction = 'left' | 'right'

type ArrowProps = {
  facing: Direction
  visible: boolean
  onClick: () => void
}

export const Arrow = ({ facing, visible, onClick }: ArrowProps) => {
  return <ArrowButton facing={facing} visible={visible} onClick={onClick} />
}
