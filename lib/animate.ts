import { css } from 'styled-components'
import { useInView } from 'react-intersection-observer'

export const defaultTransition = css`
  transition: all 1.1s cubic-bezier(0.23, 1, 0.32, 1);
`

type UseDefaultAnimationProps = {
  speed?: string
  y?: string
  ignore?: boolean
  threshold?: number
  whileHidden?: string
}

type RefType = (node?: Element) => void

export const useDefaultAnimation = (
  opts: UseDefaultAnimationProps = {}
): [RefType, string] => {
  const {
    speed = '1.1s',
    y = '20px',
    ignore = false,
    threshold = 0.2,
    whileHidden = null,
  }: UseDefaultAnimationProps = opts

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
  })

  const whileNotInView =
    whileHidden ||
    `
    opacity: 0;
    transform: translateY(${y});
  `

  const animationStyle = `
    transition: opacity ${speed} cubic-bezier(0.23, 1, 0.32, 1),
      transform ${speed} cubic-bezier(0.23, 1, 0.32, 1);
    ${!inView ? whileNotInView : ''}
  `

  if (ignore) return [null, ``]
  return [ref, animationStyle]
}

export const useCustomAnimation = () => {
  return useInView({
    triggerOnce: true,
    threshold: 0.2,
  })
}
