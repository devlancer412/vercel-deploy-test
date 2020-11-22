import React from 'react'
import styled, { css } from 'styled-components'
import gql from 'graphql-tag'
import Link from 'next/link'

import * as convert from '../../lib/convert'
import {
  useDefaultAnimation,
  useCustomAnimation,
  defaultTransition,
} from '../../lib/animate'
import { generateGrid } from '../../lib/grid'

import EarlyLogo from '../../public/images/early-logo-black.svg'

import { Ul } from '../blocks/List'
import * as link from '../blocks/link'
import * as NavLinks from '../Nav/Links'

const breakpoint = 1035

type WithAnimation = { animate: string }
type WithIndex = { i: number }

const grid = {
  general: generateGrid(),
  small: generateGrid({
    columns: { exact: '1fr' },
    rows: { exact: 'auto auto auto 5rem' },
  }),
  wide: generateGrid({
    columns: { repeat: [12, '1fr'] },
    rows: { exact: 'auto 1fr 7.8rem' },
  }),
}

const Wrapper = styled.footer`
  ${grid.general.placeInColumns(1, { span: 12 })}
  ${grid.general.display}

  ${grid.small.columns}
  ${grid.small.rows}

  padding-top: 2.4rem;
  padding-left: ${({ theme }) => theme.grid.padding};
  padding-right: ${({ theme }) => theme.grid.padding};

  border-top: 1px solid #e9e9e9;

  @media (min-width: ${breakpoint}px) {
    padding-top: 0;
    border-top: 0;

    ${grid.wide.columns}
    ${grid.wide.rows}
  }
`

const LogoAnimation = styled.div<WithAnimation>`
  width: 100%;
  opacity: 1;
  ${defaultTransition}
  ${({ animate }) => animate}
`

const LogoMask = styled.div`
  ${grid.small.placeInColumns(1)}
  ${grid.small.placeInRows(3)}

  position: relative;
  width: 100%;

  overflow: hidden;

  @media (min-width: ${breakpoint}px) {
    ${grid.wide.placeInColumns(1, { span: 12 })}
    ${grid.wide.placeInRows(2)}
  }
`

const Logo = styled(EarlyLogo)`
  width: 100%;
  fill: #000000;
  ${defaultTransition}
  transition-delay: 0.1s;
  position: relative;

  cursor: pointer;
`

const footerDetail = css`
  font-family: 'Adieu Light';
  font-size: 1rem;
  letter-spacing: 0.057rem;
  text-align: center;
`

const Legal = styled.small<WithAnimation>`
  ${grid.small.placeInColumns(1, { span: 12 })}
  ${grid.small.placeInRows(4)}

  margin: 1rem 0 5rem 0;
  ${footerDetail}

  display: flex;
  justify-content: center;
  ${({ animate }) => animate}

  @media (min-width: ${breakpoint}px) {
    margin: auto 0;
    margin-bottom: 2.8rem;
    justify-content: flex-start;
    ${grid.wide.placeInColumns(1, { span: 3 })}
    ${grid.wide.placeInRows(3)}
  }
`

const Contact = styled.address<WithAnimation>`
  ${grid.small.placeInColumns(1)}
  ${grid.small.placeInRows(2)}

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-style: normal;
  ${footerDetail}
  line-height: 1.6;

  margin: 0 auto 5rem auto;

  ${({ animate }) => animate}

  @media (min-width: ${breakpoint}px) {
    flex-direction: row;
    margin: auto ${({ theme }) => css`calc(-1 * ${theme.grid.gap})`};
    margin-bottom: 2.8rem;
    ${grid.wide.placeInColumns(4, { span: 6 })}
    ${grid.wide.placeInRows(3)}
  }

  * {
    margin: 0 8px;
  }
`

const Social = styled(Ul)<WithAnimation>`
  ${grid.small.placeInColumns(1)}
  ${grid.small.placeInRows(1)}

  justify-content: center;
  margin: 0 auto 5rem auto;
  display: flex;

  ${footerDetail}
  ${({ animate }) => animate}

  @media (min-width: ${breakpoint}px) {
    justify-content: flex-end;
    margin: auto 0;
    margin-bottom: 2.8rem;
    ${grid.wide.placeInColumns(10, { span: 3 })}
    ${grid.wide.placeInRows(3)}
  }
`

const SocialLink = styled.a`
  ${link.gray}
`

const SocialLi = styled.li`
  margin-left: 12px;

  &:first-child {
    margin-left: 0;
  }
`

const Email = styled.a`
  ${link.gray}
`

const PhoneNumber = styled.a`
  ${link.gray}
`

const navGrid = generateGrid()

const Nav = styled.nav<WithAnimation>`
  padding-bottom: 1.7rem;
  display: none;
  ${defaultTransition}
  transition-delay: 1.1s;
  opacity: 1;
  ${({ animate }) => animate}

  @media (min-width: 800px) {
    // Nav breakpoint
    ${navGrid.display}
    ${navGrid.columns}
  }
`

const LinksWrapper = styled(NavLinks.AllWrapper)`
  display: flex;
  justify-content: space-between;
`

export const fragment = gql`
  fragment Footer on Footer {
    copyright
  }
`

const SocialListItem = ({ name, url, acronym }) => {
  return (
    <SocialLi>
      <SocialLink
        key={`footer-${name}`}
        href={url}
        title={name}
        target="_blank"
        rel="noreferrer"
      >
        {acronym}
      </SocialLink>
    </SocialLi>
  )
}

type FooterProps = {
  contact: any
  footer: any
  navigation: any
  withoutNav?: boolean
  onScroll?: () => void
  onVisibility?: (v: boolean) => void
  active?: string
}

export const Footer = ({
  contact,
  footer,
  navigation,
  onScroll,
  onVisibility,
  withoutNav = false,
  active = null,
}: FooterProps) => {
  const { email, address, phoneNumber, socials } = contact
  const { copyright } = footer

  // animation triggers
  const [contactRef, contactAnimate] = useDefaultAnimation()
  const [socialsRef, socialsAnimate] = useDefaultAnimation()
  const [legalRef, legalAnimate] = useDefaultAnimation()
  const [wrapperRef, inView] = useCustomAnimation({
    triggerOnce: false,
    threshold: 0.8,
  })

  const logoStyle =
    !inView &&
    `
      opacity: 0;
      transform: translateY(calc(100% + 4rem));
    `

  const navStyle =
    !inView &&
    `
      opacity: 0;
      transition-delay: 0s;
    `

  React.useEffect(() => {
    onVisibility && onVisibility(inView)
  }, [inView])

  const scrollUpPage = () => {
    onScroll && onScroll()
    window.scroll({
      behavior: 'smooth',
      top: 0,
    })
  }

  return (
    <Wrapper ref={wrapperRef}>
      <LogoMask>
        <LogoAnimation animate={logoStyle}>
          {!withoutNav && (
            <Nav animate={navStyle}>
              <LinksWrapper expanded={false}>
                <NavLinks.Left links={navigation.leftLinks} active={active} />
                <NavLinks.Right links={navigation.rightLinks} active={active} />
              </LinksWrapper>
            </Nav>
          )}

          <Logo onClick={scrollUpPage} />
        </LogoAnimation>
      </LogoMask>

      <Contact ref={contactRef} animate={contactAnimate}>
        <Email href={`mailto:${email}`}>{email}</Email>
        <PhoneNumber href={`tel:${phoneNumber}`}>{phoneNumber}</PhoneNumber>

        <span>
          {address.line1}, {address.line2}
        </span>
      </Contact>

      <Social ref={socialsRef} animate={socialsAnimate}>
        {socials.map((social, i) => (
          <SocialListItem
            key={`footer-social-link-${social.acronym}`}
            {...social}
          />
        ))}
      </Social>

      <Legal ref={legalRef} animate={legalAnimate}>
        {copyright}
      </Legal>
    </Wrapper>
  )
}
