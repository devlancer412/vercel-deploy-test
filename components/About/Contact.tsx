import { gql } from 'apollo-boost'
import styled from 'styled-components'

import * as Block from '../AboutBlock'
import { Ul } from '../blocks/List'

import * as convert from '../../lib/convert'
import { useDefaultAnimation } from '../../lib/animate'

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

const Li = styled.li<{ i: number; animate: any }>`
  margin: 0.8rem 0;
  ${({ animate }) => animate}
  transition-delay: 0.${({ i }) => 3 + i}s;
`

const Line = styled.span`
  display: block;
  margin: 0.8rem 0;
`

const P = styled.p<any>`
  margin-top: 0;
  margin-bottom: ${convert.viewportUnits(4.4, { to: 1 }).fromRem};
  ${({ animate }) => animate}
`

type ContactProps = {
  contactDetails: any
  className?: any
}

export const Wrapper = styled(Block.Row)``

export const Contact = ({ contactDetails, className }: ContactProps) => {
  const { email, phoneNumber, address, socials } = contactDetails
  const [addressRef, addressAnimate] = useDefaultAnimation()
  const [contactRef, contactAnimate] = useDefaultAnimation()
  const [socialsRef, socialsAnimate] = useDefaultAnimation()

  const socialLinks = socials.map((social, i) => (
    <Li key={`contact-${social.name}`} i={i} animate={socialsAnimate}>
      <a href={social.url}>{social.name}</a>
    </Li>
  ))

  return (
    <Wrapper title="Contact" className={className}>
      <Block.Column>
        <P ref={addressRef} animate={addressAnimate}>
          <Line>{address.line1},</Line>
          <Line>{address.line2}</Line>
        </P>

        <P ref={contactRef} animate={contactAnimate}>
          <Line>
            <a href={`mailto:${email}`}>{email}</a>
          </Line>

          <Line>
            <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
          </Line>
        </P>
      </Block.Column>

      <Block.Column>
        <Ul ref={socialsRef}>{socialLinks}</Ul>
      </Block.Column>
    </Wrapper>
  )
}
