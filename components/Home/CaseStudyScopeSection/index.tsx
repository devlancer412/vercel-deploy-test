import React from 'react'
import styled, { css } from 'styled-components'
import { gql } from 'apollo-boost'
import * as apollo from '@apollo/react-hooks'
import Link from 'next/link'

import { generateGrid } from '../../../lib/grid'
import * as convert from '../../../lib/convert'
import * as animate from '../../../lib/animate'
import * as takeshape from '../../../lib/takeshape'

import * as LoadMore from '../CategorySections/LoadMore'
import * as ArticlePreview from '../../ArticlePreview'
import * as Tiles from './Tiles'
import * as Remaining from './Remaining'

import * as typography from '../../blocks/typography'

export const variables = (initialRows: number) => ({
  caseStudySort: [
    {
      field: '_enabledAt',
      order: 'desc',
    },
  ],
  size: initialRows * 2 + 6,
})

export const fragment = gql`
  fragment CaseStudyScopeSection on CaseStudyScope {
    _id
    title
    initialCaseStudySet: caseStudySet(
      filter: $caseStudyFilter
      sort: $caseStudySort
      size: $size
    ) {
      total
      items {
        _id
        heading
        landscapeImage {
          path
        }
        portraitImage {
          path
        }
        intro
        createdAt: _enabledAt
        slug
      }
    }
  }
`

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
  query GetCaseStudyPreviews(
    $id: ID!
    $from: Int!
    $size: Int!
    $sortCaseStudies: [TSSearchSort]!
  ) {
    getCaseStudyScope(_id: $id) {
      caseStudySet(from: $from, size: $size, sort: $sortCaseStudies) {
        items {
          _id
          heading
          landscapeImage {
            path
          }
          intro
          createdAt: _enabledAt
          slug
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
  totalCaseStudies,
  caseStudyScopeId,
  initialLength,
}) => {
  const [rows, setRows] = React.useState(0)
  const [caseStudies, setCaseStudies] = React.useState([])
  const newRows = () => setRows(r => r + (initialRows || 1))

  const [fetchMoreCaseStudies, { loading, data }] = useLazyLoading()

  React.useEffect(() => {
    // Once the new articles are fetched, this effect adds the newly
    // fetched articles to the articles in the component state.
    if (!data) return
    const loadedCaseStudies = data.getCaseStudyScope.caseStudySet.items
    setCaseStudies(a => [...a, ...loadedCaseStudies])
  }, [data])

  React.useEffect(() => {
    if (rows === 0) return

    // When more rows are added, this effect sends a query to TakeShape
    // asking for more articles.
    fetchMoreCaseStudies({
      id: caseStudyScopeId,
      from: initialLength + (rows - (initialRows || 1)) * 3,
      size: (initialRows || 1) * 3,
      sortCaseStudies: [
        {
          field: '_enabledAt',
          order: 'desc',
        },
      ],
    })
  }, [rows])

  const showLoadMore = initialLength + caseStudies.length < totalCaseStudies

  return (
    <>
      {Array(rows)
        .fill(null)
        .map((_, i) => {
          const row = caseStudies.slice(i * 3, i * 3 + 3)
          return row.length ? <Remaining.Remaining caseStudies={row} /> : null
        })}

      {showLoadMore && (
        <LoadMore.LoadMore loading={loading} fetchRows={newRows} />
      )}
    </>
  )
}

export const hasCaseStudies = ({ initialCaseStudySet }) =>
  initialCaseStudySet.total > 0

export const CaseStudyScopeSection = ({
  caseStudyScopeSection,
  initialRows = 0,
}) => {
  const { title, initialCaseStudySet } = caseStudyScopeSection
  const { total } = initialCaseStudySet

  const [headerRef, headerAnimation] = animate.useDefaultAnimation()
  const [noneRef, noneAnimation] = animate.useDefaultAnimation()

  const caseStudies = Tiles.usingArticles(initialCaseStudySet.items)

  if (!caseStudies) return null
  const { remaining: initialRemaining, ...topRow } = caseStudies

  const visibleInitialRemaining = initialRemaining.slice(0, initialRows * 3)
  const topRowLength = topRow.topCaseStudies.length

  return (
    <Wrapper>
      <Header ref={headerRef} animation={headerAnimation}>
        <Link href={`/case-studies`} passHref>
          <a>{title}</a>
        </Link>
      </Header>

      <Tiles.Section title={title} {...topRow} />

      {Array(initialRows)
        .fill(null)
        .map((_, i) => {
          const caseStudies = initialRemaining.slice(i * 3, i * 3 + 3)
          return caseStudies.length ? (
            <Remaining.Remaining caseStudies={caseStudies} />
          ) : null
        })}

      <RemainingRows
        initialRows={initialRows}
        totalCaseStudies={total}
        caseStudyScopeId={caseStudyScopeSection._id}
        initialLength={visibleInitialRemaining.length + topRowLength}
      />
    </Wrapper>
  )
}
