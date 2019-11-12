import { gql } from 'apollo-boost'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { getImageUrl } from 'takeshape-routing'

import * as Loading from '../../Loading'

const Img = styled.img<any>`
  width: 100%;
  display: block;
`

const Caption = styled.div`
  margin: 20px auto 0 auto;
  font-family: 'Adieu Light';
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.18px;
  text-transform: uppercase;
`

export const Image = ({ image }) => {
  const { path, caption } = image

  const lazyUrl = getImageUrl(path, { blur: 200, px: 24, auto: 'format' })
  const qualityUrl = getImageUrl(path)

  return (
    <>
      <Img className="lazyload" data-src={qualityUrl} src={lazyUrl} />
      {caption && <Caption>{caption.blocks.map(({ text }) => text)}</Caption>}
    </>
  )
}
