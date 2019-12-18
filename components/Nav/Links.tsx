import styled from 'styled-components'
import Link from 'next/link'

import * as convert from '../../lib/convert'
import * as animate from '../../lib/animate'

import * as Detail from '../blocks/Typography/Detail'

import { generateGrid } from '../../lib/grid'
const grid = generateGrid()

const breakpoint = 800

const NavLink = styled(Detail.Link)<{ isActive: boolean }>`
  font-size: ${convert.viewportUnits(1.2, { to: 1 }).fromRem}; // 1.2rem

  margin-bottom: ${convert.viewportUnits(3, { by: 0.15 }).fromRem};
  margin-left: 0;

  ${`@media (min-width: ${breakpoint}px)`} {
    margin-left: ${convert.viewportUnits(6.5, { by: 0.15 }).fromRem}; // 6.5rem
    margin-bottom 0;

    &:hover {
      &:first-child {
        margin-left: 0.05rem;
      }
    }
  }

  ${({ isActive }) =>
    isActive &&
    `
    font-family: 'Adieu Backslant';
    font-weight: bold;

  `}

  &:hover {
    color: #000000;
    font-family: 'Adieu Backslant';
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
  height: 100vh;
  width: 100vw;
  top: -3.1rem; // same as parent padding
  left: calc(-1 * ${({ theme }) => theme.grid.padding});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  overflow: hidden;
  opacity: 1;
  ${({ expanded }) => (expanded ? expandedStyle : hiddenStyle)}

  ${`@media (min-width: ${breakpoint}px)`} {
    position: static;
    height: auto;
    width: auto;
    top: auto;
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
    { path: 'opinions', title: 'Opinions' },
  ],
}

const NavItem = ({ path, match, title, active, onLinkClick }) => {
  return (
    <Link href={path} passHref>
      <NavLink isActive={active === match} onClick={onLinkClick || (() => {})}>
        {title}
      </NavLink>
    </Link>
  )
}

const Left = ({ active, onLinkClick }) => {
  return (
    <Wrapper align="left">
      {navItems.left.map(({ path, title }) => (
        <NavItem
          path={`/${path}`}
          active={active}
          match={path}
          title={title}
          onLinkClick={onLinkClick}
        />
      ))}
    </Wrapper>
  )
}

const Right = ({ active, onLinkClick }) => {
  return (
    <Wrapper align="right">
      {navItems.right.map(({ path, title }) => (
        <NavItem
          path={`/${path}`}
          active={active}
          match={path}
          title={title}
          onLinkClick={onLinkClick}
        />
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
