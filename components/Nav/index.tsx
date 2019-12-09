import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { generateGrid } from '../../lib/grid'
import * as convert from '../../lib/convert'
import * as animate from '../../lib/animate'

import * as NavLinks from './Links'
import * as Hamburger from './Hamburger'

import EarlyLogo from '../../public/images/early-logo-black.svg'

const grid = generateGrid()

const breakpoint = 800

export const Wrapper = styled.nav<{ styles: string }>`
  ${grid.placeInColumns(1, { span: 12 })}
  ${grid.display}
  ${grid.columns}

  padding: 3.1rem 0 2.3rem 0;
  align-items: center;

  background-color: #ffffff;

  position: sticky;
  top: 0;
  z-index: 4;
  ${animate.defaultTransition}

  ${({ styles }) => styles}
`

const Logo = styled(EarlyLogo)`
  width: ${convert.viewportUnits(17.2, { by: 0.6 }).fromRem}; // 17.2
  z-index: 2;
  height: intrinsic;
`

const LogoLink = styled.a`
  ${grid.placeInColumns(2, { to: 12 })}
  ${grid.placeInRows(1)}
  display: flex;
  justify-content: center;
  z-index: 2;

  ${`@media (min-width: ${breakpoint}px)`} {
    ${grid.placeInColumns(5, { span: 4 })}
    ${grid.placeInRows(1)}
  }
`

export const Nav = ({ footerVisible }) => {
  const styles = footerVisible
    ? `
    transform: translateY(-100%);
  `
    : ``

  const [expanded, setExpanded] = React.useState(false)
  const toggleExpanded = () => setExpanded(e => !e)

  return (
    <Wrapper styles={styles}>
      <Hamburger.Hamburger onClick={toggleExpanded} expanded={expanded} />
      <NavLinks.All expanded={expanded} />
      <Link href="/" passHref>
        <LogoLink>
          <Logo />
        </LogoLink>
      </Link>
    </Wrapper>
  )
}
