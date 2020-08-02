import styled, { css } from 'styled-components'

import * as convert from '../../../lib/convert'

import * as Detail from '../Typography/Detail'

const blurUp = css`
  &.blur-up {
    filter: blur(25px);
    transition: 0.4s ease-in filter;
  }

  &.blur-up.lazyloaded {
    filter: blur(0px);
    transition: 0.4s ease-in filter;
  }
`

export const Img = styled.img<{
  objectFit?: string
  objectPosition?: string
  setPosition?: string
  height?: string
}>`
  width: 100%;
  display: block;
  ${({ height }) => height && `height: ${height};`}
  ${({ objectFit }) => objectFit && `object-fit: ${objectFit};`}
  ${({ objectPosition }) =>
    objectPosition && `object-position: ${objectPosition};`}
  ${({ setPosition }) => setPosition && `position: ${setPosition};`}

  ${blurUp}
`

export const Caption = styled(Detail.Block)`
  margin: ${convert.viewportUnits(2, { by: 0.625 }).fromRem} auto 0 auto;
`

// Stops the blur up effect from spilling over image boundaries
// and looking messy
export const Clip = styled.div<{ setPadding?: number; overrideClip?: string }>`
  overflow: hidden;

  width: 100%;
  max-height: 100%;

  display: flex;
  position: relative;
  ${({ setPadding }) => setPadding && `background-color: #e9e9e9;`}
  ${({ setPadding }) => setPadding && `padding-bottom: ${setPadding}%;`}
  ${({ overrideClip }) => overrideClip}
`
