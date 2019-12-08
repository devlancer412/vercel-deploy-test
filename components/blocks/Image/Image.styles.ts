import styled, { css } from 'styled-components'

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

export const Img = styled.img<{ objectFit?: string; setPosition?: string }>`
  width: 100%;
  display: block;
  ${({ objectFit }) => objectFit && `object-fit: ${objectFit};`}
  ${({ setPosition }) => setPosition && `position: ${setPosition};`}

  ${blurUp}
`

export const Caption = styled(Detail.Block)`
  margin: 20px auto 0 auto;
`

// Stops the blur up effect from spilling over image boundaries
// and looking messy
export const Clip = styled.div<{ setPadding?: number }>`
  overflow: hidden;
  width: 100%;
  display: flex;
  position: relative;
  background-color: #e9e9e9;
  ${({ setPadding }) => setPadding && `padding-bottom: ${setPadding}%;`}
`
