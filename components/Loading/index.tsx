import styled, { keyframes } from 'styled-components'

const Wrapper = styled.div`
  grid-column: 1 / -1;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const pulse = keyframes`
  from {
    transform: scale(1);
  }

  to {
    transform: scale(0.9)
  }
`

const Icon = styled.img`
  animation: ${pulse} 2s ease-in-out infinite alternate;
`

export const Loading = () => (
  <Wrapper>
    <Icon src="/images/icon.png" />
  </Wrapper>
)
