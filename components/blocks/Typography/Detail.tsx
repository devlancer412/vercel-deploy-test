import styled, { css } from 'styled-components'

const detail = css`
  font-family: 'Adieu Light';
  font-size: 1rem;
  line-height: 1.2; // 1.2rem
  letter-spacing: 0.018rem;
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
