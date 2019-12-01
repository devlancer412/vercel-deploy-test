import React from 'react'
import styled, { css } from 'styled-components'
import { gql } from 'apollo-boost'

import * as convert from '../../lib/convert'
import { useDefaultAnimation } from '../../lib/animate'
import { generateGrid } from '../../lib/grid'
import EarlyLogo from '../../public/images/early-logo-black.svg'

import { Ul } from '../blocks/List'

const breakpoint = 1000

type WithAnimation = { animate: string }
type WithIndex = { i: number }

const grid = {
  general: generateGrid(),
  small: generateGrid({
    columns: { exact: '1fr' },
    rows: { exact: 'auto auto auto 8rem' },
  }),
  wide: generateGrid({
    columns: { repeat: [12, '1fr'] },
    rows: { exact: '1fr 8rem' },
  }),
}

const Wrapper = styled.footer`
  ${grid.general.placeInColumns(1, { span: 12 })}
  ${grid.general.display}

  ${grid.small.columns}
  ${grid.small.rows}

  margin-top: ${convert.viewportUnits(20, { to: 6 }).fromRem};
  padding-top: 2.5rem;
  padding-left: ${({ theme }) => theme.grid.padding};
  padding-right: ${({ theme }) => theme.grid.padding};

  border-top: 1px solid #e9e9e9;

  overflow: hidden;

  @media (min-width: ${breakpoint}px) {
    padding-top: 0;
    border-top: 0;

    ${grid.wide.columns}
    ${grid.wide.rows}
  }
`

const Logo = styled(EarlyLogo)<WithAnimation & any>`
  ${grid.small.placeInColumns(1, {})}
  ${grid.small.placeInRows(3, {})}

  width: 100%;
  fill: #000000;
  ${({ animate }) => animate}
  transition-delay: 0.1s;
  position: relative;

  @media (min-width: ${breakpoint}px) {
    ${grid.wide.placeInColumns(1, { span: 12 })}
    ${grid.wide.placeInRows(1, {})}
  }
`

const footerDetail = css`
  font-family: 'Adieu Light';
  font-size: 1rem;
  letter-spacing: 0.057rem;
  text-align: center;
`

const Legal = styled.small<WithAnimation>`
  ${grid.small.placeInColumns(1, {})}
  ${grid.small.placeInRows(4, {})}

  margin: 1rem 0 5rem 0;
  ${footerDetail}

  display: flex;

  ${({ animate }) => animate}

  @media (min-width: ${breakpoint}px) {
    margin: auto 0;
    ${grid.wide.placeInColumns(1, { span: 3 })}
    ${grid.wide.placeInRows(2, {})}
  }
`

const Contact = styled.address<WithAnimation>`
  ${grid.small.placeInColumns(1, {})}
  ${grid.small.placeInRows(2, {})}

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
    ${grid.wide.placeInColumns(4, { span: 6 })}
    ${grid.wide.placeInRows(2, {})}
  }

  * {
    margin: 0 8px;
  }
`

const Social = styled(Ul)`
  ${grid.small.placeInColumns(1, {})}
  ${grid.small.placeInRows(1, {})}

  justify-content: center;
  margin: 0 auto 5rem auto;
  display: flex;

  ${footerDetail}

  @media (min-width: ${breakpoint}px) {
    justify-content: right;
    margin: auto 0;
    ${grid.wide.placeInColumns(10, { span: 3 })}
    ${grid.wide.placeInRows(2, {})}
  }
`

const SocialLink = styled.a``

const SocialLi = styled.li<WithAnimation & WithIndex>`
  margin-left: 12px;
  ${({ animate }) => animate}
  transition-delay: 0.${({ i }) => 3 + i}s;

  &:first-child {
    margin-left: 0;
  }
`

const Email = styled.a`
  margin-bottom: 0.8rem;

  @media (min-width: ${breakpoint}px) {
    margin-bottom: 0;
  }
`

export const fragment = gql`
  fragment Footer on Footer {
    copyright
  }
`

const SocialListItem = ({ name, url, acronym, i, animate }) => {
  return (
    <SocialLi animate={animate} i={i}>
      <SocialLink
        key={`footer-${name}`}
        href={url}
        title={name}
        target="_blank"
      >
        {acronym}
      </SocialLink>
    </SocialLi>
  )
}

export const Footer = ({ contact, footer }) => {
  const { email, address, phoneNumber, socials } = contact
  const { copyright } = footer

  // animation triggers
  const [contactRef, contactAnimate] = useDefaultAnimation()
  const [socialsRef, socialsAnimate] = useDefaultAnimation()
  const [legalRef, legalAnimate] = useDefaultAnimation()
  const [wrapperRef, logoAnimate] = useDefaultAnimation({
    threshold: 0.8,
    whileHidden: `
      transform: translateY(calc(8rem + 100%));
    `,
  })

  const socialLinks = socials.map((social, i) => (
    <SocialListItem
      key={`footer-social-link-${social.acronym}`}
      {...social}
      i={i}
      animate={socialsAnimate}
    />
  ))

  return (
    <Wrapper ref={wrapperRef}>
      <Logo animate={logoAnimate} />

      <Contact ref={contactRef} animate={contactAnimate}>
        <Email href={`mailto:${email}`}>{email}</Email>
        <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>

        <span>
          {address.line1}, {address.line2}
        </span>
      </Contact>

      <Social ref={socialsRef}>{socialLinks}</Social>

      <Legal ref={legalRef} animate={legalAnimate}>
        {copyright}
      </Legal>
    </Wrapper>
  )
}
