import React from 'react'
import styled, { css } from 'styled-components'
import { gql } from 'apollo-boost'
import * as apollo from '@apollo/react-hooks'
import Link from 'next/link'

import { generateGrid } from '../../../lib/grid'
import * as convert from '../../../lib/convert'
import * as animate from '../../../lib/animate'
import * as takeshape from '../../../lib/takeshape'

import * as NewsSection from './NewsSection'
import * as FeaturesSection from './FeaturesSection'
import * as OpinionsSection from './OpinionsSection'
import * as Remaining from './Remaining'
import * as LoadMore from './LoadMore'
import * as ArticlePreview from '../../ArticlePreview'

import * as typography from '../../blocks/typography'

export const variables = (initialRows: number) => ({
  sortArticles: [
    {
      field: '_enabledAt',
      order: 'desc',
    },
  ],
  size: initialRows * 3 + 2, // 2 being the max currently shown in a top row (News)
})

export const fragment = gql`
  ${ArticlePreview.fragment}

  fragment CategorySection on Category {
    _id
    title
    initialArticleSet: articleSet(
      filter: $filterArticles
      sort: $sortArticles
      size: $size
    ) {
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

const FETCH_MORE = gql`
  ${ArticlePreview.fragment}

  query GetCategoryArticles(
    $id: ID!
    $from: Int!
    $size: Int!
    $sortArticles: [TSSearchSort]!
  ) {
    getCategory(_id: $id) {
      articleSet(from: $from, size: $size, sort: $sortArticles) {
        items {
          ...ArticlePreview
        }
      }
    }
  }
`

const useLazyLoading = (): any => {
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState(null)

  const fetch = async variables => {
    setData(null)
    setLoading(true)

    try {
      const result = await takeshape.request(FETCH_MORE, variables)
      setData(result)
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  return [fetch, { loading, data }]
}

const RemainingRows = ({
  initialRows,
  totalArticles,
  categoryId,
  initialLength,
  includeIntros,
}) => {
  const [rows, setRows] = React.useState(0)
  const [articles, setArticles] = React.useState([])
  const newRows = () => setRows(r => r + initialRows)

  const [fetchMoreArticles, { loading, data }] = useLazyLoading()

  React.useEffect(() => {
    // Once the new articles are fetched, this effect adds the newly
    // fetched articles to the articles in the component state.
    if (!data) return
    const loadedArticles = data.getCategory.articleSet.items
    setArticles(a => [...a, ...loadedArticles])
  }, [data])

  React.useEffect(() => {
    if (rows === 0) return

    // When more rows are added, this effect sends a query to TakeShape
    // asking for more articles.
    fetchMoreArticles({
      id: categoryId,
      from: initialLength + (rows - initialRows) * 3,
      size: initialRows * 3,
      sortArticles: [
        {
          field: '_enabledAt',
          order: 'desc',
        },
      ],
    })
  }, [rows])

  const showLoadMore = initialLength + articles.length < totalArticles

  return (
    <>
      {Array(rows)
        .fill(null)
        .map((_, i) => {
          const row = articles.slice(i * 3, i * 3 + 3)
          return row.length ? (
            <Remaining.Remaining
              key={`remaining-${categoryId}-row-${i}`}
              withoutIntros={!includeIntros}
              articles={row}
            />
          ) : null
        })}

      {showLoadMore && (
        <LoadMore.LoadMore loading={loading} fetchRows={newRows} />
      )}
    </>
  )
}

export const CategorySection = ({
  categorySection,
  initialRows = 1,
  showIntros = false,
}) => {
  const { title, initialArticleSet } = categorySection
  const { total } = initialArticleSet

  const [headerRef, headerAnimation] = animate.useDefaultAnimation()

  const SectionComponent = mapCategorySections[title]
  if (!SectionComponent) return null

  const articles = SectionComponent.usingArticles(initialArticleSet.items)
  if (!articles) return null
  const { remaining: initialRemaining, ...topRow } = articles

  const includeIntros = showIntros || SectionComponent.includeRemainingIntros

  const visibleInitialRemaining = initialRemaining.slice(0, initialRows * 3)
  const topRowLength = Object.keys(topRow).length

  return (
    <Wrapper>
      <Header ref={headerRef} animation={headerAnimation}>
        {title}
      </Header>
      <SectionComponent.Section title={title} {...topRow} />

      {Array(initialRows)
        .fill(null)
        .map((_, i) => {
          const articles = initialRemaining.slice(i * 3, i * 3 + 3)
          return articles.length ? (
            <Remaining.Remaining
              key={`remaining-initial-${categorySection._id}-row-${i}`}
              withoutIntros={!includeIntros}
              articles={articles}
            />
          ) : null
        })}

      <RemainingRows
        initialRows={initialRows}
        totalArticles={total}
        categoryId={categorySection._id}
        initialLength={visibleInitialRemaining.length + topRowLength}
        includeIntros={includeIntros}
      />
    </Wrapper>
  )
}
