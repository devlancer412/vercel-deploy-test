import styled from 'styled-components'
import { gql } from 'apollo-boost'

import * as FeatureGallery from './FeatureGallery'
import * as CategorySection from './CategorySections'
import * as CaseStudyScopeSection from './CaseStudyScopeSection'
import * as ArticlePreview from '../ArticlePreview'

import { generateGrid } from '../../lib/grid'
import * as convert from '../../lib/convert'

const grid = generateGrid({ rows: { repeat: [4, 'auto'] } })

export const variables = {
  ...CategorySection.variables(1),
  ...CaseStudyScopeSection.variables(1),
  filterArticles: { bool: { allowOnHomepage: true } },
  filterCaseStudies: { bool: { allowOnHomepage: true } },
}

export const fragment = gql`
  ${ArticlePreview.fragment}
  ${CategorySection.fragment}
  ${CaseStudyScopeSection.fragment}

  fragment Home on HomePage {
    featured {
      ...ArticlePreview
    }

    sections {
      __typename

      ... on Category {
        ...CategorySection
      }

      ... on CaseStudyScope {
        ...CaseStudyScopeSection
      }
    }
  }
`

export const Wrapper = styled.main`
  ${grid.placeInColumns(1, { span: 12 })}
  ${grid.display}
  ${grid.columns}

  margin-bottom: ${convert.viewportUnits(5.3, { by: 0.625 }).fromRem}; // 5.3rem

  ${CategorySection.Wrapper}:last-child {
    border-bottom: 0;
  }
`

export const Home = ({ home }) => {
  const { sections } = home

  const renderSection = section => {
    if (section.__typename == 'Category') {
      return (
        <CategorySection.CategorySection
          key={`category-section-${section.title}`}
          categorySection={section}
        />
      )
    } else if (section.__typename == 'CaseStudyScope') {
      return (
        <CaseStudyScopeSection.CaseStudyScopeSection
          key={`case-study-scope-section-${section.title}`}
          caseStudyScopeSection={section}
        />
      )
    }
  }

  return <Wrapper>{sections.map(renderSection)}</Wrapper>
}
