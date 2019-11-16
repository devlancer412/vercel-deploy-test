import styled, { css } from 'styled-components'

const detail = css`
  font-family: 'Adieu Light';
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.18px;
  text-transform: uppercase;
`

export const Detail = styled.span`
  ${detail}
`

export const Time = styled.time`
  ${detail}
`

export const Block = styled.div`
  ${detail}
`

export const Dt = styled.dt`
  ${detail}
`
