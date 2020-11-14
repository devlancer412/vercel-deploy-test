import styled, { css } from 'styled-components'

import * as grid from '../../../lib/grid'
import * as convert from '../../../lib/convert'
import theme from '../../../lib/theme'

import * as ArticlePreview from '../../ArticlePreview'

const layGrid = (from, to, columns = 3, rows = 1) => {
  const allRows = rows
  const columnsSpan = 4

  const wrapperGrid = grid.generateGrid({
    columns: { repeat: [columns, '1fr'] },
    rows: { repeat: [rows, 'auto'] },
    rowGap: theme.home.rowGap,
  })

  const nthChild = (r, c) => `
    > *:nth-child(${r * columns + c - columns}) {
      ${wrapperGrid.placeInColumns(c)}
      ${wrapperGrid.placeInRows(r)}
    }
  `

  const matrix = Array(rows).fill(Array(columns).fill(null))
  const matrixCss = matrix
    .map((cs, r) => cs.map((_, c) => nthChild(r + 1, c + 1)).join('\n'))
    .join('\n')

  return css`
    ${grid.placeInColumns(true)(from, { to })}
    ${wrapperGrid.display}
    ${wrapperGrid.columns}
    ${wrapperGrid.rows}

    ${matrixCss}
  `
}

export const Wrapper = styled.section`
  ${layGrid(1, 13, 1, 3)}
  margin-top: ${({ theme }) => theme.home.rowGap};

  ${({ theme }) => `@media (min-width: ${theme.breakpoint.home}px)`} {
    ${layGrid(1, 13, 3, 1)}
    margin-top: ${theme.grid.gap};
  }
`

export const Remaining = ({ caseStudies }) => {
  if (!caseStudies.length) return null

  return (
    <Wrapper>
      {caseStudies.map(caseStudy => {
        const preview = {
          heading: caseStudy.heading,
          intro: caseStudy.intro,
          slug: caseStudy.slug,
          category: { title: 'case-studies' },
          previewImage: caseStudy.landscapeImage,
        }

        return (
          <ArticlePreview.ArticlePreview
            key={`remaining-case-study-${caseStudy._id}`}
            articlePreview={preview}
            width={4}
            fullIntro
            withoutDetails
          />
        )
      })}
    </Wrapper>
  )
}
