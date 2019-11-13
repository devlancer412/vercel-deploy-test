import styled from 'styled-components'

const otherDirection = ({ facing }) => (facing === 'left' ? 'right' : 'left')

const direction = ({ facing }) => facing

const translateX = ({ visible, facing }) =>
  visible ? '0' : facing === 'left' ? '50vw' : '-50vw'

const Head = styled.div<any>`
  width: 47px;
  height: 47px;
  border: 2px solid #000000;
  border-${otherDirection}: none;
  border-${({ facing }) => (facing === 'left' ? 'top' : 'bottom')}: none;
  transform: rotate(45deg);
  position: absolute;
  ${direction}: 8px;
`

const Tail = styled.div`
  width: 103px;
  height: 2px;
  background-color: #000000;
`

const Wrapper = styled.div<any>`
  display: flex;
  // width: 100px;
  grid-column: span 2;
  position: relative;
  align-items: center;
  transform: translate(${translateX}, 0);
  margin-${direction}: auto;
  margin-${otherDirection}: -16px;
  transition: 0.4s ease-in all;
  cursor: pointer;
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
