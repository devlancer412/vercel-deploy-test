import React from 'react'
import styled from 'styled-components'
import { gql } from 'apollo-boost'

const Wrapper = styled.div`
  grid-column: 1 / span 12;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr 80px;
  column-gap: 40px;
  margin-top: 209px;
`

const Logo = styled.img`
  width: 100%;
  grid-column: 1 / span 12;
  margin-top: 80px;
`

const Legal = styled.div`
  grid-row: 2;
  grid-column: 1 / span 2;
  margin: auto 0;
  font-family: 'Adieu Light';
  font-size: 10px;
  letter-spacing: 0.57px;
`

const Contact = styled.div`
  grid-row: 2;
  grid-column: 5 / span 4;
  margin: auto -40px;
  font-family: 'Adieu Light';
  font-size: 10px;
  letter-spacing: 0.57px;
  display: flex;
  justify-content: space-between;
`

const Social = styled.div`
  grid-row: 2;
  grid-column: 10 / -1;
  text-align: right;
  margin: auto 0;
  font-family: 'Adieu Light';
  font-size: 10px;
  letter-spacing: 0.57px;
`

const SocialLink = styled.a`
  margin-left: 12px;
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
