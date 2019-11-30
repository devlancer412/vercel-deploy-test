import { css } from 'styled-components'
import { useInView } from 'react-intersection-observer'

export const defaultTransition = css`
  transition: all 1.1s cubic-bezier(0.23, 1, 0.32, 1);
`

type UseDefaultAnimationProps = {
  speed?: string
  y?: string
  ignore?: boolean
}

export const useDefaultAnimation = (opts = {}) => {
  const {
    speed = '1.1s',
    y = '20px',
    ignore = false,
  }: UseDefaultAnimationProps = opts

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const whileNotInView = css`
    opacity: 0;
    transform: translateY(${y});
  `

  const animationStyle = css`
    transition: opacity ${speed} cubic-bezier(0.23, 1, 0.32, 1),
      transform ${speed} cubic-bezier(0.23, 1, 0.32, 1);
    ${!inView ? whileNotInView : ''}
  `

  if (ignore) return [ref, ``]
  return [ref, animationStyle]
}

export const useCustomAnimation = () => {
  return useInView({
    triggerOnce: true,
    threshold: 0.2,
  })
}
