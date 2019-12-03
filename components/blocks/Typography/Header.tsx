import styled from 'styled-components'
import * as typography from '../typography'

export const H1 = styled.h1`
  font-family: 'Adieu Light';
  font-size: 60px;
  line-height: 56px;
  letter-spacing: -1.5px;
  text-transform: uppercase;
  font-weight: 100;
`

export const H2 = styled.h2<any>`
  ${typography.section}
`
