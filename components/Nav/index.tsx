import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { generateGrid } from '../../lib/grid'
import * as convert from '../../lib/convert'
import * as animate from '../../lib/animate'

import * as NavLinks from './Links'
import * as Hamburger from './Hamburger'

import EarlyLogo from '../../public/images/early-logo-black.svg'

const grid = {
  all: generateGrid(),
  parent: generateGrid(),
}

const breakpoint = 800

export const Wrapper = styled.nav<{ styles: string; expanded: boolean }>`
  ${grid.parent.placeInColumns(1, { span: 12 })}
  ${grid.all.display}

  ${grid.all.columns}
  ${grid.all.rows}

  position: sticky;
  top: 0;
  z-index: 4;
  ${animate.defaultTransition}

  box-sizing: border-box;

  ${({ styles }) => styles}
`

export const Header = styled.header`
  ${grid.parent.placeInColumns(1, { span: 12 })}
  ${grid.parent.placeInRows(1)}
  ${grid.all.display}
  ${grid.all.columns}
  ${grid.all.rows}

  padding: 3.1rem 0 2.3rem 0;
  background-color: #ffffff;
  align-items: center;
`

const Logo = styled(EarlyLogo)`
  width: ${convert.viewportUnits(17.2, { by: 0.6 }).fromRem}; // 17.2
  z-index: 2;
  height: intrinsic;
`

const LogoLink = styled.a`
  ${grid.all.placeInColumns(5, { span: 4 })}
  ${grid.all.placeInRows(1)}
  display: flex;
  justify-content: center;
  z-index: 2;
`

export const Nav = ({ footerVisible, hamburgerOpen, toggleHamburgerOpen }) => {
  const styles =
    footerVisible && !hamburgerOpen
      ? 'transform: translateY(-100%);'
      : 'transform: none;'

  return (
    <Wrapper styles={styles} expanded={hamburgerOpen}>
      <Header>
        <Hamburger.Hamburger
          onClick={toggleHamburgerOpen}
          expanded={hamburgerOpen}
        />
        <Link href="/" passHref>
          <LogoLink>
            <Logo />
          </LogoLink>
        </Link>
      </Header>
      <NavLinks.All expanded={hamburgerOpen} />
    </Wrapper>
  )
}
