import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr 5rem;
  box-sizing: border-box;
  column-gap: ${({ theme }) => theme.grid.gap};
  padding-left: ${({ theme }) => theme.grid.padding};
  padding-right: ${({ theme }) => theme.grid.padding};
`

const Down = styled.button`
  box-sizing: border-box;
  height: 1.7rem;
  width: 1.7rem;
  border: 1px solid #000000;
  background-color: transparent;
  border-left: 0;
  border-top: 0;
  transform: rotate(45deg);
  grid-row: 2;
  grid-column: 6 / span 2;
  margin: 0 auto;
  cursor: pointer;
  padding: 0;

  &:hover {
    border-color: #e9e9e9;
  }
`

export const Hero = ({ children, scrollTo }) => {
  const scrollDownPage = () => {
    if (!scrollTo) return

    const top = scrollTo.current.offsetTop
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <Wrapper>
      {children}

      <Down onClick={scrollDownPage} />
    </Wrapper>
  )
}
