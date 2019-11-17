import { gql } from 'apollo-boost'
import styled from 'styled-components'

import * as Block from '../AboutBlock'
import { Ul } from '../blocks/List'

import * as convert from '../../lib/convert'

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

const Li = styled.li`
  margin: 0.8rem 0;
`

const Line = styled.span`
  display: block;
  margin: 0.8rem 0;
`

const P = styled.p`
  margin-top: 0;
  margin-bottom: ${convert.viewportUnits(4.4, { to: 1 }).fromRem};
`

export const Contact = ({ contactDetails }) => {
  const { email, phoneNumber, address, socials } = contactDetails

  const socialLinks = socials.map(social => (
    <Li key={`contact-${social.name}`}>
      <a href={social.url}>{social.name}</a>
    </Li>
  ))

  return (
    <Block.Row title="Contact">
      <Block.Column>
        <P>
          <Line>{address.line1},</Line>
          <Line>{address.line2}</Line>
        </P>

        <P>
          <Line>
            <a href={`mailto:${email}`}>{email}</a>
          </Line>

          <Line>
            <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
          </Line>
        </P>
      </Block.Column>

      <Block.Column>
        <Ul>{socialLinks}</Ul>
      </Block.Column>
    </Block.Row>
  )
}
