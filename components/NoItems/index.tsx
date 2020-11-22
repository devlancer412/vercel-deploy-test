import styled from 'styled-components'

import * as typography from '../blocks/typography'

const Wrapper = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Body = styled.div`
  ${typography.bodyCopy}
`

export const NoItems = ({ title = 'Items' }) => (
  <Wrapper>
    <Body>No {title}</Body>
  </Wrapper>
)
