// https://jonsuh.com/hamburgers/

import styled, { css } from 'styled-components'

import { generateGrid } from '../../lib/grid'
const grid = generateGrid()

const breakpoint = 800

const hamburgerPaddingY = 0
const hamburgerPaddingX = 0
const hamburgerLayerWidth = `2.5rem`
const hamburgerLayerSpacing = `0.8rem`
const hamburgerLayerHeight = `0.1rem`
const hamburgerLayerBorderRadius = 0
const hamburgerLayerColour = `#000000`

const Wrapper = styled.div`
  ${grid.placeInColumns(1)}
  ${grid.placeInRows(1)}
  padding: ${hamburgerPaddingY} ${hamburgerPaddingX};
  display: flex;
  position: absolute;

  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;

  // Normalize (<button>)
  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;
  z-index: 2;

  ${`@media (min-width: ${breakpoint}px)`} {
    display: none;
  }
`

const HamburgerBox = styled.div`
  width: ${hamburgerLayerWidth};
  height: calc(${hamburgerLayerHeight} * 3 + ${hamburgerLayerSpacing} * 2);
  display: inline-block;
  position: relative;
`

const active = css`
  transform: translate3d(
      0,
      calc((${hamburgerLayerSpacing} + ${hamburgerLayerHeight}) * -1),
      0
    )
    rotate(-45deg);
  transition-delay: 0.22s;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);

  &:after {
    top: 0;
    opacity: 0;
    transition: top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
      opacity 0.1s 0.22s linear;
  }

  &:before {
    top: 0;
    transform: rotate(-90deg);
    transition: top 0.1s 0.16s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
      transform 0.13s 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`

const hamburgerLine = css`
  width: ${hamburgerLayerWidth};
  height: ${hamburgerLayerHeight};
  background-color: ${hamburgerLayerColour};
  border-radius: ${hamburgerLayerBorderRadius};
  position: absolute;
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;
`

const Inner = styled.div<any>`
  top: auto;
  bottom: 0;
  transition-duration: 0.13s;
  transition-delay: 0.13s;
  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  display: block;
  margin-top: calc(${hamburgerLayerHeight} / -2);

  ${hamburgerLine}

  &:after {
    ${hamburgerLine}
    top: calc((${hamburgerLayerSpacing} * 2 + ${hamburgerLayerHeight} * 2) * -1);
    bottom: calc((${hamburgerLayerSpacing} + ${hamburgerLayerHeight}) * -1);
    transition: top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
                opacity 0.1s linear;
    content: "";
    display: block;
  }

  &:before {
    ${hamburgerLine}
    top: calc((${hamburgerLayerSpacing} + ${hamburgerLayerHeight}) * -1);
    transition: top 0.12s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
                transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    content: "";
    display: block;
  }

  ${({ expanded }) => expanded && active}
`

export const Hamburger = ({ onClick, expanded }) => {
  return (
    <Wrapper onClick={onClick}>
      <HamburgerBox>
        <Inner expanded={expanded} />
      </HamburgerBox>
    </Wrapper>
  )
}
