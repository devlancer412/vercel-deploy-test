import styled from 'styled-components'
import NextLink from 'next/link'

import * as animate from '../../../lib/animate'

import * as link from '../../blocks/link'

const A = styled.a`
  text-decoration: underline;
  ${link.gray}
`

export const Link = ({ text, url, target }) => {
  if (url.startsWith('http') || url.startsWith('www')) {
    return (
      <A href={url} target={target}>
        {text}
      </A>
    )
  }

  return (
    <NextLink href={url} passHref>
      <A target={target}>{text}</A>
    </NextLink>
  )
}
