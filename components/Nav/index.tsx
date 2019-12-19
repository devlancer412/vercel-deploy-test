import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

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

  width: calc(100% + 1px);
  position: sticky;
  top: 0;
  z-index: 4;
  ${animate.defaultTransition}

  box-sizing: border-box;
  padding: 3.1rem 0 2.3rem 0;
  background-color: #ffffff;

  ${({ styles }) => styles}
`

export const Header = styled.header`
  ${grid.parent.placeInColumns(1, { span: 12 })}
  ${grid.parent.placeInRows(1)}
  ${grid.all.display}
  ${grid.all.columns}
  ${grid.all.rows}

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

export const Nav = ({ footerVisible, active = null }) => {
  const wrapperRef = React.useRef()
  const [hamburgerOpen, setHamburgerOpen] = React.useState(false)
  const toggleHamburgerOpen = () => setHamburgerOpen(e => !e)

  const onLinkClick = () => {
    // body-scroll-lock sets an overflow hidden on the body
    // Without this, Next retains the body style on page
    // switch, but body-scroll-lock loses in memory history
    // and doesn't re enable scroll
    enableBodyScroll(wrapperRef.current)
  }

  React.useEffect(() => {
    if (hamburgerOpen) disableBodyScroll(wrapperRef.current)
    else enableBodyScroll(wrapperRef.current)
  }, [hamburgerOpen])

  const styles =
    footerVisible && !hamburgerOpen
      ? 'transform: translateY(-100%);' +
        'transition-delay: 1.1s;' +
        'opacity: 0;'
      : 'transform: translateY(0);' + 'transition-delay: 0s;' + 'opacity: 1;'

  return (
    <Wrapper ref={wrapperRef} styles={styles} expanded={hamburgerOpen}>
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
      <NavLinks.All
        expanded={hamburgerOpen}
        active={active}
        onLinkClick={onLinkClick}
      />
    </Wrapper>
  )
}
