import React from 'react'
import styled, { css } from 'styled-components'

import * as animate from '../../lib/animate'
import { generateGrid } from '../../lib/grid'

const grid = generateGrid({})

const Wrapper = styled.div<any>`
  min-height: ${({ height }) => height};
  ${grid.display}
  ${grid.columns}
  grid-template-rows: 1fr 5rem;
  -ms-grid-rows: 1fr 5em;
  box-sizing: border-box;
  padding-left: ${({ theme }) => theme.grid.padding};
  padding-right: ${({ theme }) => theme.grid.padding};
`

const Down = styled.button<any>`
  box-sizing: border-box;
  height: 1.7rem;
  width: 1.7rem;
  border: 1px solid #000000;
  background-color: transparent;
  border-left: 0;
  border-top: 0;
  transform: rotate(45deg);
  grid-row: 2;
  -ms-grid-row: 2;
  ${grid.placeInColumns(6, { span: 2 })}
  margin: 0 auto;
  cursor: pointer;
  padding: 0;

  ${({ downButtonStyle }) => downButtonStyle}
  ${animate.defaultTransition}
  transition-delay: 1s;

  &:hover {
    border-color: #e9e9e9;
  }
`

export const Hero = ({ children, scrollTo, onScroll }) => {
  const [heroHeight, setHeroHeight] = React.useState('100vh')
  const [ref, inView] = animate.useCustomAnimation()

  const downButtonStyle =
    !inView &&
    css`
      opacity: 0;
    `

  const scrollDownPage = () => {
    if (!scrollTo) return

    onScroll(true)
    const top = scrollTo.current.offsetTop
    window.scrollTo({ top, behavior: 'smooth' })
  }

  React.useEffect(() => {
    setHeroHeight(`${window.innerHeight}px`)
  }, [])

  return (
    <Wrapper height={heroHeight}>
      {children}

      <Down
        aria-label="Scroll down page"
        ref={ref}
        onClick={scrollDownPage}
        downButtonStyle={downButtonStyle}
      />
    </Wrapper>
  )
}
