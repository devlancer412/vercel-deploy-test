import { gql } from 'apollo-boost'

import * as Block from '../AboutBlock'
import { Ul } from '../blocks/List'

export const fragment = gql`
  fragment Contact on Contact {
    address {
      line1
      line2
    }
    email
    phoneNumber
    socials {
      acronym
      name
      url
    }
  }
`

export const Contact = ({ contactDetails }) => {
  const { email, phoneNumber, address, socials } = contactDetails

  const socialLinks = socials.map(social => (
    <li key={`contact-${social.name}`}>
      <a href={social.url}>{social.name}</a>
    </li>
  ))

  return (
    <Block.Row title="Contact">
      <Block.Column>
        {address.line1},<br />
        {address.line2}
        <br />
        <br />
        <a href={`mailto:${email}`}>{email}</a>
        <br />
        <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
      </Block.Column>

      <Block.Column>
        <Ul>{socialLinks}</Ul>
      </Block.Column>
    </Block.Row>
  )
}
