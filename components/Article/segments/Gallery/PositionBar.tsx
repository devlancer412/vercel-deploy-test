import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div<any>`
  display: grid;
  grid-template-columns: repeat(${({ length }) => length}, 1fr);
  height: 1px;
  background-color: #bebebe;
  grid-column: 4 / -4;
  width: 100%;
  margin-top: 62px;
`

const Current = styled.div<any>`
  grid-column: 1;
  width: 100%;
  height: 1px;
  background-color: #000000;
  transition: 0.4s ease-in transform;
`

export const Bar = ({ length, current }) => {
  const bar = React.useRef(null)
  const x = bar.current ? (bar.current.clientWidth / length) * current : 0

  return (
    <Wrapper length={length} ref={bar}>
      <Current style={{ transform: `translate(${x}px, 0)` }} />
    </Wrapper>
  )
}
