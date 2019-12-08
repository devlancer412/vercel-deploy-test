import styled from 'styled-components'

import { generateGrid } from '../../../lib/grid'
import theme from '../../../lib/theme'

import * as ArticlePreview from '../../ArticlePreview'

const grid = {
  small: generateGrid({
    rows: { repeat: [2, 'auto'] },
    rowGap: theme.home.rowGap,
  }),
  wide: generateGrid(),
  parent: generateGrid(),
}

const Wrapper = styled.div`
  ${grid.parent.placeInColumns(1, { span: 12 })}
  ${grid.parent.placeInRows(2)}

  ${grid.small.display}
  ${grid.small.columns}
  ${grid.small.rows}

  ${({ theme }) => `@media (min-width: ${theme.breakpoint.home}px)`} {
    ${grid.wide.display}
    ${grid.wide.columns}
    ${grid.wide.rows}
  }
`

const TopArticle = styled.div<{ order: number }>`
  ${grid.small.placeInColumns(1, { span: 12 })}
  ${({ order }) => grid.small.placeInRows(order)}

  ${({ theme }) => `@media (min-width: ${theme.breakpoint.home}px)`} {
    ${({ order }) => grid.wide.placeInColumns(1 + (order - 1) * 6, { span: 6 })}
    ${grid.wide.placeInRows(1)}
  }
`

export const includeRemainingIntros = false

export const usingArticles = articles => {
  const [first, second, ...remaining] = articles
  if (!first || !second) return null
  return { first, second, remaining }
}

export const Section = ({ title, first, second }) => {
  return (
    <Wrapper>
      <TopArticle order={1}>
        <ArticlePreview.ArticlePreview
          width={6}
          articlePreview={first}
          withoutIntro
        />
      </TopArticle>

      <TopArticle order={2}>
        <ArticlePreview.ArticlePreview
          width={6}
          articlePreview={second}
          withoutIntro
        />
      </TopArticle>
    </Wrapper>
  )
}
