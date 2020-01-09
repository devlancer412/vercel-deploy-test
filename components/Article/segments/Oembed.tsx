import { gql } from 'apollo-boost'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { getImageUrl } from 'takeshape-routing'

import { generateGrid } from '../../../lib/grid'
import * as convert from '../../../lib/convert'
import * as body from '../lib/body'

import * as Unstyled from '../blocks/Unstyled'
import * as Loading from '../../Loading'
import * as Img from '../../blocks/Image/Fetch'

const breakpoint = 600

const grid = generateGrid()

const topMargin = convert.viewportUnits(6.2, { by: 0.625 }).fromRem
const bottomMargin = convert.viewportUnits(6, { by: 0.625 }).fromRem

export const Wrapper = styled.div<any>`
  margin: ${topMargin} 0 ${bottomMargin} 0;

  &:first-child {
    margin-top: ${convert.viewportUnits(6.2, { by: 0.625 }).fromRem};
  }

  & + & {
    margin-top: 0;
  }

  display: flex;
  flex-direction: column;
  align-items: center;

  ${body.placement}
`

export const Oembed = ({ html }) => {
  return <Wrapper dangerouslySetInnerHTML={{ __html: html }} />
}
