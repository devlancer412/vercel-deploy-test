import styled from 'styled-components'
import { gql } from 'apollo-boost'
import Link from 'next/link'

import { generateGrid } from '../../../lib/grid'
import * as convert from '../../../lib/convert'
import * as animate from '../../../lib/animate'

import * as NewsSection from './NewsSection'
import * as FeaturesSection from './FeaturesSection'
import * as OpinionsSection from './OpinionsSection'
import * as Remaining from './Remaining'
import * as ArticlePreview from '../../ArticlePreview'

import * as typography from '../../blocks/typography'

export const variables = {
  filterArticles: { bool: { allowOnHomepage: true } },
  sortArticles: [
    {
      field: '_updatedAt',
      order: 'desc',
    },
  ],
}

export const fragment = gql`
  ${ArticlePreview.fragment}

  fragment CategorySection on Category {
    title
    articleSet(filter: $filterArticles, sort: $sortArticles, size: 5) {
      total
      items {
        ...ArticlePreview
      }
    }
  }
`

const mapCategorySections = {
  news: NewsSection,
  features: FeaturesSection,
  opinions: OpinionsSection,
}

const grid = generateGrid({ rows: { repeat: [4, 'auto'] } })

export const Wrapper = styled.section`
  ${grid.placeInColumns(1, { span: 12 })}

  ${grid.display}
  ${grid.columns}
  ${grid.rows}

  margin-top: ${convert.viewportUnits(2.6, { by: 0.625 }).fromRem}; // 2.6rem
  padding-bottom: ${
    convert.viewportUnits(11.7, { by: 0.625 }).fromRem
  }; // 11.7rem
  border-bottom: 1px solid #000000;
`

const Header = styled.h2<{ animation: string }>`
  ${grid.placeInRows(1)}
  ${grid.placeInColumns(1, { span: 12 })}
  text-align: center;
  margin-bottom: ${convert.viewportUnits(11, { by: 0.625 }).fromRem}; // 11rem
  ${typography.section}
  ${({ animation }) => animation}
`

const TopRow = styled.div`
  width: 100%;
`

const LoadMore = styled.a<{ animation: string }>`
  font-family: 'Adieu Light';
  font-size: ${convert.viewportUnits(2, { by: 0.625 }).fromRem}; // 2rem
  letter-spacing: ${
    convert.viewportUnits(-0.05, { by: 0.625 }).fromRem
  }; // -0.05rem
  text-transform: uppercase;
  font-weight: 100;
  text-align: center;
  ${grid.placeInRows(4)}
  ${grid.placeInColumns(4, { span: 6 })}
  margin-top: ${convert.viewportUnits(11.9, { by: 0.625 }).fromRem}; // 11.9rem

  ${({ animation }) => animation}

  ${({ theme }) => `@media (min-width: 1015px)`} {
    ${grid.placeInColumns(6, { span: 2 })}
  }
`

export const CategorySection = ({ categorySection }) => {
  const { title, articleSet } = categorySection
  const { total } = articleSet

  const [headerRef, headerAnimation] = animate.useDefaultAnimation()
  const [loadMoreRef, loadMoreAnimation] = animate.useDefaultAnimation()

  const SectionComponent = mapCategorySections[title]
  if (!SectionComponent) return null

  const articles = SectionComponent.usingArticles(articleSet.items)
  if (!articles) return null
  const { remaining, ...topRow } = articles

  const includeIntros = SectionComponent.includeRemainingIntros

  const remainingArticles = remaining.slice(0, 3)
  const topRowLength = Object.keys(topRow).length
  const showLoadMore = remainingArticles.length + topRowLength < total

  return (
    <Wrapper>
      <Header ref={headerRef} animation={headerAnimation}>
        {title}
      </Header>
      <SectionComponent.Section title={title} {...topRow} />
      <Remaining.Remaining
        withoutIntros={!includeIntros}
        articles={remainingArticles}
      />

      {showLoadMore && (
        <Link href={`/${title}`} passHref>
          <LoadMore ref={loadMoreRef} animation={loadMoreAnimation}>
            Load More
          </LoadMore>
        </Link>
      )}
    </Wrapper>
  )
}
