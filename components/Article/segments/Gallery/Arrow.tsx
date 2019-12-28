import styled, { css } from 'styled-components'

import { generateGrid } from '../../../../lib/grid'
import * as convert from '../../../../lib/convert'

const grid = generateGrid()

const otherDirection = ({ facing }) => (facing === 'left' ? 'right' : 'left')

const direction = ({ facing }) => facing

const animate = ({ visible, facing }) =>
  visible
    ? css`
        opacity: 1;
      `
    : css`
        opacity: 0;
        transform: translateX(${facing === 'left' ? '50vw' : '-50vw'});
      `

const arrowScale = 0.2
const arrowHeadSize = convert.viewportUnits(47, { by: arrowScale }).fromPx // 47px
const arrowHeadOffset = convert.viewportUnits(8, { by: arrowScale }).fromPx // 8px
const tailLength = convert.viewportUnits(103, { by: arrowScale }).fromPx // 103px

const Head = styled.div<any>`
  width: ${arrowHeadSize};
  height: ${arrowHeadSize};
  border: 2px solid #000000;
  border-${otherDirection}: none;
  border-${({ facing }) => (facing === 'left' ? 'top' : 'bottom')}: none;
  transform: rotate(45deg);
  position: absolute;
  ${direction}: ${arrowHeadOffset};
`

const Tail = styled.div`
  width: ${tailLength};
  height: 2px;
  background-color: #000000;
`

const Wrapper = styled.div<any>`
  display: flex;
  ${({ facing }) =>
    grid.placeInColumns(facing === 'left' ? 1 : 11, { span: 2 })};
  ${grid.placeInRows(1)}
  position: relative;
  align-items: center;
  ${animate}
  margin-${direction}: auto;
  margin-${otherDirection}: -16px;
  transition: 0.4s ease-in all;
`

type Direction = 'left' | 'right'

type ArrowProps = {
  facing: Direction
  visible: boolean
  onClick: () => void
}

export const Arrow = ({ facing, visible, onClick }: ArrowProps) => {
  return (
    <Wrapper facing={facing} visible={visible} onClick={onClick}>
      <Tail />
      <Head facing={facing} />
    </Wrapper>
  )
}
