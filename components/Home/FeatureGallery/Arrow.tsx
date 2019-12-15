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
  height: 1.7rem; // 1.7rem
  width: 1.7rem; // 1.7rem
  background-color: transparent;
  border: none;
  z-index: 2;

  padding: 0;
  position: relative;
  transform: rotate(${rotated}deg);
  pointer-events: ${({ visible }) => (visible ? 'all' : 'none')};

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

  &:hover {
    &:before,
    &:after {
      background-color: #e9e9e9;
    }
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
