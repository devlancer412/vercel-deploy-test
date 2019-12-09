import styled from 'styled-components'
import Link from 'next/link'

import { generateGrid } from '../../../lib/grid'
import * as convert from '../../../lib/convert'

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

const TopArticle = styled.a`
  ${grid.parent.placeInColumns(1.5, { span: 11 })}
  ${grid.parent.placeInRows(2)}

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: ${convert.viewportUnits(0.7, { by: 0.625 }).fromRem}; // 0.7rem
  margin-bottom: ${convert.viewportUnits(2.6, { by: 0.625 }).fromRem}; // 2.6rem

  ${({ theme }) => `@media (min-width: ${theme.breakpoint.home}px)`} {
    display: inline;
  }
`

const TopArticleHeader = styled.h2`
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

  ${({ theme }) => `@media (min-width: ${theme.breakpoint.home}px)`} {
    text-align: left;
  }
`

export const includeRemainingIntros = false

export const usingArticles = articles => {
  const [first, ...remaining] = articles
  if (!first) return null
  return { first, remaining }
}

export const Section = ({ title, first }) => {
  return (
    <Link href={`/${first.category.title}/${first.slug}`} passHref>
      <TopArticle>
        <TopArticleDetails>
          <ArticlePreview.Details
            category={first.category}
            createdAt={first.createdAt}
          />
          <ArticlePreview.Splash previewImage={first.previewImage} width={1} />
        </TopArticleDetails>

        <TopArticleHeader>{first.heading}</TopArticleHeader>
      </TopArticle>
    </Link>
  )
}
