import styled, { css } from 'styled-components'
import Link from 'next/link'

import * as convert from '../../lib/convert'
import * as animate from '../../lib/animate'

import * as Detail from '../blocks/Typography/Detail'

import { generateGrid } from '../../lib/grid'
const grid = generateGrid()

const breakpoint = 800

const activeLink = css<{ onHover: number; isActive: boolean }>`
  color: #000000;
  font-family: 'Adieu Backslant';
  // The Backslant font causes the width of the word
  // to change, resulting in jumps if not accounted for
  ${({ onHover }) => onHover && `letter-spacing: ${onHover}rem;`}
`

const currentPage = css<{ onHover: number; isActive: boolean }>`
  ${activeLink}
  font-weight: bold;
`

const NavLink = styled(Detail.Link)<{ onHover: number; isActive: boolean }>`
  font-size: ${convert.viewportUnits(1.2, { to: 1.2 }).fromRem}; // 1.2rem

  margin-bottom: ${convert.viewportUnits(3, { by: 0.5 }).fromRem};
  margin-left: 0;

  ${`@media (min-width: ${breakpoint}px)`} {
    margin-left: ${convert.viewportUnits(6.5, { by: 0.15 }).fromRem}; // 6.5rem
    margin-bottom 0;
  }

  ${({ isActive }) => isActive && currentPage}

  &:hover, &:focus {
    ${activeLink}
  }

  &:first-child {
    margin-left: 0;
  }
`

type LinksType = { align: 'left' | 'right' }

const Wrapper = styled.div<LinksType>`
  ${({ align }) => grid.placeInColumns(align === 'left' ? 1 : 8, { span: 5 })}
  ${grid.placeInRows(1)}

  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${`@media (min-width: ${breakpoint}px)`} {
    text-align: ${({ align }) => align};
    display: block;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`

const expandedStyle = `
  opacity: 1;
  pointer-events: all;
`

const hiddenStyle = `
  opacity: 0;
  pointer-events: none;
`

const AllWrapper = styled.nav<any>`
  ${grid.placeInColumns(1, { span: 12 })}
  ${grid.placeInRows(1)}
  ${grid.display}
  ${grid.columns}

  ${animate.defaultTransition}

  position: fixed;
  height: 100vh; // 1rem how much the nav is transformed back when small
  width: 100vw;
  left: calc(-1 * ${({ theme }) => theme.grid.padding});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  overflow: hidden;
  opacity: 1;
  ${({ expanded }) => (expanded ? expandedStyle : hiddenStyle)}
  padding-bottom: 12.4rem; // double the height of parent padding
  box-sizing: border-box;

  ${`@media (min-width: ${breakpoint}px)`} {
    position: static;
    height: auto;
    width: auto;
    padding-bottom: 0;
    pointer-events: all;
    left: auto;
    display: grid;
    background-color: transparent;
    z-index: 0;
    opacity: 1;
  }
`

const navItems = {
  left: [{ path: 'about', title: 'About' }],

  right: [
    { path: 'news', title: 'News' },
    { path: 'features', title: 'Features' },
    { path: 'opinions', title: 'Opinions', onHover: 0.025 },
  ],
}

const NavItem = ({ path, title, active, onLinkClick, onHover = null }) => {
  return (
    <Link href={path} passHref>
      <NavLink
        onHover={onHover}
        isActive={active === path}
        onClick={onLinkClick || (() => {})}
      >
        {title}
      </NavLink>
    </Link>
  )
}

const Left = ({ active, onLinkClick }) => {
  return (
    <Wrapper align="left">
      {navItems.left.map(linkDetails => (
        <NavItem {...linkDetails} active={active} onLinkClick={onLinkClick} />
      ))}
    </Wrapper>
  )
}

const Right = ({ active, onLinkClick }) => {
  return (
    <Wrapper align="right">
      {navItems.right.map(linkDetails => (
        <NavItem {...linkDetails} active={active} onLinkClick={onLinkClick} />
      ))}
    </Wrapper>
  )
}

export const All = ({
  expanded = false,
  active = null,
  onLinkClick = null,
}) => {
  return (
    <AllWrapper expanded={expanded}>
      <Left active={active} onLinkClick={onLinkClick} />
      <Right active={active} onLinkClick={onLinkClick} />
    </AllWrapper>
  )
}
