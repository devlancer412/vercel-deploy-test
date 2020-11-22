import gql from 'graphql-tag'
import styled from 'styled-components'
import { getImageUrl } from 'takeshape-routing'

import { generateGrid } from '../../../lib/grid'
import * as convert from '../../../lib/convert'
import * as body from '../lib/body'

import * as Unstyled from '../blocks/Unstyled'
import * as Loading from '../../Loading'
import * as Img from '../../blocks/Image/Fetch'

const breakpoint = 600

const grid = generateGrid()

const topMargin = convert.viewportUnits(10.2, { by: 0.625 }).fromRem
const bottomMargin = convert.viewportUnits(10, { by: 0.625 }).fromRem

export const Wrapper = styled.div<any>`
  ${grid.placeInColumns(1, { span: 12 })}
  margin: ${topMargin} 0 ${bottomMargin} 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  // Video size hack
  height: 0;
  padding-top: 25px;
  padding-bottom: 56.25%;

  iframe {
    width: 100% !important;
    height: 100% !important;
    position: absolute;
    top: 0;
    height: 0;
  }

  @media (min-width: ${breakpoint}px) {
    ${grid.placeInColumns(3, { span: 8 })};
  }
`

export const Oembed = ({ html }) => {
  return <Wrapper dangerouslySetInnerHTML={{ __html: html }} />
}
