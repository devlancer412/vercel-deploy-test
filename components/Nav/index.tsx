import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useInView } from 'react-intersection-observer'
import gql from 'graphql-tag'

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

export const breakpoint = 800

export const fragment = gql`
  fragment Navigation on Navigation {
    leftLinks {
      __typename

      ... on Category {
        title
      }

      ... on Link {
        heading
        url
      }
    }

    rightLinks {
      __typename

      ... on Category {
        title
      }

      ... on Link {
        heading
        url
      }
    }
  }
`

const wrapperTransform = ({ isSmall, footerVisible, hamburgerOpen }) => {
  if (footerVisible && !hamburgerOpen)
    return 'transform: translateY(-100%); opacity: 0;'
  if (!isSmall || hamburgerOpen) return `transform: translateY(0); opacity: 1;`
  return `transform: translateY(-1rem); opacity: 1;`
}

export const Wrapper = styled.nav<{ styles: string; expanded: boolean }>`
  ${grid.parent.placeInColumns(1, { span: 12 })}
  ${grid.all.display}

  ${grid.all.columns}
  ${grid.all.rows}

  // width: calc(100% + 1px);
  margin-left: calc(-1 * ${({ theme }) => theme.grid.padding});
  width: 100vw;
  position: sticky;
  top: 0;
  z-index: 4;
  ${animate.defaultTransition}

  box-sizing: border-box;
  padding: 3.1rem ${({ theme }) => theme.grid.padding} 2.3rem ${({ theme }) =>
  theme.grid.padding};
  background-color: #ffffff;
  align-self: flex-start; // For when multiple things want to start from page top

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

const expandedStyle = `
  opacity: 1;
  pointer-events: all;
`

const hiddenStyle = `
  opacity: 0;
  pointer-events: none;
`

const LinksWrapper = styled.nav<any>`
  ${`@media (min-width: ${breakpoint}px)`} {
    ${NavLinks.allLinksWrapper}
  }

  ${`@media (max-width: ${breakpoint - 1}px)`} {
    position: fixed;
    height: calc(100vh - 3.1rem); // 3.1rem the nav padding
    width: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #fff;

    ${animate.defaultTransition}
    ${({ expanded }) =>
      expanded ? expandedStyle : hiddenStyle}
    padding-bottom: 3.1rem;

    ${NavLinks.Wrapper} {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    ${NavLinks.NavLink} {
      margin-bottom: ${convert.viewportUnits(3, { by: 0.5 }).fromRem};
      margin-left: 0;
    }
  }
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
  height: 1rem;
  top: 0;
  left: 0;
`

export const Nav = ({ navigation, footerVisible, active = null }) => {
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
            <LogoLink onClick={onLinkClick} aria-label="Early Homepage">
              <Logo scaleBy={logoStyle} />
            </LogoLink>
          </Link>
        </Header>

        <LinksWrapper expanded={hamburgerOpen}>
          <NavLinks.Left
            links={navigation.leftLinks}
            active={active}
            onLinkClick={onLinkClick}
          />
          <NavLinks.Right
            links={navigation.rightLinks}
            active={active}
            onLinkClick={onLinkClick}
          />
        </LinksWrapper>
      </Wrapper>
    </>
  )
}
