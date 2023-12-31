import styled from 'styled-components'

import * as convert from '../../lib/convert'
import * as animate from '../../lib/animate'

import * as typography from '../blocks/typography'
import * as Detail from '../blocks/Typography/Detail'

type WithAnimation = { animation?: string }

type HeadingProps = { width?: number; withoutDetails?: boolean } & WithAnimation
export const Heading = styled.h2<HeadingProps>`
  ${typography.articleTitle}

  ${({ width }) => width && `width: ${width}0%;`}

  ${({ withoutDetails }) =>
    !withoutDetails &&
    `margin-top: ${
      convert.viewportUnits(1.9, { by: 0.625 }).fromRem
    }; // 1.9rem`}
  ${({ withoutDetails }) => withoutDetails && `margin-top: 0;`}
  margin-bottom: ${convert.viewportUnits(0.3, { by: 0.625 }).fromRem};
  ${animate.defaultTransition}
  transition-property: color;

  ${({ animation }) => animation}
`

export const Wrapper = styled.a`
  display: flex;
  flex-direction: column;
  padding-top: 0.7rem;
  color: #000;
  text-decoration: none;

  ${Heading} {
    ${animate.defaultTransition}
  }

  &:hover {
    ${Heading} {
      ${animate.defaultTransition}
      color: #e9e9e9;
    }
  }
`

export const Category = styled(Detail.Detail)`
  margin-right: 20px;
`

export const Time = styled(Detail.Time)``

export const Details = styled(Detail.Block)<WithAnimation>`
  span {
    margin-right: ${convert.viewportUnits(3.8, { by: 0.625 })
      .fromRem}; // 3.8rem
  }

  ${({ animation }) => animation}
`

const shortenedIntro = `
  overflow: hidden;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`

type IntroProps = { fullIntro: boolean } & WithAnimation
export const Intro = styled.p<IntroProps>`
  ${typography.bodyCopy}
  ${typography.textIndent}
  color: #7e7e7e;

  margin-top: ${convert.viewportUnits(2, { by: 0.625 }).fromRem}; // 2rem
  padding-left: 0.3rem;

  ${({ fullIntro }) => !fullIntro && shortenedIntro}
  ${({ animation }) => animation}
`

export const FeatureImage = styled.div`
  margin-bottom: ${convert.viewportUnits(1.2, { by: 0.625 }).fromRem}; // 1.2rem
  background-color: #e9e9e9;
  position: relative;
`
