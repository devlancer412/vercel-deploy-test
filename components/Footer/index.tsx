import React from 'react'
import styled, { css } from 'styled-components'
import { gql } from 'apollo-boost'

import * as convert from '../../lib/convert'

const breakpoint = 1000

const Wrapper = styled.footer`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto auto;
  grid-template-areas: 'm' 'c' 'l' 's';
  column-gap: ${({ theme }) => theme.grid.gap};
  margin-top: ${convert.viewportUnits(20, { to: 6 }).fromRem};

  padding-top: 2.5rem;
  padding-left: ${({ theme }) => theme.grid.padding};
  padding-right: ${({ theme }) => theme.grid.padding};

  border-top: 1px solid #e9e9e9;

  @media (min-width: ${breakpoint}px) {
    padding-top: 0;
    border-top: 0;

    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1fr 8rem;
    grid-template-areas:
      'l l l l l l l l l l l l'
      's s s c c c c c c m m m';
  }
`

const Logo = styled.img`
  grid-area: l;
  width: 100%;
`

const footerDetail = css`
  font-family: 'Adieu Light';
  font-size: 1rem;
  letter-spacing: 0.057rem;
  text-align: center;
`

const Legal = styled.small`
  grid-area: s;
  margin: 1rem 0 5rem 0;
  ${footerDetail}

  display: flex;

  @media (min-width: ${breakpoint}px) {
    margin: auto 0;
  }
`

const Contact = styled.address`
  grid-area: c;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-style: normal;
  ${footerDetail}
  line-height: 1.6;

  margin: 0 auto 5rem auto;

  @media (min-width: ${breakpoint}px) {
    flex-direction: row;
    margin: auto ${({ theme }) => css`calc(-1 * ${theme.grid.gap})`};
  }

  * {
    margin: 0 8px;
  }
`

const Social = styled.div`
  grid-area: m;
  text-align: center;
  margin: 0 auto 5rem auto;

  ${footerDetail}

  @media (min-width: ${breakpoint}px) {
    text-align: right;
    margin: auto 0;
  }
`

const SocialLink = styled.a`
  margin-left: 12px;
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

export const Footer = ({ contact, footer }) => {
  const { email, address, phoneNumber, socials } = contact
  const { copyright } = footer

  const socialLinks = socials.map(social => (
    <SocialLink
      key={`footer-${social.name}`}
      href={social.url}
      title={social.name}
      target="_blank"
    >
      {social.acronym}
    </SocialLink>
  ))

  return (
    <Wrapper>
      <Logo src="/images/early-logo-black.svg" />

      <Legal>{copyright}</Legal>

      <Contact>
        <Email href={`mailto:${email}`}>{email}</Email>
        <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>

        <span>
          {address.line1}, {address.line2}
        </span>
      </Contact>

      <Social>{socialLinks}</Social>
    </Wrapper>
  )
}
