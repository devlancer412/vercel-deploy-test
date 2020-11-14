import styled from 'styled-components'

import { generateGrid } from '../../lib/grid'

import * as ArticlePreview from '../ArticlePreview'
import * as Header from '../blocks/Typography/Header'

const breakpoint = 600

const grid = {
  wide: generateGrid({ columns: { repeat: [12, '1fr'] } }),
  small: generateGrid({
    rows: { repeat: [2, 'auto'] },
  }),
  parent: generateGrid(),
}

export const Wrapper = styled.section`
  display: grid;
  ${grid.parent.placeInColumns(1, { span: 12 })}
  ${grid.small.columns}
  ${grid.small.rows}

  border-top: 1px solid #000000;
  padding-top: 5.6rem;
  margin-bottom: 9rem;

  @media (min-width: ${breakpoint}px) {
    ${grid.wide.columns}
    ${grid.wide.rows}
  }

  > *:nth-child(2) {
    ${grid.parent.placeInColumns(1, { span: 12 })}
    ${grid.parent.placeInRows(2)}

    @media (min-width: ${breakpoint}px) {
      ${grid.parent.placeInColumns(7, { span: 6 })}
      ${grid.parent.placeInRows(1)}
    }
  }
`

const Title = styled(Header.H1)`
  ${grid.parent.placeInColumns(1, { span: 12 })}
  ${grid.parent.placeInRows(1)}
  margin-top: 0;
  margin-bottom: 4.6rem;

  @media (min-width: ${breakpoint}px) {
    ${grid.parent.placeInColumns(1, { span: 6 })}
    ${grid.parent.placeInRows(1)}
    margin-bottom: 0;
  }
`

export const Article = ({ nextArticle }) => {
  return (
    <Wrapper>
      <Title>
        Next
        <br />
        Article
      </Title>

      <ArticlePreview.ArticlePreview
        articlePreview={nextArticle}
        width={4}
        headingWidth={8}
      />
    </Wrapper>
  )
}

export const CaseStudy = ({ nextCaseStudy }) => {
  const preview = {
    heading: nextCaseStudy.heading,
    intro: nextCaseStudy.intro,
    slug: nextCaseStudy.slug,
    category: { title: 'case-studies' },
    previewImage: nextCaseStudy.landscapeImage,
  }

  return (
    <Wrapper>
      <Title>
        Next
        <br />
        Case Study
      </Title>

      <ArticlePreview.ArticlePreview
        articlePreview={preview}
        width={4}
        headingWidth={8}
        withoutDetails
      />
    </Wrapper>
  )
}
