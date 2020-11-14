import styled from 'styled-components'
import NextLink from 'next/link'

import * as animate from '../../../lib/animate'

import * as link from '../../blocks/link'
import * as typography from '../../blocks/typography'

const A = styled.a`
  ${typography.underlined}
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
