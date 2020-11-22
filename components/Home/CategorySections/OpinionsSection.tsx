import styled from 'styled-components'
import Link from 'next/link'

import { generateGrid } from '../../../lib/grid'
import * as convert from '../../../lib/convert'
import * as animate from '../../../lib/animate'

import * as ArticlePreview from '../../ArticlePreview'

const grid = {
  parent: generateGrid(),
}

const TopArticleDetails = styled.div`
  display: inline-block;
  width: min-content;
  ${({ theme }) => `@media (min-width: ${theme.breakpoint.home}px)`} {
    margin-right: 2rem;
  }

  > div:first-child {
    margin-right: 2.6rem;
  }

  *:not(:first-child) {
    margin-top: 1.4rem;
  }
`

const TopArticleHeader = styled.h2<{ animation: string }>`
  font-family: 'Adieu Light';
  font-size: ${convert.viewportUnits(4, { by: 0.24 }).fromRem}; // 4rem
  line-height: 1; // 4rem
  letter-spacing: ${convert.viewportUnits(0.07, { by: 0.24 })
    .fromRem}; // 0.07rem
  font-weight: 100;
  text-transform: uppercase;
  display: inline;
  vertical-align: bottom;

  text-align: center;
  ${({ animation }) => animation}

  ${({ theme }) => `@media (min-width: ${theme.breakpoint.home}px)`} {
    text-align: left;
  }
`

const TopArticle = styled.a`
  ${grid.parent.placeInColumns(1.5, { span: 11 })}
  ${grid.parent.placeInRows(2)}

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: ${convert.viewportUnits(0.7, { by: 0.625 }).fromRem}; // 0.7rem
  margin-bottom: ${convert.viewportUnits(2.6, { by: 0.625 }).fromRem}; // 2.6rem

  ${TopArticleHeader} {
    ${animate.defaultTransition}
  }

  &:hover {
    ${TopArticleHeader} {
      ${animate.defaultTransition}
      color: #e9e9e9;
    }
  }

  ${({ theme }) => `@media (min-width: ${theme.breakpoint.home}px)`} {
    display: inline;
  }
`

export const includeRemainingIntros = false

export const usingArticles = articles => {
  const [first, ...remaining] = articles
  if (!first) return null
  return { first, remaining }
}

export const Section = ({ title, first }) => {
  const [ref, animation] = animate.useDefaultAnimation()

  return (
    <Link href={`/${first.category.title}/${first.slug}`} passHref>
      <TopArticle>
        <TopArticleDetails>
          <ArticlePreview.Details
            category={first.category}
            createdAt={first.createdAt}
          />
          <ArticlePreview.Splash
            previewImage={first.previewImage}
            previewImageAlt={first.previewImageAlt}
            previewImageFocalPoint={first.previewImageFocalPoint}
            width={1}
          />
        </TopArticleDetails>

        <TopArticleHeader ref={ref} animation={animation}>
          {first.heading}
        </TopArticleHeader>
      </TopArticle>
    </Link>
  )
}
