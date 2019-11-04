import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const Wrapper = styled.div`
  grid-column: 1 / span 12;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr 80px;
  column-gap: 40px;
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
  margin: auto 40px;
  font-family: 'Adieu Light';
  font-size: 10px;
  letter-spacing: 0.57px;
`

const GET_FOOTER = gql`
  query Footer {
    getContact {
      address {
        line1
        line2
      }
      email
      phoneNumber
    }

    getSocialList {
      items {
        acronym
        name
        url
      }
    }
  }
`

export const Footer = () => {
  const { data, loading, error } = useQuery(GET_FOOTER)

  if (loading) return <>'Loading'</>
  if (error) return <>'Error'</>

  const { getContact: contact, getSocialList: socialList } = data

  return (
    <Wrapper>
      <Logo src="/images/early-logo.png" />

      <Legal>©2019 EARLY Privacy Policy</Legal>

      <Contact>
        <span>{contact.email}</span>
        <span>{contact.phoneNumber}</span>
        <span>
          {contact.address.line1}, {contact.address.line2}
        </span>
      </Contact>

      <Social>insta etc</Social>
    </Wrapper>
  )
}
