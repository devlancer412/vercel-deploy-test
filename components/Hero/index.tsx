import React from 'react'
import styled, { css } from 'styled-components'

import * as animate from '../../lib/animate'
import { generateGrid } from '../../lib/grid'

const grid = generateGrid({})

const Wrapper = styled.section<any>`
  min-height: ${({ height }) => height};
  ${grid.display}
  ${grid.columns}
  grid-template-rows: 1fr 5rem;
  -ms-grid-rows: 1fr 5em;
  box-sizing: border-box;
  padding-left: ${({ theme }) => theme.grid.padding};
  padding-right: ${({ theme }) => theme.grid.padding};
`

const downButtonSide = (width, height) => css`
  width: ${width};
  height: ${height};
  background-color: #000000;
  position: absolute;
  content: '';
  bottom: 0;
  right: 0;
`

const onFocus = `
  outline: none;
  border: 0;

  &:before, &:after {
    outline-width: 1px;
    outline-style: dotted;
    outline-offset: 1px;
  }
`

const DownButton = styled.button<any>`
  height: 1.7rem;
  width: 1.7rem;
  background-color: transparent;
  border: none;

  grid-row: 2;
  -ms-grid-row: 2;
  ${grid.placeInColumns(6, { span: 2 })}
  margin: 0 auto;
  cursor: pointer;
  padding: 0;
  position: relative;
  transform: rotate(45deg);

  ${({ downButtonStyle }) => downButtonStyle}
  ${animate.defaultTransition}
  transition-property: opacity;
  transition-delay: 1s;

  &:before {
    ${downButtonSide('100%', '1px')}
  }
  &:after {
    ${downButtonSide('1px', '100%')}
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

    onScroll()
    const top = scrollTo.current.offsetTop
    window.scrollTo({ top, behavior: 'smooth' })
  }

  React.useEffect(() => {
    setHeroHeight(`${window.innerHeight}px`)
  }, [])

  return (
    <Wrapper height={heroHeight}>
      {children}

      <DownButton
        aria-label="Scroll down page"
        ref={ref}
        onClick={scrollDownPage}
        downButtonStyle={downButtonStyle}
      />
    </Wrapper>
  )
}
