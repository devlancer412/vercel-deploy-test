import React from 'react'
import styled from 'styled-components'
import { gql } from 'apollo-boost'
import Link from 'next/link'

const Wrapper = styled.div`
  grid-column: 1 / span 12;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto 1fr 82px;
  column-gap: 40px;
  margin-top: 209px;
`

const Logo = styled.img`
  width: 100%;
  grid-column: 1 / -1;
  grid-row: 2;
`

const Legal = styled.small`
  grid-row: 3;
  grid-column: 1 / span 2;
  margin: auto 0 32px 0;
  font-family: 'Adieu Light';
  font-size: 10px;
  letter-spacing: 0.57px;
`

const Contact = styled.address`
  grid-row: 3;
  grid-column: 5 / span 4;
  margin: auto -40px 32px -40px;
  font-family: 'Adieu Light';
  font-size: 10px;
  letter-spacing: 0.57px;
  display: flex;
  justify-content: space-between;
  font-style: normal;
`

const Social = styled.div`
  grid-row: 3;
  grid-column: 10 / -1;
  text-align: right;
  margin: auto 0 32px 0;
  font-family: 'Adieu Light';
  font-size: 10px;
  letter-spacing: 0.57px;
`

const SocialLink = styled.a`
  margin-left: 12px;
`

const Nav = styled.nav`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
`

const NavItem = styled.a`
  font-family: 'Adieu Light';
  font-size: 12px;
  line-height: 32px;
  text-transform: uppercase;
  margin-left: 80px;

  &:first-child {
    margin-left: 0;
  }
`

export const fragment = gql`
  fragment Footer on Footer {
    copyright
  }
`

export const Footer = ({ contact, footer, withoutNav = false }) => {
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
      <Nav>
        <div>
          <Link href="/about">
            <NavItem>Case Studies</NavItem>
          </Link>
          <Link href="/about">
            <NavItem>About</NavItem>
          </Link>
        </div>

        <div>
          <Link href="/news">
            <NavItem>News</NavItem>
          </Link>

          <Link href="/features">
            <NavItem>Features</NavItem>
          </Link>

          <Link href="/opinions">
            <NavItem>Opinions</NavItem>
          </Link>
        </div>
      </Nav>

      <Logo src="/images/early-logo.png" />

      <Legal>{copyright}</Legal>

      <Contact>
        <a href={`mailto:${email}`}>{email}</a>
        <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
        <span>
          {address.line1}, {address.line2}
        </span>
      </Contact>

      <Social>{socialLinks}</Social>
    </Wrapper>
  )
}
