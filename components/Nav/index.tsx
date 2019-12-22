import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useInView } from 'react-intersection-observer'

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

const wrapperTransform = ({ isSmall, footerVisible, hamburgerOpen }) => {
  if (footerVisible && !hamburgerOpen)
    return 'transform: translateY(-100%); opacity: 0;'
  if (!isSmall) return `transform: translateY(0); opacity: 1;`
  return `transform: translateY(-1rem); opacity: 1;`
}

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

const logoScale = ({ isSmall, hamburgerOpen }) => {
  if (isSmall && !hamburgerOpen) return `scale(0.6)`
  return `scale(1)`
}

const Logo = styled(({ scaleBy, ...rest }) => <EarlyLogo {...rest} />)<any>`
  ${animate.defaultTransition}
  width: ${convert.viewportUnits(17.2, { by: 0.6 }).fromRem};
  transform: ${({ scaleBy }) => scaleBy};
  z-index: 2;
  height: intrinsic;
`

const LogoLink = styled.a`
  ${grid.all.placeInColumns(4, { span: 6 })}
  ${grid.all.placeInRows(1)}
  display: flex;
  justify-content: center;
  z-index: 2;

  @media (min-width: ${breakpoint}px) {
    ${grid.all.placeInColumns(5, { span: 4 })}
  }
`

// used as a reference to calculate nav scroll intersection
const NavTarget = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`

export const Nav = ({ footerVisible, active = null }) => {
  const wrapperRef = React.useRef()
  const [targetRef, targetInView, targetEntry] = useInView({
    threshold: 1,
  })

  const isSmall = targetEntry === undefined ? false : !targetInView

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

  const wrapperStyle = wrapperTransform({
    isSmall,
    footerVisible,
    hamburgerOpen,
  })
  const logoStyle = logoScale({ isSmall, hamburgerOpen })

  return (
    <>
      <NavTarget ref={targetRef} />

      <Wrapper ref={wrapperRef} styles={wrapperStyle} expanded={hamburgerOpen}>
        <Header>
          <Hamburger.Hamburger
            onClick={toggleHamburgerOpen}
            expanded={hamburgerOpen}
          />
          <Link href="/" passHref>
            <LogoLink onClick={onLinkClick}>
              <Logo scaleBy={logoStyle} />
            </LogoLink>
          </Link>
        </Header>
        <NavLinks.All
          expanded={hamburgerOpen}
          active={active}
          onLinkClick={onLinkClick}
        />
      </Wrapper>
    </>
  )
}
