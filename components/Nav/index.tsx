import styled from 'styled-components'

import { generateGrid } from '../../lib/grid'
import * as animate from '../../lib/animate'

import * as NavLinks from './Links'

import EarlyLogo from '../../public/images/early-logo-black.svg'

const grid = generateGrid()

export const Wrapper = styled.nav<{ styles: string }>`
  ${grid.placeInColumns(1, { span: 12 })}
  ${grid.display}
  ${grid.columns}

  padding: 3.1rem 0 2.3rem 0;
  align-items: center;

  background-color: #ffffff;

  position: sticky;
  top: 0;
  z-index: 3;
  ${animate.defaultTransition}

  ${({ styles }) => styles}
`

const Logo = styled(EarlyLogo)`
  ${grid.placeInColumns(6, { span: 2 })}
  width: 17.2rem;
  justify-self: center;
`

export const Nav = ({ footerVisible }) => {
  const styles = footerVisible
    ? `
    transform: translateY(-100%);
  `
    : ``

  console.log({ footerVisible })

  return (
    <Wrapper styles={styles}>
      <NavLinks.Left />
      <Logo />
      <NavLinks.Right />
    </Wrapper>
  )
}
