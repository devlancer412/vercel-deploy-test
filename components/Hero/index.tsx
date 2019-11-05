import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr 50px;
  box-sizing: border-box;
  column-gap: 40px;
`

const Down = styled.button`
  box-sizing: border-box;
  height: 17px;
  width: 17px;
  border: 1px solid #000000;
  border-left: 0;
  border-top: 0;
  transform: rotate(45deg);
  grid-row: 2;
  grid-column: 6 / span 2;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    border-color: #e9e9e9;
  }
`

const scrollDownPage = () => {
  const viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )

  window.scrollTo({
    top: viewportHeight,
    behavior: 'smooth',
  })
}

export const Hero = ({ children }) => (
  <Wrapper>
    {children}

    <Down onClick={scrollDownPage} />
  </Wrapper>
)
